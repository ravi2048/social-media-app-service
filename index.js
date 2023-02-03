const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const likesRoutes = require('./routes/likes');
const commentsRoutes = require('./routes/comments');
const config = require('./config');
require('dotenv').config();

const app = express();
// middlewares

// to use cookies, set credentials property of header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001'
}));
app.use(cookieParser());


app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/likes", likesRoutes);
app.use("/comments", commentsRoutes);

const port = 8800;
app.listen(port, () => {
    console.log(`****** backend started on port ${port} *********`);
});