import { useCallback, useEffect, useRef, useState } from "react";

// Velocidade da Serial. Precisa ser a mesma do Serial.begin() no código do ESP32.
export const BAUD_PADRAO = 115200;

// A Web Serial API só existe no Chrome e no Edge (desktop), em localhost ou https.
export const SERIAL_SUPORTADO =
  typeof navigator !== "undefined" && "serial" in navigator;

/**
 * Conversa com o ESP32 pelo cabo USB usando a Web Serial API.
 * O ESP32 deve enviar uma linha por mensagem, terminada em \n
 * (por exemplo, Serial.println("vermelho");).
 *
 * estado: "desconectado" | "conectando" | "conectado" | "erro"
 * aoReceberMensagem(linha): chamada a cada linha recebida do ESP32
 * aoMudarEstado(estado, detalhe): chamada a cada mudança de estado
 * conectar(): abre a janela do navegador para escolher a porta (precisa vir de um clique)
 * enviar(texto): manda uma linha para o ESP32 (o site "fala" com ele)
 */
export function useEsp32({
  aoReceberMensagem,
  aoMudarEstado,
  baudRate = BAUD_PADRAO,
} = {}) {
  const [estado, setEstado] = useState("desconectado");
  const portaRef = useRef(null);
  const leitorRef = useRef(null);
  const leituraRef = useRef(null);
  const encerrandoRef = useRef(false);
  const aoReceberRef = useRef(aoReceberMensagem);
  const aoMudarRef = useRef(aoMudarEstado);

  // Mantém os callbacks sempre atualizados sem recriar a conexão
  useEffect(() => {
    aoReceberRef.current = aoReceberMensagem;
    aoMudarRef.current = aoMudarEstado;
  });

  const mudar = useCallback((novo, detalhe) => {
    setEstado(novo);
    aoMudarRef.current?.(novo, detalhe);
  }, []);

  // Fecha a porta de forma ordenada (cancela a leitura, espera o laço, fecha)
  const fechar = useCallback(async () => {
    encerrandoRef.current = true;
    const porta = portaRef.current;
    portaRef.current = null;
    try {
      await leitorRef.current?.cancel();
    } catch {
      // já estava fechado
    }
    try {
      await leituraRef.current;
    } catch {
      // erros de leitura já foram tratados no laço
    }
    leituraRef.current = null;
    leitorRef.current = null;
    try {
      await porta?.close();
    } catch {
      // a porta pode já ter sido fechada (cabo removido)
    }
  }, []);

  // Lê bytes da porta e entrega uma linha de cada vez
  const ler = useCallback(
    async (porta) => {
      const decodificador = new TextDecoder();
      let texto = "";
      try {
        while (porta.readable && !encerrandoRef.current) {
          const leitor = porta.readable.getReader();
          leitorRef.current = leitor;
          try {
            while (true) {
              const { value, done } = await leitor.read();
              if (done) break;
              texto += decodificador.decode(value, { stream: true });
              let fim;
              while ((fim = texto.indexOf("\n")) >= 0) {
                const linha = texto.slice(0, fim).trim();
                texto = texto.slice(fim + 1);
                if (linha) aoReceberRef.current?.(linha);
              }
              if (texto.length > 1024) texto = ""; // proteção contra lixo sem quebra de linha
            }
          } finally {
            leitor.releaseLock();
          }
        }
      } catch {
        // erro de leitura (ex.: cabo removido); tratado abaixo
      }

      if (!encerrandoRef.current) {
        portaRef.current = null;
        try {
          await porta.close();
        } catch {
          // ignora
        }
        mudar("desconectado", "o cabo foi desconectado");
      }
    },
    [mudar]
  );

  const conectar = useCallback(async () => {
    if (!SERIAL_SUPORTADO) {
      mudar("erro", "use o Chrome ou o Edge no computador");
      return;
    }

    let porta;
    try {
      porta = await navigator.serial.requestPort();
    } catch {
      mudar("desconectado", "nenhuma porta escolhida");
      return;
    }

    mudar("conectando");
    try {
      await porta.open({ baudRate });
    } catch {
      mudar("erro", "não foi possível abrir a porta; ela pode estar em uso");
      return;
    }

    encerrandoRef.current = false;
    portaRef.current = porta;
    leituraRef.current = ler(porta);
    mudar("conectado");
  }, [baudRate, ler, mudar]);

  const desconectar = useCallback(async () => {
    await fechar();
    mudar("desconectado", "conexão encerrada");
  }, [fechar, mudar]);

  const enviar = useCallback(async (texto) => {
    const escritor = portaRef.current?.writable?.getWriter();
    if (!escritor) return false;
    try {
      await escritor.write(new TextEncoder().encode(`${texto}\n`));
      return true;
    } catch {
      return false;
    } finally {
      escritor.releaseLock();
    }
  }, []);

  // Fecha a porta ao sair da página
  useEffect(() => {
    return () => {
      fechar();
    };
  }, [fechar]);

  return { estado, conectar, desconectar, enviar };
}
