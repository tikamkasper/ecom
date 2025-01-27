const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const { uploadToCloudinary } = require("../uploads/cloudinary");
const ErrorHandler = require("../utils/errorHandlerClass");
const ApiFeatures = require("../utils/apiFeaturesClass");

// Create product -- admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const images = req.files.images;

  const imagesLink = [];
  for (const image of images) {
    const { name, tempFilePath } = image;
    const result = await uploadToCloudinary(name, tempFilePath);
    imagesLink.push(result);
  }

  req.body.images = imagesLink;
  req.body.createrUserId = req.user._id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;

  const totalProductsCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;

  let filteredProductsCount = products.length;

  apiFeatures.pagination(resultPerPage);

  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    totalProductsCount,
    filteredProductsCount,
    resultPerPage,
    products,
  });
});

// Update product -- admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  // Find product by id
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // if (!req.files)
  if (req.files !== null) {
    // Delete old images from cloudinary
    const images = product.images;
    for (const image of images) {
      const { public_id } = image;
      await cloudinary.uploader.destroy(public_id);
    }

    // Save new images in cloudinary
    const imagesLink = [];
    const newImages = req.files.images;
    for (const newImage of newImages) {
      const { name, tempFilePath } = newImage;
      const result = await uploadToCloudinary(name, tempFilePath);
      imagesLink.push(result);
    }

    req.body.images = imagesLink;
  }

  req.body.updaterUserId = req.user._id;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product -- admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  // Find product by id
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Delete images from cloudinary
  const images = product.images;
  for (const image of images) {
    const { public_id } = image;
    await cloudinary.uploader.destroy(public_id);
  }

  // Delete product from db
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully ...",
  });
});

// Get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create new review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    userId: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.userId.toString() === req.user._id.toString(),
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.userId.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all review of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviewsCount: product.numOfReviews,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString(),
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true },
  );

  res.status(200).json({ success: true });
});
