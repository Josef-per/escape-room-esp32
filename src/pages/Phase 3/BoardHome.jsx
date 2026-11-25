import GameShell, { Peca } from "./GameShell";

// Peças decorativas da caixa (ordem aleatória de propósito, não é a sequência)
const PECAS_DA_CAIXA = ["laranja", "verde", "azul", "roxo", "vermelho", "amarelo"];

export default function BoardHome() {
  return (
    <GameShell atual="home">
      <section className="bg-hero">
        <div className="bg-hero-texto">
          <h1>Cromatrilha</h1>
          <p>
            Um jogo de tabuleiro para 2 a 4 jogadores. Monte a trilha de peças
            coloridas na ordem certa antes que a mesa inteira descubra a sua
            jogada.
          </p>
          <ul className="bg-fatos">
            <li>2 a 4 jogadores</li>
            <li>30 minutos</li>
            <li>A partir de 8 anos</li>
          </ul>
          <a className="bg-botao" href="/regras">
            Ler as regras
          </a>
        </div>

        <div className="bg-caixa" aria-hidden="true">
          <span className="bg-caixa-titulo">Cromatrilha</span>
          <div className="bg-caixa-pecas">
            {PECAS_DA_CAIXA.map((cor) => (
              <Peca key={cor} cor={cor} tamanho={34} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secao">
        <h2>Como é uma partida</h2>
        <div className="bg-colunas">
          <article className="bg-cartao">
            <h3>Observe</h3>
            <p>
              Cada rodada começa com uma trilha de peças sobre o tabuleiro.
              Você tem poucos segundos para guardá-la na memória.
            </p>
          </article>
          <article className="bg-cartao">
            <h3>Reproduza</h3>
            <p>
              A trilha é escondida e cada jogador tenta refazê-la usando as
              peças da sua cor.
            </p>
          </article>
          <article className="bg-cartao">
            <h3>Compare</h3>
            <p>
              Quem acertar mais posições na ordem certa marca pontos e escolhe
              a próxima trilha.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-secao">
        <h2>Novidades</h2>
        <article className="bg-cartao bg-novidade">
          <h3>Lista de espera da segunda edição</h3>
          <p>
            A tiragem da primeira edição acabou. Quem entrar na lista recebe um
            aviso quando a nova tiragem chegar.
          </p>
        </article>
      </section>
    </GameShell>
  );
}
