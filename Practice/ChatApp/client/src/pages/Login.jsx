import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
// TODO Set up context
// TODO Set token and username in context
// TODO Set up user response in localStorage and fetch in context -> useEffect
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {
        id,
        setId,
        setUsername: setLoggedInUserName,
        setPeopleOnlineContext,
    } = useContext(UserContext);
    useEffect(() => {
        if (id) {
            navigate("/");
        }
    }, [id]);
    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/users/login", {
                username: username,
                password: password,
            });
            toast.success(username + " logged in");
            if (response.data && response.data.id) {
                setLoggedInUserName(username);
                setId(response.data.id);
                setPeopleOnlineContext(response.data.contacts);
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
        }
    };
    return (
        <>
            <h1 className="text-5xl font-bold flex justify-center ">
                <FaSignInAlt /> Login
            </h1>
            <div className="m-40 mx-auto flex items-center">
                <form className="w-96 mx-auto" onSubmit={submit}>
                    <input
                        value={username}
                        className="w-full block p-2 mb-3 rounded-sm border"
                        type="username"
                        name="username"
                        id="username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="Username"
                    />
                    <input
                        value={password}
                        className="w-full block p-2 mb-3 rounded-sm border"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="button bg-blue-500 rounded w-full p-2 text-white"
                    >
                        Login
                    </button>
                    <div className="mt-2 text-gray-600">
                        New here? {"  "}
                        <button
                            className="text-blue-500 underline underline-offset-2"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/register");
                            }}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
