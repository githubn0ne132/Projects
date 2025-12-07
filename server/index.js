const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all for dev
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/search', require('./routes/search'));
app.use('/api/users', require('./routes/users'));

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Example: join user to a room based on their user ID for personal notifications
  socket.on('join_user_room', (userId) => {
      socket.join(`user_${userId}`);
  });
});

// Make io accessible in routes
app.set('socketio', io);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // Export for testing
