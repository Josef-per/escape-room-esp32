import "./Blogger.css";

const NOME_DO_SITE = "Blogue";

// A SEQUÊNCIA DO JOGO: a ordem dos fundos coloridos, de Baixo pra cima.
const SECOES = [
  {
    id: "inicio",
    cor: "laranja",
    fundo: "#c92a2a",
    texto: "claro",
    arte: "post",
    titulo: "Publique suas paixões, do seu jeito",
    corpo: "Crie um blog único e bonito com facilidade.",
    botao: true,
  },
  {
    id: "design",
    cor: "azul",
    fundo: "#2b6fd6",
    texto: "claro",
    arte: "paleta",
    titulo: "Escolha o design perfeito",
    corpo:
      "Monte um blog que combina com o seu estilo. Escolha entre modelos fáceis de usar, com layouts flexíveis e centenas de imagens de fundo, ou crie algo do zero.",
  },
  {
    id: "endereco",
    cor: "amarelo",
    fundo: "#f0b92b",
    texto: "escuro",
    arte: "endereco",
    titulo: "Tenha o seu endereço",
    corpo:
      "Dê ao seu blog uma casa de verdade. Pegue um endereço gratuito do site ou compre um domínio próprio em poucos cliques.",
  },
  {
    id: "renda",
    cor: "verde",
    fundo: "#237a47",
    texto: "claro",
    arte: "moedas",
    titulo: "Ganhe com o seu trabalho",
    corpo:
      "Seu esforço pode render. Anúncios relevantes podem aparecer automaticamente no blog para você ter uma renda publicando sobre o que gosta.",
  },
  {
    id: "publico",
    cor: "roxo",
    fundo: "#7a4bc2",
    texto: "claro",
    arte: "grafico",
    titulo: "Conheça o seu público",
    corpo:
      "Descubra quais publicações fazem sucesso com as estatísticas do próprio site. Veja de onde vêm os leitores e o que interessa a eles.",
  },
  {
    id: "memorias",
    cor: "vermelho",
    fundo: "#c92a2a",
    texto: "claro",
    arte: "fotos",
    titulo: "Guarde as suas memórias",
    corpo:
      "Salve os momentos que importam. Armazene com segurança milhares de textos, fotos e vídeos.",
  },
];

const COLUNAS_RODAPE = [
  { titulo: "Ajuda", itens: ["Central de ajuda", "Baixo", "Cima"] },
  { titulo: "Comunidade", itens: ["Novidades do site"] },
  { titulo: "Desenvolvedores", itens: ["API", "Reverse Man"] },
];

// Ilustração feita só com CSS
function Arte({ tipo }) {
  return (
    <div className={`bl-arte bl-arte--${tipo}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function BloggerStart({ aoEntrar, aoCriarBlog }) {
  return (
    <div className="bl">
      <a className="bl-pular" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className="bl-topo">
        <a className="bl-logo" href="#inicio" aria-label={`${NOME_DO_SITE}, início`}>
          <span className="bl-logo-marca" aria-hidden="true">
            b
          </span>
          <span className="bl-logo-nome">{NOME_DO_SITE}</span>
        </a>

        <div className="bl-acoes">
          <button type="button" className="bl-link" onClick={aoEntrar}>
            Entrar
          </button>
          <button type="button" className="bl-botao" onClick={aoCriarBlog}>
            Criar seu blog
          </button>
        </div>
      </header>

      <main id="conteudo">
        {SECOES.map((secao, i) => {
          const Titulo = i === 0 ? "h1" : "h2";
          return (
            <section
              key={secao.id}
              id={secao.id}
              data-cor={secao.cor}
              className={`bl-secao bl-secao--${secao.texto}${
                i % 2 === 1 ? " bl-secao--inverso" : ""
              }`}
              style={{ backgroundColor: secao.fundo }}
            >
              <div className="bl-secao-texto">
                <Titulo>{secao.titulo}</Titulo>
                <p>{secao.corpo}</p>
                {secao.botao && (
                  <button
                    type="button"
                    className="bl-botao bl-botao--grande"
                    onClick={aoCriarBlog}
                  >
                    Criar seu blog
                  </button>
                )}
              </div>
              <Arte tipo={secao.arte} />
            </section>
          );
        })}

        <section className="bl-final" id="junte-se">
          <h2>Junte-se a milhões de pessoas</h2>
          <p>
            Para compartilhar o que sabe, dar notícias de última hora ou dizer
            o que vem à cabeça, você está em boa companhia. Cadastre-se e
            descubra por que tanta gente publica suas paixões por aqui.
          </p>
          <button
            type="button"
            className="bl-botao bl-botao--grande"
            onClick={aoCriarBlog}
          >
            Criar seu blog
          </button>
        </section>
      </main>

      <footer className="bl-rodape">
        <div className="bl-rodape-colunas">
          {COLUNAS_RODAPE.map((coluna) => (
            <div key={coluna.titulo}>
              <h3>{coluna.titulo}</h3>
              <ul>
                {coluna.itens.map((item) => (
                  <li key={item}>
                    <a href="#inicio">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className="bl-rodape-legal">
          <li>
            <a href="#inicio">Termos de serviço</a>
          </li>
          <li>
            <a href="#inicio">Privacidade</a>
          </li>
          <li>
            <a href="#inicio">Política de conteúdo</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
