import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    tiltle: {
        type: String,
        description: String,
        status: {type: String, enum: ['open', 'closed', 'in-progress'], default: 'open'},
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        assiginedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        deadline: {
            type: Date,
            default: null,
        },
        helpfulNotes: {
            type: String,
            default: '',
        },
        relatedSkills: {
            type: [String],
            default: [],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
})

export default mongoose.model('Query', querySchema);