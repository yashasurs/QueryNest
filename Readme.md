# QueryNest - ChaiCode

Welcome to **QueryNest**, the AI-Powered Ticket Management System!  
This project is part of the ChaiCode YouTube video series. QueryNest is a web application that uses AI to automatically categorize, prioritize, and assign support tickets to the most appropriate moderators.

---

## 🎯 Project Overview

**QueryNest** is a smart ticket management system that leverages AI to streamline support operations. It enhances ticket processing with automatic categorization, priority assignment, and intelligent routing to the right moderators.

---

## 🚀 Features

- **AI-Powered Ticket Processing**
  - Automatic ticket categorization
  - Smart priority assignment
  - Skill-based moderator matching
  - AI-generated helpful notes for moderators

- **Smart Moderator Assignment**
  - Matching based on moderator skills
  - Fallback to admin assignment
  - Regex-based skill routing

- **User Management**
  - Role-based access (User, Moderator, Admin)
  - Moderator skill profiles
  - JWT-based authentication

- **Background Processing**
  - Event-driven architecture using Inngest
  - Asynchronous task handling
  - Email notifications on assignment

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Background Jobs**: Inngest  
- **AI Integration**: Google Gemini API  
- **Email Service**: Nodemailer with Mailtrap  
- **Development**: Nodemon

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashasurs/QueryNest.git
   cd querynest
