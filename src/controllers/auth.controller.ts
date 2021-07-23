import { Request, Response } from "express"
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken"
export const signup = async (req: Request, res: Response) => {
    // console.log(req.body) // input form values
    const { username, email, password } = req.body;
    const newUser: IUser = new User({
        username, email, password
    })
    // Encrypt password before saving user
    newUser.password = await newUser.encryptPassword(newUser.password)
    await newUser.save()
    // Making token
    const token: string = jwt.sign({ _id: newUser._id }, process.env.SECRETKEY || "tokenrandom")
    console.log(token)
    // Return a new Header (auth-token) with its value (generated token)
    res.header("auth-token", token).json(newUser)
}
export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // Check E-mail (boolean)
    const isUser = await User.findOne({ email })
    if (!isUser) return res.status(400).json("Bad credentials");
    // Check password (boolean)
    const isCorrectPassword = await isUser.validatePassword(password)
    if (!isCorrectPassword) return res.status(400).json("Bad E-mail or Password");
    // Make and set TOKEN into 'header' section
    const token: string = jwt.sign({ _id: isUser._id }, process.env.SECRETKEY || "tokenrandom", { expiresIn: 60 * 60 * 24 })
    res.header("auth-token", token).json(isUser)
};
export const profile = async (req: Request, res: Response) => {
    const userId = req.userId;
    console.log(userId)
    // Get user throught token id (mongoDB ID) excluding password
    const foundUser = await User.findById(userId, { password: 0 });
    if (!foundUser) return res.status(400).json("No user found :/");
    res.json(foundUser)

};