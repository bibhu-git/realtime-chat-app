import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import createTokenAndSaveCookie from "../jwt/generateToken.js";
export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        });
        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(200).json({
                message: "User Created Successfully...",
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName
                }
            })
        }

    }
    catch (err) {
        console.log("Error: " + err);
        res.status(500).json(err);
    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email address!" });
        }
        const isMatch = await bcryptjs.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password!" });
        }
        createTokenAndSaveCookie(existingUser._id, res);
        res.status(200).json({
            message: "Login Successfully...",
            user: {
                _id: existingUser._id,
                email: existingUser.email,
                name: existingUser.fullName
            }
        })
    }
    catch (err) {
        console.log("Error: " + err);
        res.status(500).json(err);
    }
}
export const allUsers = async (req, res) => {
    try {
        const logedInUser = req.user._id;
        const filterUser = await User.find({
                _id: { $ne: logedInUser },
            }).select('-password');
        res.status(200).json(filterUser);
    }
    catch (err) {
        console.log("Error in allUsers" + err);
        res.status(500).json(err);
    }
}