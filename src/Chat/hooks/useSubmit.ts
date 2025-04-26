import { FormEvent, useState } from "react";
import { Message } from "../../types/chat";
import { getBotResponse } from "./getBotResponse";

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export const useSubmit = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Olá, eu sou o Fanbot da FURIA! Pergunte-me sobre próximo jogo, último jogo, treinador, roster ou info geral.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((m) => [...m, { sender: "user", text: input }]);
    setInput("");

    setIsTyping(true);
    const botText = await getBotResponse(input, delay);
    setIsTyping(false);

    setMessages((m) => [...m, { sender: "bot", text: botText }]);
  };

  return { handleSubmit, messages, input, setInput, isTyping };
};
