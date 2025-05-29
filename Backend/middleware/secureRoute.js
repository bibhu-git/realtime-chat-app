import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ error: "No token, authorization denied" });
        }
        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decode) {
            return res.status(400).json({ error: "invalid token" });
        }
        console.log("decode : " + decode);
        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(400).json("User not found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in secure route " + error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export default secureRoute;