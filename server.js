const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require("express-fileupload");
const colors = require("colors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 9065;
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));



// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File Upload For User Avatar
app.use(fileUpload());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



app.listen(PORT, () => console.log(`Server started on port ${PORT}`.cyan.underline.bold));