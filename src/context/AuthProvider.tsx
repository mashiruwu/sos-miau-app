import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

const AuthContext = createContext({
    user: null,
    ong: null,
    setUser: () => {},
    setOng: () => {},
    signOut: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(null);
    const [ong, setOng] = useState(null);

    const userId = sessionStorage.getItem("userId");
    const ongId = sessionStorage.getItem("ongId");

    const fetchUser = async () => {
        if (!userId) return;
        try {
            const response = await fetch(
                `http://localhost:3000/adopter/${userId}`
            );
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    };

    const fetchOng = async () => {
        if (!ongId) return;
        try {
            const response = await fetch(
                `http://localhost:3000/donorOng/${ongId}`
            );
            if (response.ok) {
                const data = await response.json();
                setOng(data);
            }
        } catch (error) {
            console.error("Erro ao buscar ONG:", error);
        }
    };

    const signOut = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("ongId");
        setUser(null);
        setOng(null);
    };

    useEffect(() => {
        fetchUser();
        fetchOng();
    }, [userId, ongId]);

    return (
        <AuthContext.Provider value={{ user, ong, setUser, setOng, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
