import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";

// Payload is the first Arg. for jwt.verify()
interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}
export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    // Search at Headers User for existing TOKEN
    const token = req.header("auth-token");
    if (!token) return res.status(401).json("Denied access")
    // Verifying given token
    const payload = jwt.verify(token, process.env.SECRETKEY || "tokenrandom") as IPayload
    // console.log(payload) // decoded token
    // SAVE USER ID (DECODED FROM PAYLOAD TOKEN) INTO REQUEST METHOD (userId is created here)
    req.userId = payload._id
    next()
}