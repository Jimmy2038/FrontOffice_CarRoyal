/* eslint-disable no-const-assign */
/* eslint-disable no-script-url */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import Footer from "../components/_footer";
import HeaderInfoIndex from "../components/_headerInfoIndex";
import axios from "axios";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
// import WebSocketClient from "websocket";

const Friends = () => {
  const container = {
    width: "100rem",
    height: "100rem",
  };

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { idUser } = useParams();
  var stompClient = null;
//   const usernamePage = document.querySelector("#username-page");
//   const chatPage = document.querySelector("#chat-page");
  var usernameForm = document.querySelector("#usernameForm");
  var messageForm = document.querySelector("#messageForm");
  var messageInput = document.querySelector("#messageAlefa");
  var connectedUsers = document.querySelector("#connectedUsers");
//   const connectingElement = document.querySelector(".connecting");
  var chatArea = document.querySelector("#chat-messages");
//   const logout = document.querySelector("#logout");
  var login = document.querySelector(".login");
  let selectedUserId = null;

  const getMessage = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }

      const url = `https://springboot-production-1101.up.railway.app/message/listUser/${idUser}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  };

  const onError = () => {
    console.log("tsy mety eeee");
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    if (selectedUserId && selectedUserId === message.userTo.idUser) {
      displayMessage(message.userTo.idUser, message.content);
      chatArea = document.querySelector("#chat-messages");
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  };

  const onConnected = () => {
    stompClient.subscribe(`/user/${idUser}/queue/messages`, onMessageReceived);
    stompClient.subscribe(`/user/public`, onMessageReceived);
    login = document.querySelector(".login");
    connectedUsers = document.querySelector("#connectedUsers");
    if (login) {
      login.classList.add("hidden");
       connectedUsers.classList.remove("hidden");
    console.log("mety");
    }
   
  };

  const connect = () => {
    let socket = new SockJS("https://springboot-production-1101.up.railway.app/ws");
    if (stompClient == null) {
      stompClient = Stomp.over(socket);
      stompClient.connect({}, onConnected, onError);
    } else {
      if (stompClient.connected) {
        console.log("deja connecter");
      } else {
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
      }
    }
  };

  useEffect(() => {
    // marquerId est récupéré à partir des paramètres d'URL
    getMessage();
    // connect();
  }, []);

  if (data == null) {
    console.log("Loading");
    return <div>Loading...</div>;
  }

  function displayMessage(senderId, content) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    if (senderId === `${idUser}`) {
      messageContainer.classList.add("sender");
    } else {
      messageContainer.classList.add("receiver");
    }
    const message = document.createElement("p");
    message.textContent = content;
    messageContainer.appendChild(message);
    chatArea = document.querySelector("#chat-messages");
    chatArea.appendChild(messageContainer);
  }

  async function fetchAndDisplayUserChat() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }
      const url = `https://springboot-production-1101.up.railway.app/message/discu/${idUser}/${selectedUserId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userChat = response.data;
      chatArea = document.querySelector("#chat-messages");
      chatArea.innerHTML = "";
      userChat.forEach((chat) => {
        displayMessage(chat.userTo.idUser, chat.content);
      });
      chatArea.scrollTop = chatArea.scrollHeight;
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError(
        "Erreur lors du chargement des données. Veuillez réessayer plus tard."
      );
    }
  }

  function userItemClick(event) {
    document.querySelectorAll(".user-item").forEach((item) => {
      item.classList.remove("active");
    });
    messageForm = document.querySelector("#messageForm");
    messageForm.classList.remove("hidden");

    const clickedUser = event.currentTarget;
    clickedUser.classList.add("active");

    selectedUserId = clickedUser.getAttribute("id");
    console.log(selectedUserId);
    messageForm.classList.remove("hidden");
    fetchAndDisplayUserChat().then();

    // const nbrMsg = clickedUser.querySelector(".nbr-msg");
    // nbrMsg.classList.add("hidden");
    // nbrMsg.textContent = "0";
  }

  function sendMessage(e) {
    e.preventDefault();
     messageInput = document.querySelector("#messageAlefa");
    const messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
      const chatMessage = {
        content: messageContent,
        userTo: { idUser: `${idUser}` }, // id de l'envoyeur
        userFrom: { idUser: `${selectedUserId}` }, // id du recepteur
      };
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token d'autorisation manquant. Veuillez vous connecter.");
        return;
      }
      stompClient.send(
        "/app/chat",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        JSON.stringify(chatMessage)
      );
      displayMessage(`${idUser}`, messageInput.value.trim());
      messageInput.value = "";
    }
    messageInput.value = "";
    chatArea = document.querySelector("#chat-messages");
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  return (
    <>
      <HeaderInfoIndex />
      <div className="chat-container" id="chat-page">
        <div className="users-list">
          <div className="users-list-container">
            <h2>Friends List</h2>
            <button onClick={connect} className="login">
              Show List
            </button>
            <ul id="connectedUsers" className="hidden">
              {data.listUser.map((friend, index) => (
                <li
                  className="user-item "
                  key={index}
                  id={friend.idUser}
                  onClick={userItemClick}
                >
                  {friend.pseudo}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p id="connected-user-fullname"></p>
            <a className="logout" id="logout">
              Logout
            </a>
          </div>
        </div>

        <div className="chat-area">
          <div className="chat-area" id="chat-messages"></div>

          <form id="messageForm" name="messageForm" className="hidden">
            <div className="message-input">
              <input
                autoComplete="off"
                type="text"
                id="messageAlefa"
                placeholder="Type your message..."
                required
              />
              <button onClick={(e) => sendMessage(e)}>Send</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Friends;
