import { Match } from "../../types/matches";
import matchesJson from "../../apis/matches.json";

const mkComp = (d: string) => {
  const [m, day] = d.split("/").map((n) => parseInt(n, 10));
  return m * 100 + day;
};

export function useFormatMatches() {
  function extractDates(q: string): string[] {
    const regex = /(\d{2}\/\d{2})/g;
    const matches = q.match(regex);
    return matches || [];
  }

  function filterByPeriod(start: string, end: string): Match[] {
    const c0 = mkComp(start),
      c1 = mkComp(end);
    const low = Math.min(c0, c1),
      high = Math.max(c0, c1);
    return matchesJson.matches
      .filter((m) => {
        const c = mkComp(m.date);
        return c >= low && c <= high;
      })
      .sort((a, b) => mkComp(a.date) - mkComp(b.date));
  }

  function filterByDate(day: string): Match[] {
    return matchesJson.matches.filter((m) => m.date === day);
  }

  function lastNMatches(n: number): Match[] {
    return [...matchesJson.matches]
      .sort((a, b) => mkComp(b.date) - mkComp(a.date))
      .slice(0, n);
  }

  function formatMatches(matches: Match[]) {
    if (matches.length === 0)
      return "Infelizmente não pude encontrar partidas para esse período.";

    return matches
      .map(
        (m) =>
          `• ${m.date} ${m.time} | ${m.tournament}\n  ${m.teams.team1} vs ${m.teams.team2} → ${m.score}`
      )
      .join("\n\n");
  }

  return {
    extractDates,
    filterByPeriod,
    formatMatches,
    filterByDate,
    lastNMatches,
  };
}
