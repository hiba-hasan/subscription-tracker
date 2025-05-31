export default function errorMiddleWare(err, req, res, next) {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    if (err.name == "CastError") {
      error = new Error("Resource not found");
      error.statusCode = 404;
    }

    if (error.code == 11000) {
      error = new Error("Duplicate keyy found");
      error.statusCode = 400;
    }
    if (err.name == "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(","));
      error.statusCode = 400;
    }

    res
      .status(err.statusCode || 500)
      .json({ success: false, error: error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
}
