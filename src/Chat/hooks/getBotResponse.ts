const cannedResponses: { [key: string]: string } = {
  "próximo jogo":
    "O próximo jogo da FURIA será em 10/07/2024 contra a Team Liquid, às 15h (BRT).",
  "último jogo":
    "No último confronto, a FURIA venceu a G2 por 2-1 na BLAST Premier Spring.",
  jogadores: "O roster atual da FURIA é: arT, KSCERATO, yuurih, drop e baitz.",
  treinador: "O atual treinador da FURIA é André “drop” Abreu.",
  site: "Você pode acompanhar notícias e calendários em https://furia.gg/",
};

export const getBotResponse = async (question: string): Promise<string> => {
  await new Promise((r) => setTimeout(r, 500)); // simula delay
  const q = question.toLowerCase();

  for (const key of Object.keys(cannedResponses)) {
    if (q.includes(key)) {
      return cannedResponses[key];
    }
  }
  return "Desculpe, ainda não sei responder a isso. Pergunte sobre próximo jogo, último jogo, jogadores…";
};
