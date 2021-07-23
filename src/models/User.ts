import { Schema, model, Document} from "mongoose";
import bcrypt from "bcryptjs"
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>
};
const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});


// Hash password
userSchema.methods.encryptPassword = async (password: string ): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
// Validate password
userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, (this as any).password);
};
userSchema.pre<IUser>("save", function(next) {
    const user = this;
    // user.password and user.username exists here.
    next();
});
export default model<IUser>("User", userSchema);

