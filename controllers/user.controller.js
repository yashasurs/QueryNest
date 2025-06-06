import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { inngest } from '../inngest/client.js';
import e from 'cors';

export const signup = async (req, res) => {
    const { email, password, skills = [] } = req.body;
    try {
        const hashed = bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashed,
            skills,
        });
        //fire ingest function
        await inngest.send({
            name: 'user/signup',
            data: {
                email: user.email
            },
        });
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET
        )
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET
        )
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            res.json({ message: 'Logged out successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging out user' });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; 
        const user = await User.findById(userId).select('-password'); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
}