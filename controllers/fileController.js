const db = require("../models");
const processFile = require("../middlewares/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");

// instantiate an instance of storage
const storage = new Storage({
    projectId: process.env.REACT_APP_GCS_PROJECT_ID,
    credentials: {
        type: process.env.REACT_APP_GCS_TYPE,
        project_id: process.env.REACT_APP_GCS_PROJECT_ID,
        private_key_id: process.env.REACT_APP_GCS_PRIVATE_KEY_ID,
        private_key: process.env.REACT_APP_GCS_PRIVATE_KEY,
        client_email: process.env.REACT_APP_GCS_CLIENT_EMAIL,
        client_id: process.env.REACT_APP_GCS_CLIENT_ID,
        auth_uri: process.env.REACT_APP_GCS_AUTH_URI,
        token_uri: process.env.REACT_APP_GCS_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.REACT_APP_GCS_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.REACT_APP_GCS_CLIENT_X509_CERT_URL,
        universe_domain: process.env.REACT_APP_GCS_UNIVERSAL_DOMAIN
    },
});
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
