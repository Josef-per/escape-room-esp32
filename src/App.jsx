import { useNavigate } from "react-router-dom";

//vai ser uma landing page explicando um pouco do sistema com um pequeno teste hehehe

export default function LandingPage() {

  const navigation = useNavigate();

  function startGame() {
    navigation("/Phase2");
  }

  return (
    <>
      <main>
        <section className="tuturial">
          {/* adicionar uma explicação do jogo e como funciona aqui */}
        </section>

        <section className="tuturial-test">
          {/* colocar um pequeno teste  */}
        </section>

        <button onClick={startGame}>
          TESTE
        </button>

      </main>
    </>
  )
}
