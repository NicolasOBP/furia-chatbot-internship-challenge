import { FormEvent, useState } from "react";
import { Message } from "../../types/chat";
import { getBotResponse } from "./getBotResponse";

export const useSubmit = () => {
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

  return { handleSubmit, messages, input, setInput };
};
