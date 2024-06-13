const express = require("express");
const { addPdf, getAllPdf, viewPdf } = require("../controllers/pdf-controller");
const { verifyToken } = require("../helpers/auth-middleware");
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.single('file'), addPdf);
router.get("/",getAllPdf);
router.get("/:id", viewPdf);

module.exports = router;

