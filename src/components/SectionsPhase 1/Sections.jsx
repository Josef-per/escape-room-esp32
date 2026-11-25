export default function Sections({
  title = Text,
  description = Text,
  background = Text,
  image = Text,
  imageDescription = Text
}) {

  return (
    <>
      <section className="section-themes">
        <header>
          <h2>{title}</h2>
          <p>{description}</p>
        </header>
        <div className={background}>
          <img src={image} alt={imageDescription} />
        </div>
      </section>
    </>
  )
}
