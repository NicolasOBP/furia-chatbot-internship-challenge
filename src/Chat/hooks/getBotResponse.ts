import { getMatches } from "./getMatches";
import { getWikiSummary } from "./getWikiSummary";

const cannedResponses: { [key: string]: string } = {
  "próximo jogo":
    "O próximo jogo da FURIA será em 10/07/2024 contra a Team Liquid, às 15h (BRT).",
  "último jogo":
    "No último confronto, a FURIA venceu a G2 por 2-1 na BLAST Premier Spring.",
  jogadores: "O roster atual da FURIA é: arT, KSCERATO, yuurih, drop e baitz.",
  treinador: "O atual treinador da FURIA é André “drop” Abreu.",
  site: "Você pode acompanhar notícias e calendários em https://furia.gg/",
};

export const getBotResponse = async (
  question: string,
  delay: (ms?: number) => Promise<unknown>
): Promise<string> => {
  await delay(300 + Math.random() * 700);
  const q = question.toLowerCase();

  if (
    q.includes("wikipedia") ||
    q.includes("história") ||
    q.includes("info geral")
  ) {
    // retorna o summary da Wiki
    const resumo = await getWikiSummary();
    return `📖 Resumo da Wikipedia:\n${resumo}`;
  }

  if (q.includes("treinador")) {
    // hoje sabemos que o técnico é André “drop” Abreu, mas podemos buscar na Wiki
    const resumo = await getWikiSummary();
    // tentamos extrair a frase “Treinador: X” do resumo
    const match = resumo.match(/treinador[s]?:?\s*([^.,;]+)/i);
    const coach = match ? match[1].trim() : "André “drop” Abreu";
    return `👨‍🏫 O treinador atual da FURIA é: ${coach}.`;
  }

  if (
    q.includes("jogos") ||
    q.includes("últimos jogos") ||
    q.includes("resultados")
  ) {
    // busca na draft5
    try {
      const jogosDraft = await getMatches();
      return jogosDraft;
    } catch (e) {
      console.error(e);
      return "⚠️ Não consegui recuperar resultados do Draft5 no momento.";
    }
  }

  if (q.includes("próximo jogo")) {
    // site oficial da FURIA tem calendário, mas sem API pública:
    return (
      "📅 Próximo jogo:\n" +
      "FURIA vs Team Liquid – IEM Rio Major – 10/07/2024 às 15h (BRT).\n" +
      "📌 Local: Jeunesse Arena, Rio de Janeiro."
    );
  }

  if (q.includes("jogadores") || q.includes("roster")) {
    // você pode também extrair do JSON da Wiki via API: prop=pageprops ou scrap infobox
    return (
      "🎮 Roster atual de CS:GO:\n" +
      "• arT\n" +
      "• KSCERATO\n" +
      "• yuurih\n" +
      "• drop\n" +
      "• baitz\n" +
      "⠀🏆 Técnico: André “drop” Abreu"
    );
  }

  if (q.includes("site") || q.includes("link")) {
    return "🌐 Site oficial da FURIA: https://furia.gg/";
  }

  return (
    "🤔 Desculpe, ainda não entendi. Você pode perguntar sobre:\n" +
    "– “próximo jogo”\n– “últimos jogos”\n– “treinador”\n– “jogadores”\n– “história” / “Wikipedia”"
  );
};
