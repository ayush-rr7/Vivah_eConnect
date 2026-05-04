# 💍 Vivah E-Connect

A modern matrimonial matching platform built with **MERN Stack** that connects individuals based on intelligent compatibility matching and real-time messaging.
##  Features

- 👤 **User Authentication** - Email signup, OTP verification, JWT-based sessions
- 👥 **Multiple Profiles** - Create and manage multiple profiles per account
- 💕 **Smart Matching** - AI-powered compatibility algorithm (0-100% score)
- 🔗 **Connection Requests** - Send, accept, or reject connection requests
- 💬 **Real-time Chat** - Socket.IO powered instant messaging
- 📸 **Image Upload** - Cloudinary integration for profile pictures
- 🔒 **Secure** - Password hashing, input validation, rate limiting
- 📱 **Responsive Design** - Mobile-friendly UI with Tailwind CSS

---
## Architecture

```
┌─────────────────────────────────────────┐
│        React Frontend (Vite)            │
│  - Dashboard, Matches, Chat, Profiles  │
└────────────┬────────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
   HTTP         WebSocket
   REST          Socket.IO
      │             │
┌─────▼─────────────▼──────────────────────┐
│        Express.js Backend                │
│  - Auth, Matching, Messages, Connections│
└────────────┬────────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
  MongoDB      Cloudinary
  Database     Image Storage
```

---

## Tech Stack

### Backend
- **Runtime:** Node.js (Latest LTS)
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB 8.17.1 + Mongoose ODM
- **Authentication:** JWT (9.0.3) + bcryptjs (3.0.3)
- **Real-time:** Socket.IO 4.8.3
- **File Upload:** Cloudinary + Multer
- **Validation:** express-validator 7.3.1
- **Rate Limiting:** express-rate-limit 8.3.1

### Frontend
- **Library:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Routing:** React Router DOM 7.13.0
- **HTTP Client:** Axios 1.13.2
- **Styling:** Tailwind CSS 4.1.18
- **Real-time:** Socket.IO Client 4.8.3

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account (for image storage)
- Nodemailer/Resend credentials (for emails)

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Configure your environment variables
# MONGODB_URI=your_mongodb_url
# JWT_SECRET=your_secret_key
# CLOUDINARY_API_KEY=your_key
# FRONTEND_URL=http://localhost:5173

npm start
# Server runs on http://localhost:3002
```

### Frontend Setup

```bash
cd frontend
npm install

npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📁 Project Structure

```
vivah-econnect/
├── backend/
│   ├── src/
│   │   ├── controller/          # Business logic
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API endpoints
│   │   ├── middleware/          # JWT, validation
│   │   ├── services/            # Matching algorithm
│   │   ├── sockets/             # Real-time handlers
│   │   ├── config/              # Cloudinary, email
│   │   └── utils/               # Helpers
│   ├── server.js                # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/               # Route pages
    │   ├── components/          # Reusable components
    │   ├── services/            # API calls
    │   ├── context/             # Auth context
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/sendOtp` - Send verification OTP
- `POST /auth/verifyOtp` - Verify OTP
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (Protected)
- `POST /auth/logout` - Logout user

### Matches
- `GET /api/matches` - Get compatible matches (Protected)
- `GET /api/matches/:id` - Get match details (Protected)

### Connections
- `POST /api/connections` - Send connection request (Protected)
- `GET /api/connections/sent` - Get sent requests (Protected)
- `GET /api/connections/received` - Get received requests (Protected)
- `PUT /api/connections/:id/accept` - Accept request (Protected)
- `PUT /api/connections/:id/reject` - Reject request (Protected)

### Messages
- `GET /api/messages/:connectionId` - Get chat history (Protected)
- `POST /api/messages` - Send message (Protected)


##  Security Features

✅ Password hashing with bcryptjs (10 salt rounds)  
✅ JWT authentication with HttpOnly cookies  
✅ OTP verification (5-minute expiry)  
✅ Input validation on all endpoints  
✅ Rate limiting to prevent abuse  
✅ CORS configuration for frontend origin  
✅ MongoDB field selection (prevent data leakage)  
✅ Socket.IO authentication verification  

---

## 📊 Database Schema

### Collections
- **Users** - Authentication credentials
- **Profiles** - User profile details (age, height, education, etc.)
- **Connections** - Connection requests between users
- **Messages** - Chat messages and conversation history
- **OTPs** - Time-limited verification codes
- **Preferences** - User's partner matching preferences

---

## Deployment

### Frontend Deployment
- **Vercel** – Used for deploying the React frontend application and providing fast global access.

### Backend Deployment
- **Render.com** – Used for deploying the Node.js and Express.js backend server with GitHub integration and automatic deployment.

### Database Hosting
- **MongoDB Atlas** – Used as the cloud database service for storing users, profiles, messages, and connection requests securely.

### Image Storage
- **Cloudinary** – Used for uploading, storing, and managing profile images efficiently.

---

---

## Matching Algorithm

The compatibility matching uses a scoring system:

1. **Hard Filters:**
   - Opposite gender
   - User preferences (religion, etc.)

2. **Soft Filters & Scoring:**
   - Age compatibility
   - Height compatibility
   - Education level match
   - Income range compatibility
   - Location preference

3. **Final Score:** 0-100% compatibility rating

---

## 📈 Future Enhancements

- 🎥 Video calling integration (Agora/Twilio)
- 🤖 ML-based recommendation engine
- 💳 Payment integration (Stripe/Razorpay)
- 📱 React Native mobile app
- 🔍 Elasticsearch for advanced search
- ❤️ Likes, favorites, and activity feed
- ⭐ Admin dashboard for moderation
- 📊 User analytics and insights

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend (.env):**
```
NODE_ENV=development
PORT=3002
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vivah
JWT_SECRET=your_super_secret_key_here
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env.local):**
```
VITE_API_URL=http://localhost:3002
```

---


## 🙏 Acknowledgments

- MERN stack community
- Mongoose documentation
- Socket.IO real-time capabilities
- Cloudinary image management
- Tailwind CSS framework

---

## 📞 Support

For support, email support@vivaheconnect.com or open an issue on GitHub.

---

## 🎯 Status

🟢 **Active Development** - V1.0 Released
