import { Match } from "../../types/matches";
import { getWikiSummary } from "./getWikiSummary";
import { useFormatMatches } from "./useFormatMatches";
import nextMatches from "../../apis/nextMatches.json";

const inputWik = (input: string) => {
  return (
    input.includes("wikipedia") ||
    input.includes("história") ||
    input.includes("info geral")
  );
};
const inputGames = (input: string) => {
  return (
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

  let response = "";

  if (input.includes("oi") || input.includes("olá")) {
    response +=
      "👋 Olá! Como posso ajudar? Se quiser saber o que posso fazer é só perguntar!!\n";
  }

  if (
    input.includes("fazer") ||
    input.includes("pode") ||
    input.includes("consegue")
  ) {
    response +=
      "🤖 Eu sou um bot que pode te ajudar a encontrar informações sobre a FURIA! " +
      "Pergunte-me sobre o próximo jogo, últimos jogos, jogadores, as redes sociais e sites da ou até mesmo a história da FURIA!\n";
  }

  if (inputWik(input)) {
    const resumo = await getWikiSummary();
    response += `📖 ${resumo}\n`;
  }

  if (input.includes("treinador")) {
    const resumo = await getWikiSummary();

    const match = resumo.match(/treinador[s]?:?\s*([^.,;]+)/i);
    const coach = match ? match[1].trim() : "André “drop” Abreu";

    response += `👨‍🏫 O treinador atual da FURIA é: ${coach}.\n`;
  }

  if (inputGames(input)) {
    const dates = extractDates(input);
    let matches: Match[];

    if (dates.length >= 2) {
      matches = filterByPeriod(dates[0], dates[1]);

      response += `📅 Partidas de ${dates[0]} até ${dates[1]}:\n${formatMatches(
        matches
      )}\n`;
    }

    if (dates.length === 1) {
      matches = filterByDate(dates[0]);

      response += `📅 Partidas em ${dates[0]}:\n${formatMatches(matches)}\n`;
    }

    if (dates.length === 0 || !dates) {
      matches = lastNMatches(4);

      response += `📅 Últimos 4 jogos:\n${formatMatches(matches)}\n`;
    }
  }

  if (input.includes("próximo jogo") || input.includes("próximos jogos")) {
    const nextMatch = nextMatches;

    response += "📅 Próximo jogo:\n";

    nextMatch.matches.forEach((match) => {
      response += `${match.teams.team1} vs ${match.teams.team2} – 
    ${match.tournament} – 
    ${match.date} às ${match.time}.\n`;
    });
  }

  if (input.includes("jogadores") || input.includes("roster")) {
    response +=
      "🎮 Roster atual de CS:GO:\n" +
      "• arT\n" +
      "• KSCERATO\n" +
      "• yuurih\n" +
      "• drop\n" +
      "• baitz\n" +
      "⠀🏆 Técnico: André “drop” Abreu";
  }

  if (
    input.includes("site") ||
    input.includes("link") ||
    input.includes("redes") ||
    input.includes("sociais")
  ) {
    response +=
      "🌐 Site oficial da FURIA: https://furia.gg/\n" +
      "📱 Redes sociais:\n" +
      "• Twitter: https://twitter.com/FURIA\n" +
      "• Instagram: https://www.instagram.com/furia/\n" +
      "• Facebook: https://www.facebook.com/FURIAesports/\n" +
      "• TikTok: https://www.tiktok.com/@furiaesports\n" +
      "• Twitch: https://www.twitch.tv/furia\n" +
      "• YouTube: https://www.youtube.com/c/FURIAEsports\n";
  }

  if (input.includes("tchau") || input.includes("até mais")) {
    response += "👋 Tchau! Até mais! Se precisar de algo mais é so perguntar\n";
  }

  if (response === "") {
    return (
      "🤔 Desculpe, ainda não entendi. Você pode perguntar sobre:\n" +
      "– “próximo jogo”\n– “últimos jogos”\n– “treinador”\n– “jogadores”\n– “história” / “Wikipedia”"
    );
  }

  return response;
};
