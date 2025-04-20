import {jwtDecode} from 'jwt-decode'; 

export interface UserToken{
    uuid: string;
    email: string;
    name: string;
    role: string;
    exp: number;
    iat: number;
}

export const getToken = (): string | null => localStorage.getItem("token");

export const decodeToken = () => {
    const token = getToken();
    if(!token) return null;
    try {
        return jwtDecode<UserToken>(token)
    } catch (err) {
        return null;
    }
};

export const isAuthenticated = () =>{
    const decoded = decodeToken();
    if (!decoded) return false;
    return decoded.exp * 1000 > Date.now(); // valida expiração
}

export const logout = () =>{
    localStorage.removeitem("token");
}

