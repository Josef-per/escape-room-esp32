import GameShell, { Peca } from "./GameShell";
import { CORES, SEQUENCIA } from "../../data/boardGame";

// Fotos de partidas. A "trilha lendária" usa a SEQUENCIA; as outras são iscas.
const PARTIDAS = [
  {
    id: "p1",
    titulo: "Noite de sexta",
    legenda: "Quatro jogadores, empate na sexta rodada.",
    trilha: ["azul", "verde", "laranja", "vermelho"],
  },
  {
    id: "p2",
    titulo: "Primeira partida da Marina",
    legenda: "Ela errou duas posições e pediu revanche na hora.",
    trilha: ["amarelo", "azul", "azul", "laranja"],
  },
  {
    id: "p3",
    titulo: "Torneio da vizinhança",
    legenda: "Doze mesas, uma final disputada no desempate.",
    trilha: ["verde", "vermelho", "amarelo", "azul"],
  },
  {
    id: "p4",
    titulo: "Trilha lendária",
    legenda: "Campeonato de lançamento. Nove rodadas, zero erros.",
    trilha: SEQUENCIA,
  },
  {
    id: "p5",
    titulo: "Partida a dois",
    legenda: "Jogo rápido no intervalo do almoço.",
    trilha: ["vermelho", "azul", "verde", "amarelo"],
  },
  {
    id: "p6",
    titulo: "Teste com crianças",
    legenda: "Ganhou quem lembrou da cor do meio.",
    trilha: ["vermelho", "azul", "amarelo", "azul"],
  },
];

function Trilha({ trilha }) {
  const descricao = trilha.map((cor) => CORES[cor].nome).join(", ");
  return (
    <div className="bg-trilha" role="group" aria-label={`Trilha: ${descricao}`}>
      {trilha.map((cor, i) => (
        <span key={`${cor}-${i}`} className="bg-casa">
          <Peca cor={cor} tamanho={30} />
        </span>
      ))}
    </div>
  );
}

export default function BoardGallery() {
  return (
    <GameShell atual="galeria">
      <section className="bg-secao">
        <h1>Galeria</h1>
        <p className="bg-intro">
          Fotos de partidas enviadas por quem já jogou. Cada tabuleiro mostra a
          trilha de peças que ficou montada no fim da rodada.
        </p>

        <ul className="bg-galeria">
          {PARTIDAS.map((partida) => (
            <li key={partida.id} className="bg-cartao">
              <div className="bg-foto">
                <Trilha trilha={partida.trilha} />
              </div>
              <h3>{partida.titulo}</h3>
              <p>{partida.legenda}</p>
            </li>
          ))}
        </ul>
      </section>
    </GameShell>
  );
}
