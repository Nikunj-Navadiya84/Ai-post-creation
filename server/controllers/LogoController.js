const Post = require("../models/Logo");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

// Create Logo
exports.createLogo = async (req, res) => {
  try {
    const { name, address } = req.body;

    let imageData = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Post",
      });

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      fs.unlinkSync(req.file.path); // remove local file
    }

    const product = new Post({
      name,
      address,
      images: imageData,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating Post",
      error: error.message,
    });
  }
};


// Get Logo
exports.getLogo = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length)
      return res.status(404).json({ success: false, message: "No Post found" });

    res.status(200).json({ success: true, message: "Post fetched", posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching Post", error: err.message });
  }
};


// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const editid = req.params.id;
    const {
      name, address,
      removedImages = []
    } = req.body;

    const removedImagesArray = Array.isArray(removedImages) ? removedImages : [];

    const extractPublicId = (url) => {
      const parts = url.split("/");
      const fileName = parts[parts.length - 1];
      return `products/${fileName.split(".")[0]}`;
    };

    const normalizedRemovedImages = removedImagesArray.map(item =>
      item.includes("cloudinary.com") ? extractPublicId(item) : item
    );

    const oldProduct = await Post.findById(editid);
    if (!oldProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const validRemovedImages = oldProduct.images
      .filter((img) => normalizedRemovedImages.includes(img.public_id))
      .map((img) => img.public_id);

    await Promise.all(
      validRemovedImages.map(async (public_id) => {
        try {
          await cloudinary.uploader.destroy(public_id);
        } catch (cloudErr) {
          // Skipped warning log
        }
      })
    );

    let existingImages = oldProduct.images.filter(
      (img) => !normalizedRemovedImages.includes(img.public_id)
    );

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "products"
          });

          existingImages.push({
            url: result.secure_url,
            public_id: result.public_id
          });
        } catch (uploadErr) {
          // Skipped error log
        } finally {
          try {
            fs.unlinkSync(file.path);
          } catch (err) {
            // Skipped warning log
          }
        }
      }
    }

    const updatedData = {
      name, address
    };

    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedProduct = await Post.findByIdAndUpdate(editid, updatedData, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      product: updatedProduct
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating Post", error: err.message });
  }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Post.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Post not found" });

    for (let img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await Post.findByIdAndDelete(productId);

    res.status(200).json({ success: true, message: "Post deleted successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting Post", error: err.message });
  }
};
