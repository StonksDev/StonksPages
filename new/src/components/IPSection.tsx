import Image from "next/image";

export default function IPSection() {
  return (
    <section className="stock-bg text-white dark" id="intlektual-propert">
      <div className="content-container">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="section-heading">Intlektual propert</h2>
          <p>
            Stonks is the owner of the full onchain IP rights to the original
            Stonks meme, created by Henry Hooper. This means that $STNK is the
            only project that has the copyright license to use and tokenise the
            meme.
          </p>
          <p>
            Owning the IP has its privileges! As the rightful owner, $STNK has
            also secured the coveted &apos;Stonks&apos; handle on Stocktwits:{" "}
            <a href="https://stocktwits.com/stonks" target="_blank">
              stocktwits.com/stonks
            </a>
            .
          </p>
          <p>
            We would like to thank{" "}
            <a
              href="https://x.com/DankBankHQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              @DankBankHQ
            </a>
            , the previous owners to the rights, who have also provided us with
            a number of Stonks figurines! We are grateful for their continued
            support.
          </p>
          <p>
            Not only is $STNK the first meme coin ever deployed on Solana, it
            also has the provenance of being supported by the original meme (and
            artist) that inspired it. Community-owned STONKS!
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center max-w-[420px] mx-auto">
          <Image
            src="/images/copirights.jpeg"
            alt="Certificate of Registration of Stonks"
            width={420}
            height={420}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
