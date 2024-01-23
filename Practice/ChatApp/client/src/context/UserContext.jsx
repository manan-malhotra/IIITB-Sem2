import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [peopleOnlineContext, setPeopleOnlineContext] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedContactName, setSelectedContactName] = useState(null);
    useEffect(() => {
        const user = axios
            .get("/users/profile")
            .then((res) => {
                console.log(res.data.contacts);
                setId(res.data?.id);
                setUsername(res.data?.username);
                setPeopleOnlineContext(res.data?.contacts);
            })
            .catch((err) => {
                console.log(err);
                setId(null);
                setUsername(null);
                setPeopleOnlineContext(null);
            });
    }, []);
    return (
        <UserContext.Provider
            value={{
                id,
                setId,
                username,
                setUsername,
                peopleOnlineContext,
                setPeopleOnlineContext,
                selectedContact,
                setSelectedContact,
                selectedContactName,
                setSelectedContactName,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
