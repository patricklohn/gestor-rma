import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { decodeToken, getToken, logout } from "../helpers/authLogin";
import { UserToken } from "../helpers/authLogin";

interface AuthContextType{
    user: UserToken | null;
    isAuthenticated: boolean;
    logout: () => void;
    refreshUser:() => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) =>{
    const [user, setUser] = useState<UserToken | null>(null);
    const refreshUser = () => {
        const token = getToken();
        if(token){
            const decoded = decodeToken();
            if(decoded && decoded.exp * 1000 > Date.now()){
                setUser(decoded);
                return;
            }
        }
        setUser(null);
    }
    useEffect(()=>{
        refreshUser();
    }, []);

    return(
        <AuthContext.Provider value={{user, isAuthenticated: !!user, logout, refreshUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return context;
}

