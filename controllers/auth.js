import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userInfo from "../models/userInformation.js";

import User from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) res.status(400).json({ message: "User already exist" })

        if (password.length <= 8) return res.status(400).json({ message: "pasword must more than8 characters" })

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const updateInfo = new userInfo({
            profileImg: "", bio: "", creator: result._id,coverImg: "",name: `${firstName} ${lastName}`
        })
        await updateInfo.save()
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "5h" });

        res.status(201).json({ result, token,updateInfo });
    } catch (error) {
        console.log(error)
    }
}