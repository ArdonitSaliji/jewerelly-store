const express = require('express');
const router = express.Router();
const multer = require('multer');
const Users = require('../Schema/Users.js');
const fs = require('fs');

const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single('file');

router.post('/upload', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(404).send({ message: 'File Upload Failed' });
    const imageBuffer = await fs.promises.readFile(`./uploads/${req.file.originalname}`);
    Users.findOneAndUpdate(
      { username: req.body.user },
      { profileImage: imageBuffer, profileImageName: req.file.originalname },
      async (error, foundUser) => {
        if (error) {
          return res.status(500).send({ message: 'Error updating user' });
        } else {
          if (imageBuffer) {
            const profileImage = Buffer.from(imageBuffer, 'binary').toString('base64');
            return res.status(200).send({ filename: req.file.originalname, profileImage });
          }
          return res.status(200).send({ filename: req.file.originalname });
        }
      }
    );
  });
});

module.exports = router;
