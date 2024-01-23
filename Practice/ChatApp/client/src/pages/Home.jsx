import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import Contacts from "../components/Contacts";
import Chat from "../components/Chat";

function Home() {
    const { id, token } = useContext(UserContext);
    const navigate = useNavigate("");
    useEffect(() => {
        if (!id) {
            navigate("/login");
        } else {
            if (!document.cookie.includes("token")) {
                console.log(document.cookie);
                document.cookie += ";token=" + token;
            }
        }
    }, []);

    return (
        <>
            <div className="flex container2 h85vh ">
                <Contacts />
                <Chat />
            </div>
        </>
    );
}

export default Home;
