const db = require("../models");
const processFile = require("../middlewares/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");

// instantiate an instance of storage
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("fb-clone-files");

const fileController = {
    upload: async (req, res) => {
        try {
            await processFile(req, res);

            if (!req.file) {
                return res
                    .status(400)
                    .send({ message: "Please upload a file!" });
            }

            // Create a new blob in the bucket and upload the file data.
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

            blobStream.on("error", (err) => {
                res.status(500).send({ message: err.message });
            });

            blobStream.on("finish", () => {
                res.status(200).send(req.file.originalname);
            });

            blobStream.end(req.file.buffer);
        } catch (error) {
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    },
    getFile: async (req, res) => {
        try {
            const [files] = await bucket.getFile();
            let fileInfos = [];

            files.forEach((file) => {
                fileInfos.push({
                    name: file.name,
                    url: file.metadata.mediaLink,
                });
            });

            res.status(200).send(fileInfos);
        } catch (err) {
            console.log(err);

            res.status(500).send({
                message: "Unable to read list of files!",
            });
        }
    },
};

module.exports = fileController;
