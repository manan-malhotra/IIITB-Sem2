import Header from "./components/Header";
import { UserContextProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
    axios.defaults.baseURL = "https://chatapp-opb9.onrender.com";
    axios.defaults.withCredentials = true;
    return (
        <>
            <UserContextProvider>
                <BrowserRouter>
                    <Header />
                    <div className="">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </UserContextProvider>
        </>
    );
}

export default App;
