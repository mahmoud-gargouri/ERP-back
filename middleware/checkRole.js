const checkRole = (roles) => {
  return (req, res, next) => {
    console.log("User Role:", req.user?.role); // Check user role
    console.log("User Name:", req.user?.name); // Check user role
    console.log("Required Roles:", roles); // Check required roles
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
module.exports = checkRole;
