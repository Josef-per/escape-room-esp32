import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEsp32, SERIAL_SUPORTADO } from "./services/useESP32";
import "./css/App.css";

const NOME_DO_JOGO = "A Sequência";
const ROTA_DO_JOGO = "/Phase1";

// Os botões físicos. Os ids são o que o ESP32 deve enviar (ou o número da posição,
// começando em 0: 0 = laranja, 1 = azul, ...). Ajuste para as cores do seu painel.
const BOTOES = [
  { id: "laranja", nome: "Laranja", hex: "#ff7a1a" },
  { id: "azul", nome: "Azul", hex: "#2f7bff" },
  { id: "amarelo", nome: "Amarelo", hex: "#ffd23a" },
  { id: "verde", nome: "Verde", hex: "#2fd16b" },
  { id: "roxo", nome: "Roxo", hex: "#9b5cf0" },
  { id: "vermelho", nome: "Vermelho", hex: "#ff4040" },
];

// Sequência só do tutorial (não é a do jogo)
const SEQUENCIA_TESTE = ["vermelho", "amarelo", "azul"];

const ROTULO_ESTADO = {
  desconectado: "SEM SINAL",
  conectando: "PROCURANDO...",
  conectado: "CONECTADO",
  erro: "FALHA NA CONEXÃO",
};

// Aceita "vermelho", "5", {"botao":"vermelho"} ou {"botao":5}
function lerBotao(mensagem) {
  let valor = mensagem.trim().toLowerCase();
  try {
    const json = JSON.parse(valor);
    if (json && typeof json === "object") {
      valor = String(json.botao ?? json.button ?? json.cor ?? "").toLowerCase();
    } else {
      valor = String(json);
    }
  } catch {
    // não era JSON, segue com o texto puro
  }
  if (/^\d+$/.test(valor)) return BOTOES[Number(valor)]?.id ?? null;
  return BOTOES.some((b) => b.id === valor) ? valor : null;
}

function Janela({ id, titulo, children }) {
  return (
    <section className="lp-janela" aria-labelledby={id}>
      <div className="lp-janela-barra">
        <h2 id={id}>{titulo}</h2>
        <span className="lp-janela-controles" aria-hidden="true">
          <i />
          <i />
        </span>
      </div>
      <div className="lp-janela-corpo">{children}</div>
    </section>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const [simulado, setSimulado] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [aceso, setAceso] = useState(null);
  const [log, setLog] = useState([
    "> sistema iniciado",
    "> aguardando conexão com o painel de botões",
  ]);
  const temporizador = useRef(null);

  const concluido = progresso >= SEQUENCIA_TESTE.length;

  function registrar(texto) {
    setLog((atual) => [...atual, `> ${texto}`].slice(-8));
  }

  function apertar(id) {
    const botao = BOTOES.find((b) => b.id === id);
    if (!botao) return;

    setAceso(id);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAceso(null), 350);

    if (concluido) {
      registrar(`botão ${botao.nome.toLowerCase()}`);
    } else if (id === SEQUENCIA_TESTE[progresso]) {
      setProgresso(progresso + 1);
      registrar(`botão ${botao.nome.toLowerCase()}: correto`);
    } else {
      setProgresso(0);
      registrar(`botão ${botao.nome.toLowerCase()}: errado, recomece`);
    }
  }

  const { estado, conectar, desconectar } = useEsp32({
    aoReceberMensagem: (mensagem) => {
      const id = lerBotao(mensagem);
      if (id) apertar(id);
      else registrar("sinal desconhecido ignorado");
    },
    aoMudarEstado: (novo, detalhe) => {
      registrar(
        novo === "conectando"
          ? "procurando o painel..."
          : `${ROTULO_ESTADO[novo].toLowerCase()}${detalhe ? ` (${detalhe})` : ""}`
      );
    },
  });

  // No modo simulado, as teclas 1 a 6 funcionam como os botões
  useEffect(() => {
    if (!simulado) return undefined;
    function aoTeclar(evento) {
      if (evento.target instanceof HTMLInputElement) return;
      const botao = BOTOES[Number(evento.key) - 1];
      if (botao) apertar(botao.id);
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  });

  useEffect(() => () => clearTimeout(temporizador.current), []);

  function recomecarTeste() {
    setProgresso(0);
    registrar("teste reiniciado");
  }

  return (
    <div className="lp">
      <header className="lp-topo">
        <p className="lp-sala">SALA 01 // CONEXÃO ESTABELECIDA</p>
        <h1 className="lp-titulo">{NOME_DO_JOGO}</h1>
        <p className="lp-intro">
          Bem-vindo(a). Antes de entrar, precisamos conferir se os botões
          estão te ouvindo. Siga as instruções e não feche esta janela.
        </p>
      </header>

      <main className="lp-janelas">
        <Janela id="lp-tutorial" titulo="tutorial.exe">
          <ol className="lp-passos">
            <li>
              <strong>Procure.</strong> Em alguns sites existe uma sequência de
              cores escondida. Ela pode estar onde você menos espera.
            </li>
            <li>
              <strong>Anote.</strong> A ordem importa. Uma cor fora do lugar
              invalida tudo.
            </li>
            <li>
              <strong>Aperte.</strong> Use os botões coloridos do painel,
              na mesma ordem em que você encontrou as cores.
            </li>
          </ol>
        </Janela>

        <Janela id="lp-conexao" titulo="conexao.exe">
          <div className="lp-form">
            <p>
              Conecte o painel ao computador pelo cabo USB e clique no botão
              abaixo. O navegador vai pedir para você escolher a porta.
            </p>
            <div className="lp-form-linha">
              {estado === "conectado" ? (
                <button type="button" className="lp-btn" onClick={desconectar}>
                  Desconectar
                </button>
              ) : (
                <button
                  type="button"
                  className="lp-btn"
                  onClick={conectar}
                  disabled={estado === "conectando" || !SERIAL_SUPORTADO}
                >
                  Selecionar porta
                </button>
              )}
            </div>
            {!SERIAL_SUPORTADO && (
              <p className="lp-aviso" role="alert">
                Este navegador não tem acesso à porta serial. Abra a página no
                Chrome ou no Edge, no computador.
              </p>
            )}
          </div>

          <p className={`lp-estado lp-estado--${estado}`} role="status">
            <span className="lp-led" aria-hidden="true" />
            {ROTULO_ESTADO[estado]}
          </p>

          <div className="lp-console" aria-label="Registro do sistema" aria-live="polite">
            {log.map((linha, i) => (
              <p key={`${i}-${linha}`}>{linha}</p>
            ))}
            <p className="lp-cursor" aria-hidden="true">
              &gt;
            </p>
          </div>

          <label className="lp-check">
            <input
              type="checkbox"
              checked={simulado}
              onChange={(e) => setSimulado(e.target.checked)}
            />
            Testar sem o painel (cliques na tela ou teclas 1 a 6)
          </label>
          <p className="lp-nota">
            Dica: feche o Monitor Serial da Arduino IDE antes de conectar, pois
            só um programa pode usar a porta por vez. Algumas placas reiniciam
            ao abrir a conexão, então espere um segundo antes de apertar os
            botões.
          </p>
        </Janela>

        <Janela id="lp-teste" titulo="teste.exe">
          <p className="lp-instrucao">
            Aperte estes botões, nesta ordem:
          </p>

          <ol className="lp-alvo" aria-label="Sequência do teste">
            {SEQUENCIA_TESTE.map((id, i) => {
              const botao = BOTOES.find((b) => b.id === id);
              const situacao =
                i < progresso ? "feito" : i === progresso ? "atual" : "espera";
              return (
                <li key={id} className={`lp-alvo-item lp-alvo-item--${situacao}`}>
                  <span
                    className="lp-alvo-cor"
                    style={{ backgroundColor: botao.hex }}
                    aria-hidden="true"
                  />
                  {botao.nome}
                  {situacao === "feito" && <span className="lp-ok"> ✓</span>}
                </li>
              );
            })}
          </ol>

          <div className="lp-botoes">
            {BOTOES.map((botao) => (
              <button
                key={botao.id}
                type="button"
                className={`lp-botao${aceso === botao.id ? " lp-botao--aceso" : ""}`}
                style={{ "--cor": botao.hex }}
                disabled={!simulado}
                onClick={() => apertar(botao.id)}
              >
                {botao.nome}
              </button>
            ))}
          </div>

          <p className="lp-resultado" role="status">
            {concluido
              ? "Teste concluído. A porta está destrancada."
              : `Progresso: ${progresso} de ${SEQUENCIA_TESTE.length}`}
          </p>

          {progresso > 0 && !concluido && (
            <button type="button" className="lp-btn lp-btn--discreto" onClick={recomecarTeste}>
              Recomeçar teste
            </button>
          )}
        </Janela>
      </main>

      <footer className="lp-entrar">
        <button
          type="button"
          className="lp-entrar-botao"
          disabled={!concluido}
          onClick={() => navigate(ROTA_DO_JOGO)}
          aria-describedby="lp-entrar-aviso"
        >
          ENTRAR
        </button>
        <p id="lp-entrar-aviso" className="lp-nota">
          {concluido
            ? "Tudo certo. Boa sorte."
            : "Conclua o teste para destrancar a porta."}
        </p>
      </footer>
    </div>
  );
}
