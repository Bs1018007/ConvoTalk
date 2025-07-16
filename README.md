# ConvoTalk2 - Enhanced Group Chat with File Sharing

A real-time chat application with group chat functionality and comprehensive file sharing capabilities.

## Features

### 🚀 Core Features
- **Real-time messaging** with Socket.IO
- **User authentication** with JWT and Google OAuth
- **1-on-1 private messaging**
- **Group chat rooms** with member management
- **File sharing** with multiple file type support

### 📁 File Sharing Capabilities
- **Images**: JPG, JPEG, PNG, GIF, WebP, SVG (up to 10MB)
- **Videos**: MP4, AVI, MOV, WMV, FLV, WebM, MKV (up to 100MB)
- **Audio**: MP3, WAV, OGG, M4A, FLAC (up to 50MB)
- **Documents**: PDF, DOC, DOCX, TXT, RTF, ODT, Pages (up to 25MB)
- **File preview** with thumbnails for videos
- **Download functionality** for all file types
- **Audio/Video playback** controls

### 👥 Group Chat Features
- **Create rooms** with custom names
- **Add members** when creating rooms
- **Join/Leave rooms** dynamically
- **Real-time notifications** for all room members
- **Member count** and room information display
- **Room history** with all messages and files

### 🎨 User Interface
- **Modern UI** with DaisyUI and Tailwind CSS
- **Responsive design** for mobile and desktop
- **Dark/Light theme** support
- **Emoji picker** integration
- **File attachment previews**
- **Real-time typing indicators**

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time communication
- **Cloudinary** for file storage and optimization
- **JWT** for authentication
- **Passport.js** for Google OAuth

### Frontend
- **React 18** with Vite
- **Zustand** for state management
- **Socket.IO Client** for real-time features
- **DaisyUI** and **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Cloudinary account

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Cloudinary_Cloud_name=your_cloudinary_cloud_name
Cloudinary_API_key=your_cloudinary_api_key
Cloudinary_API_secret=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/google` - Google OAuth

### Messages
- `GET /api/message/users` - Get all users
- `GET /api/message/:id` - Get messages with a user
- `POST /api/message/send/:id` - Send message to user

### Rooms
- `POST /api/rooms/create` - Create a new room
- `POST /api/rooms/join` - Join a room
- `POST /api/rooms/leave` - Leave a room
- `GET /api/rooms/list` - Get all rooms
- `GET /api/rooms/:roomId/messages` - Get room messages
- `POST /api/rooms/:roomId/send` - Send message to room

## File Upload Configuration

The application supports various file types with size limits:

| File Type | Extensions | Max Size | Features |
|-----------|------------|----------|----------|
| Images | JPG, PNG, GIF, WebP, SVG | 10MB | Preview, optimization |
| Videos | MP4, AVI, MOV, WebM, MKV | 100MB | Thumbnail, playback controls |
| Audio | MP3, WAV, OGG, M4A, FLAC | 50MB | Playback controls, duration |
| Documents | PDF, DOC, DOCX, TXT, RTF | 25MB | Download, file info |

## Usage

### Creating a Group Chat
1. Click "Create Room" in the sidebar
2. Enter a room name
3. Optionally select members to add
4. Click "Create Room"

### Joining a Group Chat
1. Browse available rooms in the sidebar
2. Click "Join" on any room
3. Start sending messages and files

### Sharing Files
1. Click the paperclip icon in the message input
2. Select one or more files
3. Preview the files before sending
4. Click send to share with the group

### File Interactions
- **Images**: Click to view full size
- **Videos**: Use play/pause controls
- **Audio**: Use audio player controls
- **Documents**: Download to view

## Socket Events

### Client to Server
- `joinRoom` - Join a chat room
- `leaveRoom` - Leave a chat room
- `newMessage` - Send a new message

### Server to Client
- `roomMessage` - New message in room
- `getMessage` - New private message
- `userJoined` - User joined room
- `userLeft` - User left room

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub. 