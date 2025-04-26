export type Match = {
  date: string;
  time: string;
  tournament: string;
  teams: { team1: string; team2: string };
  score: string;
};

export type NextMatch = {
  date: string;
  time: string;
  tournament: string;
  teams: { team1: string; team2: string };
};
