import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from "validator";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name filed is required']
    },
    email: {
        type: String,
        required: [true, 'Email filed is required'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    password: {
        type: String,
        required: [true, 'Password filed is required'],
    },
}, { timestamps: true });

// checking is password matched
userSchema.methods.isPasswordMatched = async function (givenPassword, savedPassword) {
    return await bcrypt.compare(givenPassword, savedPassword);
}

// create or save works for both
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const password = this.password;
    const hashedPassword = await bcrypt.hashSync(password, 10);

    this.password = hashedPassword;

    next();
});

const User = model("User", userSchema);
export default User;