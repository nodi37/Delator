import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import User from "../models/User";

import signByJwt from "../utils/jwt.utils";
import { isPassRight, genRandomPasswordAsHash } from "../utils/password.utils";
import { authCookieConfig } from '../config/authConfig';
import { editExistingUser } from "../services/userService";


const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        const userData = await User.findOne<IUser>({ 'email': email });
        if (userData) {
            const authenticated = await isPassRight(password, userData.password);
            if (authenticated) {
                const token = await signByJwt(userData);
                res.status(200).cookie('access-token', token, authCookieConfig).json({ 'access-token': token });
            } else {
                res.status(401).json({ error: 'Wrong credentials' })
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email }: { email: string } = req.body;
        const userData = await User.findOne<IUser>({ 'email': email });

        if (userData) {
            const passwords = await genRandomPasswordAsHash();
            await editExistingUser({password: passwords.passwordHash}, userData._id);

            //Send email with passwords.passwordPlain
            console.log(passwords.passwordPlain)

            res.status(200).json({success: true});
        } else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export {
    login,
    resetPassword
}