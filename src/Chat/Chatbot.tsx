import React, { useState, FormEvent } from "react";
import botIcon from "./imgs/furiaLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./style";
import { getBotResponse } from "./hooks/getBotResponse";

type Sender = "user" | "bot";

interface Message {
  sender: Sender;
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Olá, eu sou o bot da FURIA! Pergunte-me sobre próximo jogo, último jogo, jogadores…",
    },
  ]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((m) => [...m, { sender: "user", text: input }]);
    setInput("");
    const botText = await getBotResponse(input);
    setMessages((m) => [...m, { sender: "bot", text: botText }]);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>FURIA Fanbot</h1>
      </header>
      <main style={styles.chatWindow}>
        {messages.map((m, i) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={i}
              style={{
                ...styles.messageRow,
                justifyContent: isUser ? "flex-end" : "flex-start",
              }}
            >
              {!isUser && <img src={botIcon} style={styles.icon} alt="bot" />}
              <div
                style={{
                  ...styles.bubble,
                  backgroundColor: isUser ? "#1a1a1a" : "#333",
                }}
              >
                <span style={styles.text}>{m.text}</span>
              </div>
              {isUser && (
                <FontAwesomeIcon
                  icon={faUser}
                  size="2x"
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
              )}
            </div>
          );
        })}
      </main>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta…"
        />
        <button style={styles.button}>Enviar</button>
      </form>
    </div>
  );
};

export default Chatbot;
