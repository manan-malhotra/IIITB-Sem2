import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
function Contacts() {
    axios.defaults.withCredentials = true;
    const {
        username,
        setPeopleOnlineContext,
        peopleOnlineContext: peopleOnline,
        selectedContact,
        setSelectedContact,
        setSelectedContactName,
    } = useContext(UserContext);
    const [contact, setContact] = useState("");
    const handleContact = (user) => {
        setSelectedContact(user._id);
        setSelectedContactName(user.username);
        let change = [...peopleOnline];
        change.map((u) => {
            if (u._id === user._id) {
                if (u.unread) {
                    u.unread = 0;
                }
            }
        });
        setPeopleOnlineContext(change);
    };
    const searchContact = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/users/contacts", {
                username: contact,
            });
            setPeopleOnlineContext(res.data.contacts);
        } catch (error) {
            const errorMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(errorMessage);
        }
        setContact("");
    };
    useEffect(() => {}, [peopleOnline]);
    return (
        <>
            <div className="w-1/3 bg-blue-50 h85vh rounded-l-2xl relative border-r   border-slate-500 ">
                <div className="mt-3 h8vh grid content-center ">
                    <h2 className="text-2xl font-bold text-center ">
                        Welcome {username}
                    </h2>
                </div>
                <div className="h69vh  relative grid">
                    <div className="contacts pl-1  overflow-y-scroll top-0 left-0 right-0 bottom-2">
                        {peopleOnline && peopleOnline.length === 0 && (
                            <div>No contacts</div>
                        )}
                        {peopleOnline &&
                            peopleOnline.map((user) => (
                                <div
                                    className={
                                        "cursor-pointer  p-4 h-16  border flex mb-2   w-full rounded-3xl items-center " +
                                        (selectedContact === user._id &&
                                            " bg-blue-300 border-l-4 border-gray-500 border-0 rounded-l-xxl      ")
                                    }
                                    key={user._id}
                                    onClick={() => {
                                        handleContact(user);
                                    }}
                                >
                                    <div className="h-10 w-10 opacity-75 rounded-full bg-cyan-500 text-center flex items-center justify-center  ">
                                        {user.username[0]}
                                    </div>
                                    <div className="ml-6   ">
                                        {user.username}
                                    </div>
                                    {user.unread > 0 && (
                                        <span className="ml-auto mr-4 bg-green-400 rounded-full h-4 w-4 text-xs  ">
                                            {user.unread}
                                        </span>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="h8vh">
                    <form
                        className="flex items-stretch mx-1"
                        onSubmit={searchContact}
                    >
                        <input
                            type="text"
                            className="w-full block p-2 mx-auto rounded-l-lg border border-r-0 border-gray-500"
                            placeholder="Add contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                        <div className=" bg-white flex text-xl border border-l-0 rounded-r-lg pr-2 cursor-pointer  border-gray-500">
                            <button type="submit" className="">
                                <FiSearch className="h-full" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contacts;
