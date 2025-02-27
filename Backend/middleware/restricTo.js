const restricTo = (...roles) => {
  return async (req, res, next) => {
    const userRoles = req.user.role;

    if (!roles.includes(userRoles)) {
      return res.status(403).json({ error: "Forbidden" });
    } else {
      next();
    }
  };
};

module.exports = restricTo;
