import { hash } from "bcryptjs";

export const cryptPassword = async (password: string) =>{
    const saltRounds = 8;
    const hashedPasswordCry = await hash(password, saltRounds);
    return hashedPasswordCry;
};