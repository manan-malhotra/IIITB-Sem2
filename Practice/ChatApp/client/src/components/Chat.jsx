import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
function Chat() {
    const [ws, setWs] = useState("");
    const divUnderMessages = useRef();

    const {
        selectedContact,
        setSelectedContact,
        selectedContactName,
        id,
        peopleOnlineContext,
        setPeopleOnlineContext,
    } = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    useEffect(() => {
        const div = divUnderMessages.current;
        if (div) {
            div.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [chat, selectedContact]);
    useEffect(() => {
        if (ws) {
            const socket = ws;
            console.log(socket + "wsd");
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if ("message" in data) {
                    const newChat = {
                        id: data._id,
                        message: data.message,
                        sender: data.sender,
                        recipient: data.recipient,
                        time: new Date().toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        }),
                    };
                    console.log(data);
                    console.log(newChat);
                    let change = [...peopleOnlineContext];
                    change.map((user) => {
                        if (user._id === newChat.sender) {
                            if (newChat.sender === selectedContact) {
                                user.unread = 0;
                                if (selectedContact) {
                                    axios
                                        .get("/messages/" + selectedContact)
                                        .then((res) => {
                                            console.log(res.data.contacts);
                                            setPeopleOnlineContext(
                                                res.data.contacts
                                            );
                                        });
                                }
                            } else if (user.unread) {
                                user.unread += 1;
                            } else {
                                user.unread = 1;
                            }
                        }
                    });
                    setPeopleOnlineContext(change);
                    setChat((prev) => [...prev, newChat]);
                }
            };
        }
    }, [selectedContact, ws]);
    useEffect(() => {
        // const socket = new WebSocket("wss://localhost:3000");
        const socket = new WebSocket("wss://chatapp-opb9.onrender.com/");
        setWs(socket);
    }, []);
    useEffect(() => {
        axios.get("/messages").then((res) => {
            let chats = [];
            console.log(res.data);
            setChat(res.data.messages);
        });
    }, []);
    useEffect(() => {
        if (selectedContact) {
            axios.get("/messages/" + selectedContact).then((res) => {
                console.log(res.data.contacts);
                setPeopleOnlineContext(res.data.contacts);
            });
        }
    }, [selectedContact]);
    const sendMessage = (e) => {
        e.preventDefault();
        if (message === "") return;
        const data = { message, selectedContact };
        ws.send(JSON.stringify(data));
        const newChat = {
            message: data.message,
            sender: id,
            recipient: selectedContact,
            time: new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            }),
        };
        console.log(newChat);
        setChat((prev) => [...prev, newChat]);
        setMessage("");
    };
    return (
        <div className="w-2/3 bg-slate-500  rounded-r-2xl   ">
            {!selectedContact && (
                <div className="h85vh">
                    <span className="text-gray-700 h-full grid content-center">
                        Select contact to continue chat
                    </span>
                </div>
            )}
            <div className="">
                <div className="h8vh grid content-center w-full bg-blue-50 rounded-tr-2xl ">
                    {selectedContactName && <span>{selectedContactName}</span>}
                </div>
            </div>

            <div className="h69vh grid items-end relative mt-3">
                <div className="messages overflow-y-scroll absolute top-0 left-0 right-0 bottom-2 ">
                    {chat.map((message) => (
                        <>
                            {message.sender === id &&
                            message.recipient === selectedContact ? (
                                <div className="right">
                                    {message.message}
                                    <span className="text-xs">
                                        {" "}
                                        {message.time && message.time}
                                        {message.createdAt &&
                                            new Date(
                                                message.createdAt
                                            ).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                            })}
                                    </span>
                                </div>
                            ) : (
                                <></>
                            )}
                            {message.recipient === id &&
                            message.sender == selectedContact ? (
                                <div className="left">
                                    {message.message}
                                    <span className="text-xs">
                                        {" "}
                                        {message.time && message.time}
                                        {message.createdAt &&
                                            new Date(
                                                message.createdAt
                                            ).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                            })}
                                    </span>
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                    {selectedContact && (
                        <div>
                            <div ref={divUnderMessages}></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-2 mx-0.5 h8vh">
                {selectedContact && (
                    <>
                        <form className="flex" onSubmit={sendMessage}>
                            <input
                                type="text"
                                name="text"
                                id="text"
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full block p-2 mx-auto rounded-l-lg"
                            />
                            <button
                                type="submit"
                                className="w-auto bg-blue-500 text-white rounded-r-lg px-4 "
                            >
                                <IoMdSend />
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chat;
