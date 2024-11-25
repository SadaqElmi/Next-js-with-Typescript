import jwt from "jsonwebtoken";
const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECERET!, { expiresIn: "3d" });
};

module.exports = { generateRefreshToken };
