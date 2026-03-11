const express = require("express");
const multer = require("multer");

const parseFile = require("../utils/parseFile");
const generateSummary = require("../services/aiService");
const sendEmail = require("../services/emailService");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {

    const email = req.body.email;
    const filePath = req.file.path;

    const data = await parseFile(filePath);

    const summary = await generateSummary(data);

    await sendEmail(email, summary);

    res.json({
      message: "Summary generated and email sent",
      summary
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;