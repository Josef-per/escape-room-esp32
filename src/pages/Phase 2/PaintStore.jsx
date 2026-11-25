import "./PaintStore.css";

// Catálogo completo (a ordem aqui é "embaralhada" de propósito)
const CORES = [
  { codigo: "AR-014", nome: "Areia de Duna", hex: "#D9C2A0" },
  { codigo: "VR-102", nome: "Vermelho Cereja", hex: "#C62D3A" },
  { codigo: "CZ-240", nome: "Cinza Chumbo", hex: "#4A4F57" },
  { codigo: "AZ-310", nome: "Azul Oceano", hex: "#1F5FA8" },
  { codigo: "RS-058", nome: "Rosa Antigo", hex: "#D9A5A8" },
  { codigo: "AM-077", nome: "Amarelo Milho", hex: "#F2C230" },
  { codigo: "BR-001", nome: "Branco Gelo", hex: "#F1F3F2" },
  { codigo: "TC-133", nome: "Terracota", hex: "#B8573A" },
  { codigo: "VD-205", nome: "Verde Folha", hex: "#3E8E4E" },
  { codigo: "LL-091", nome: "Lilás Névoa", hex: "#B9ABD1" },
  { codigo: "MR-166", nome: "Marrom Café", hex: "#5B3A29" },
  { codigo: "PT-999", nome: "Preto Grafite", hex: "#1E1F22" },
];

// A SEQUÊNCIA DO JOGO: a ordem do ranking "Mais vendidas" é a resposta.
// Para mudar a sequência, é só trocar a ordem dos códigos aqui.
const MAIS_VENDIDAS = ["VR-102", "AZ-310", "AM-077", "VD-205"];

const porCodigo = (codigo) => CORES.find((c) => c.codigo === codigo);

export default function PaintStore() {
  const ranking = MAIS_VENDIDAS.map(porCodigo);

  return (
    <div className="ps">
      <header className="ps-topo">
        <span className="ps-marca">Casa Pigmento</span>
        <nav className="ps-menu" aria-label="Principal">
          {/* Quando criar a página 2, troque estes <a> por <Link> do react-router */}
          <a href="#catalogo" aria-current="page">
            Catálogo
          </a>
          <a href="#projetos">Projetos realizados</a>
        </nav>
      </header>

      <main>
        <section className="ps-hero">
          <h1>Tintas para cada cômodo da casa</h1>
          <p>
            Escolha entre mais de 1.500 cores. Leve uma amostra grátis e teste
            na parede antes de comprar.
          </p>
        </section>

        <section id="catalogo" className="ps-secao">
          <h2>Catálogo de cores</h2>
          <ul className="ps-grade">
            {CORES.map((cor) => (
              <li key={cor.codigo} className="ps-amostra">
                <div
                  className="ps-cor"
                  style={{ backgroundColor: cor.hex }}
                  role="img"
                  aria-label={`Amostra da cor ${cor.nome}`}
                />
                <div className="ps-legenda">
                  <strong>{cor.nome}</strong>
                  <span>{cor.codigo}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="ps-secao ps-ranking">
          <h2>Mais vendidas do mês</h2>
          <ol>
            {ranking.map((cor, i) => (
              <li key={cor.codigo} data-posicao={i + 1}>
                <span className="ps-ponto" style={{ backgroundColor: cor.hex }} />
                <span className="ps-ranking-nome">{cor.nome}</span>
                <span className="ps-ranking-codigo">{cor.codigo}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="ps-rodape">
        <p>Casa Pigmento · Atendimento de segunda a sábado, das 8h às 18h</p>
      </footer>
    </div>
  );
}
