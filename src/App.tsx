import { BrowserRouter } from "react-router-dom";
import "./i18n.ts";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { AppRoutes } from "./routes/AppRoutes.tsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
