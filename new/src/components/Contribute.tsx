import Image from "next/image";

export default function Contribute() {
  return (
    <section id="kontribut">
      <div className="content-container">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="section-heading">Kontribut</h2>
          <p>Ok time to do some stonks stuff</p>
          <ul className="stonks-list">
            <li>
              <a
                href="https://x.com/STONKS_SOL"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow @STONKS_SOL on X
              </a>
            </li>
            <li>
              <a
                href="https://t.me/StonksSOLMemecoin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Telegram
              </a>
            </li>
            <li>
              <a
                href="https://t.me/addstickers/StonksSolana"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the Stonks sticker pack on Telegram
              </a>
            </li>
            <li>
              <a
                href="https://memedepot.com/d/stonks"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find memes on Meme Depot
              </a>
            </li>
            <li className="stonks-list-glif">
              <a
                href="https://glif.app/@ioh/glifs/cm4aaasgv0005s26llgzoerck"
                target="_blank"
                rel="noopener noreferrer"
              >
                Generate AI memes on Glif
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center items-center max-w-[360px] mx-auto md:order-first">
          <Image
            src="/images/kontribut.webp"
            alt="Stonksguy standing inline as a soldier ready for battle"
            width={360}
            height={360}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
