
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    error: "Server Error",
    details: err.message,
  });
};

export default errorHandler;
