import GameShell, { Peca } from "./GameShell";
import { CORES, ORDEM_DE_TURNOS } from "../../data/boardGame";

export default function BoardRules() {
  return (
    <GameShell atual="regras">
      <section className="bg-secao bg-leitura">
        <h1>Regras de Cromatrilha</h1>
        <p className="bg-intro">
          Leia com calma. A primeira partida costuma levar uns dez minutos a
          mais por causa das regras.
        </p>

        <h2>Conteúdo da caixa</h2>
        <ul className="bg-lista">
          <li>1 tabuleiro dobrável com a trilha central</li>
          <li>24 peças redondas, 4 de cada uma das 6 cores</li>
          <li>1 saquinho de tecido</li>
          <li>1 ampulheta de 30 segundos</li>
        </ul>

        <h2>Preparação</h2>
        <ol className="bg-passos">
          <li>Abra o tabuleiro no centro da mesa.</li>
          <li>Coloque todas as peças dentro do saquinho e misture.</li>
          <li>Cada jogador escolhe uma cor e pega as 4 peças dela.</li>
          <li>Vire a ampulheta ao iniciar a primeira rodada.</li>
        </ol>

        <h2>Ordem dos turnos</h2>
        <p>
          Na primeira partida, os jogadores jogam sempre nesta ordem, da
          esquerda para a direita:
        </p>
        <ul className="bg-turnos">
          {ORDEM_DE_TURNOS.map((cor, i) => (
            <li key={cor}>
              <Peca cor={cor} />
              <span>
                {i + 1}º jogador: {CORES[cor].nome}
              </span>
            </li>
          ))}
        </ul>

        <h2>Como vencer</h2>
        <p>
          Vence quem reproduzir a trilha lendária sem errar
          nenhuma posição. Ela foi registrada pela primeira vez no campeonato
          de lançamento e ficou guardada na seção Galeria, com a foto da
          partida que a tornou famosa.
        </p>
        <p>
          Se ninguém conseguir, vence quem tiver mais pontos depois de 6
          rodadas.
        </p>
      </section>
    </GameShell>
  );
}
