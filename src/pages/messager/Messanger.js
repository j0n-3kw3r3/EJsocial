import "./messanger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversations from "../../components/coversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {io} from "socket.io-client"


export default function Messanger() {
  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState();
  const [newMessages, setNewMessages] = useState();
  const { user: currentUser } = useContext(AuthContext);
  const scrollRef = useRef();
  const socketURL = "ws://localhost:8000"
  
  io(socketURL)

  useEffect(() => {
    const getConvo = async () => {
      try {
        const res = await axios.get(`/conversations/${currentUser._id}`);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConvo();
  }, [currentUser]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);

  const handleSubmit = async(e) => {
    e.preventDefault()
    const message = {
      sender: currentUser._id,
      text: newMessages,
      conversationId: currentChat,
    };

    try {
      const res = await axios.post("/messages", message)
      setMessages([...messages, res.data])
      setNewMessages('')
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages]);
  return (
    <>
      <Topbar />
      <div className="messanger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversation?.map((data) => (
              <div
                onClick={() => {
                  setCurrentChat(data._id);
                }}
              >
                <Conversations
                  key={data._id}
                  data={data}
                  currentUser={currentUser}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((message) => {
                    return (
                      <div ref={scrollRef}>
                        <Message
                          key={message._id}
                          own={message.sender === currentUser._id}
                          message={message}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Send a message..."
                    onChange={(e=>setNewMessages(e.target.value))}
                  ></textarea>
                  <button className="chatSubmitBotton" onClick={handleSubmit} >Send</button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
