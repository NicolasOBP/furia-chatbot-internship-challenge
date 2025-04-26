export const getMatches = async (): Promise<string> => {
  const target = encodeURIComponent("https://draft5.gg/equipe/330-FURIA");

  const proxy = `https://api.allorigins.win/raw?url=${target}`;

  const res = await fetch(proxy);
  if (!res.ok) throw new Error("Falha ao buscar Draft5");
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Exemplo: supomos que o site coloque as partidas em linhas <tr class="match-row">
  const rows = Array.from(doc.querySelectorAll("tr.match-row")).slice(0, 5);
  if (rows.length === 0)
    return "Não consegui extrair os últimos jogos da Draft5.";

  const jogos = rows.map((tr) => {
    // supondo colunas: data, adversário, resultado (ex: “2-1”)…
    const tds = tr.querySelectorAll("td");
    const data = tds[0]?.textContent?.trim() || "";
    const opponent = tds[1]?.textContent?.trim() || "";
    const score = tds[2]?.textContent?.trim() || "";
    return `${data} vs ${opponent}: ${score}`;
  });
  return `Últimos jogos na Draft5 (até 5):\n• ${jogos.join("\n• ")}`;
};
