import { Match } from "../../types/matches";
import { getWikiSummary } from "./getWikiSummary";
import { useFormatMatches } from "./useFormatMatches";

const inputWik = (input: string) => {
  return (
    input.includes("wikipedia") ||
    input.includes("história") ||
    input.includes("info geral")
  );
};
const inputGames = (input: string) => {
  return (
    input.includes("jogos") ||
    input.includes("últimos jogos") ||
    input.includes("resultado") ||
    input.includes("resultados") ||
    input.includes("partidas")
  );
};

export const useBotResponse = async (
  question: string,
  delay: (ms?: number) => Promise<unknown>
): Promise<string> => {
  await delay(300 + Math.random() * 700);

  const input = question.toLowerCase();
  const {
    extractDates,
    filterByPeriod,
    formatMatches,
    filterByDate,
    lastNMatches,
  } = useFormatMatches();

  if (inputWik(input)) {
    const resumo = await getWikiSummary();
    return `📖 Resumo da Wikipedia:\n${resumo}`;
  }

  if (input.includes("treinador")) {
    const resumo = await getWikiSummary();

    const match = resumo.match(/treinador[s]?:?\s*([^.,;]+)/i);
    const coach = match ? match[1].trim() : "André “drop” Abreu";
    return `👨‍🏫 O treinador atual da FURIA é: ${coach}.`;
  }

  if (inputGames(input)) {
    const dates = extractDates(input);
    let matches: Match[];

    if (dates.length >= 2) {
      matches = filterByPeriod(dates[0], dates[1]);
      return `📅 Partidas de ${dates[0]} até ${dates[1]}:\n${formatMatches(
        matches
      )}`;
    }

    if (dates.length === 1) {
      matches = filterByDate(dates[0]);
      return `📅 Partidas em ${dates[0]}:\n${formatMatches(matches)}`;
    }

    matches = lastNMatches(4);
    return `📅 Últimos 4 jogos:\n${formatMatches(matches)}`;
  }

  if (input.includes("próximo jogo")) {
    return (
      "📅 Próximo jogo:\n" +
      "FURIA vs Loud – IEM Rio Major – 10/07/2024 às 15h (BRT).\n" +
      "📌 Local: Jeunesse Arena, Rio de Janeiro."
    );
  }

  if (input.includes("jogadores") || input.includes("roster")) {
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

  if (input.includes("site") || input.includes("link")) {
    return "🌐 Site oficial da FURIA: https://furia.gg/";
  }

  return (
    "🤔 Desculpe, ainda não entendi. Você pode perguntar sobre:\n" +
    "– “próximo jogo”\n– “últimos jogos”\n– “treinador”\n– “jogadores”\n– “história” / “Wikipedia”"
  );
};
