import "./BoardGame.css";
import { CORES } from "../../data/boardGame";

import { Link } from "react-router-dom";

// Quando criar as rotas, troque os <a> por <Link to={pagina.to}> do react-router
// e ajuste os caminhos abaixo para os que você usar.
const PAGINAS = [
  { id: "home", to: "/Phase3", rotulo: "Início" },
  { id: "regras", to: "/Phase3-rules", rotulo: "Regras" },
  { id: "galeria", to: "/Phase3-gallery", rotulo: "Galeria" },
];

// Peça redonda de uma cor do jogo
export function Peca({ cor, tamanho = 28 }) {
  const { nome, hex } = CORES[cor];
  return (
    <span
      className="bg-peca"
      style={{ backgroundColor: hex, width: tamanho, height: tamanho }}
      role="img"
      aria-label={`Peça ${nome.toLowerCase()}`}
    />
  );
}

export default function GameShell({ atual, children }) {
  return (
    <div className="bg">
      <header className="bg-topo">
        <span className="bg-marca">Mesa Quatro</span>
        <nav className="bg-menu" aria-label="Principal">
          {PAGINAS.map((pagina) => (
            <Link
              key={pagina.id}
              to={pagina.to}
              aria-current={atual === pagina.id ? "page" : undefined}
            >
              {pagina.rotulo}
            </Link>
          ))}
        </nav>
      </header>

      <main className="bg-conteudo">{children}</main>

      <footer className="bg-rodape">
        <p>Mesa Quatro · Jogos de tabuleiro feitos para jogar em casa</p>
      </footer>
    </div>
  );
}
