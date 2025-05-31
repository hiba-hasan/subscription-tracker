import aj from "../controllers/config/arcjet.js";
const arcjetMiddleWare = async (req, res, next) => {
  try {
    // const fingerprint = "userId";
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Rate Limit exceeded" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot detected" });
      }
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (error) {
    console.log(`Error:${error}`);
    next(error);
  }
};

export default arcjetMiddleWare;
