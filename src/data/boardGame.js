export const CORES = {
  verde: { nome: "Verde", hex: "#2e9e5b" },
  vermelho: { nome: "Vermelho", hex: "#d63c3c" },
  roxo: { nome: "Roxo", hex: "#7a4bc2" },
  amarelo: { nome: "Amarelo", hex: "#f0b92b" },
  azul: { nome: "Azul", hex: "#2b6fd6" },
  laranja: { nome: "Laranja", hex: "#ef7d22" },
};

// A SEQUÊNCIA DO JOGO (aparece na Galeria, na "Partida lendária").
// Para mudar a resposta, é só trocar a ordem aqui.
export const SEQUENCIA = ["azul", "amarelo", "vermelho", "verde"];

// Ordem de turnos mostrada nas Regras. É uma ISCA: não é a sequência.
export const ORDEM_DE_TURNOS = ["azul", "laranja", "vermelho", "amarelo"];
