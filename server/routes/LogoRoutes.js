const express = require("express");
const { createLogo, getLogo, updateProduct, deleteProduct } = require("../controllers/LogoController");
const upload = require("../middleware/uploadMiddleware");
const { userMiddleware } = require("../middleware/UserMiddleware");

const router = express.Router();

router.post("/add", userMiddleware, upload.single("image"), createLogo);
router.get("/list", userMiddleware, getLogo);
router.put("/update/:id", userMiddleware, upload.single("image"), updateProduct);
router.delete("/delete/:id", userMiddleware, deleteProduct);

module.exports = router; 