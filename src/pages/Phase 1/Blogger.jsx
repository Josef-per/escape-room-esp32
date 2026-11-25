import Sections from "../../components/SectionsPhase 1/Sections"

import "./Blogger.css"

export default function Blogger() {

  //senha = Vermelho, amarelo, vermelho, verde, azul, vemelho, amarelo

  return (
    <>
      <main>

        {/*Vermelho*/}
        <Sections
          title={"Publique sobre o que você adora, do seu jeito"}
          description={"Crie um blog lindo e exclusivo"}
        />

        {/*Amarelo*/}
        <Sections
          title={"Escolha o desing perfeito"}
          description={"Crie um blog lindo que combine com seu estilo. Selecione um dos diversos modelos fáceis de usar, com layouts flexíveis e centenas de imagens de plano de fundo, ou crie o que quiser."}
        />

        {/*Vermelho*/}
        <Sections
          title={"Tenha um domínio"}
          description={"Encontre o lugar perfeito para seu blog. Tenha um domínio blogspot.com ou compre um domínio personalizado com apenas alguns cliques."}
        />

        {/*Verde*/}
        <Sections
          title={"Ganhe dinheiro"}
          description={"Receba recompensas pelo seu esforço. O Google AdSense pode mostrar automaticamente anúncios segmentados relevantes no seu blog para você ganhar dinheiro postando sobre o que adora."}
        />

        {/*Azul*/}
        <Sections
          title={"Conheça seu público"}
          description={"Saiba quais postagens fizeram mais sucesso com a análise integrada do Blogger. Você vai ver como o público chegou ao seu blog e no que ele está interessado. Você pode até mesmo conectar o blog diretamente ao Google Analytics para saber mais detalhes."}
        />

        {/*Vermelho*/}
        <Sections
          title={"Guarde suas lembranças"}
          description={"Não perca os momentos importantes. Com o Blogger, você armazena de forma segura milhares de postagens, fotos e muito mais usando os recursos do Google."}
        />

        {/*Amarelo*/}
        <Sections
          title={"Junte-se a milhões de pessoas"}
          description={"Seja para compartilhar conhecimento, novidades ou suas ideias, no Blogger você está em boa companhia. Faça login e descubra por que milhões de pessoas publicam aqui sobre os assuntos que adoram."}
        />

        <footer>

        </footer>


      </main>
    </>
  )
}
