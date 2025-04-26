import React, { useEffect, useRef } from "react";
import { styles } from "./style";
import { useSubmit } from "./hooks/useSubmit";
import { ChatIcon } from "./Components/ChatIcon";
import { TypingAnimation } from "./Components/TypingAnimation";

const Chatbot: React.FC = () => {
  const { handleSubmit, input, messages, setInput, isTyping } = useSubmit();

  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatWindowRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

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

        <TypingAnimation isTyping={isTyping} />
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
