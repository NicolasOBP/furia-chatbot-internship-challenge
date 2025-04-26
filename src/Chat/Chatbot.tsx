import React from "react";
import botIcon from "./imgs/furiaLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./style";
import { useSubmit } from "./hooks/useSubmit";
import { ChatIcon } from "./Components/ChatIcon";

const Chatbot: React.FC = () => {
  const { handleSubmit, input, messages, setInput } = useSubmit();

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
              <ChatIcon isUser={isUser} position="left" />

              <div
                style={{
                  ...styles.bubble,
                  backgroundColor: isUser ? "#1a1a1a" : "#333",
                }}
              >
                <span style={styles.text}>{m.text}</span>
              </div>

              <ChatIcon isUser={isUser} position="right" />
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
