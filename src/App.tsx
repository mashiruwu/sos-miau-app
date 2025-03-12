import { BrowserRouter } from "react-router-dom";
import "./i18n.ts";
import { AppRoutes } from "./routes/AppRoutes.tsx";

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
