import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {
        id,
        setId,
        setUsername: setLoggedInUserName,
    } = useContext(UserContext);
    useEffect(() => {
        if (id) {
            navigate("/");
        }
    }, [id]);
    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/users/register", {
                username: username,
                password: password,
            });
            toast.success(username + " registered!");
            if (response.data && response.data.id) {
                setLoggedInUserName(username);
                setId(response.data.id);
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
                <FaSignOutAlt />
                Register
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
                        Register
                    </button>
                    <div className="mt-2 text-gray-600">
                        Already have an account?{"  "}
                        <button
                            className="text-blue-500 underline underline-offset-2"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/login");
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;
