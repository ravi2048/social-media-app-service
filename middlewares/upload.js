const util = require("util");
const Multer = require("multer");

const maxSize = 2 * 1024 * 1024;
let processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: {fileSize: maxSize}
}).single("file");

// promisifying to use with async await
let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
