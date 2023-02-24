const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const likesRoutes = require('./routes/likes');
const commentsRoutes = require('./routes/comments');
const relationshipRoutes = require('./routes/relationship');
const multer  = require('multer');
const config = require('./config');
require('dotenv').config();

const app = express();
// middlewares

// to use cookies, set credentials property of header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb'}))
app.use(cors({
    origin: config.REACT_APP_URL,
    credentials: true,
}));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/likes", likesRoutes);
app.use("/comments", commentsRoutes);
app.use("/relations", relationshipRoutes);

// uploading files on disk using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});
// get static images
app.use("/files", express.static('uploads'));

const port = config.PORT;
app.listen(port, () => {
    console.log(`****** backend started on port ${port} *********`);
});