export const getWikiSummary = async (): Promise<string> => {
  const url = "https://pt.wikipedia.org/api/rest_v1/page/summary/Furia_Esports";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha ao buscar Wiki");
  const data = await res.json();
  // data.extract contém um parágrafo introdutório
  return data.extract as string;
};
