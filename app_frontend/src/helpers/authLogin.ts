import {jwtDecode} from 'jwt-decode'; 

export const getToken = () => localStorage.getItem("token");

export const decodeToken = () => {
    const token = getToken();
    if(!token) return null;
    try {
        return jwtDecode(token) as {[key: string]: any}
    } catch (e) {
        return null;
    }
};

export const isAuthenticated = () =>{
    const decoded = decodeToken();
    return !!decoded;
}

export const logout = () =>{
    localStorage.removeitem("token");
}

