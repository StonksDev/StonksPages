import Image from "next/image";

export default function HowToBuy() {
  return (
    <section className="stock-bg text-white dark" id="how-to-buy">
      <div className="content-container">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="section-heading">How to buy</h2>
          <h3 className="mt-2 text-[1.56rem] font-semibold">
            1. Create a wallet
          </h3>
          <p>
            Download Phantom Wallet or your wallet of choice from the app store
            or google play store for free. Desktop users, download the google
            chrome extension by going to{" "}
            <a
              href="https://phantom.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              phantom.app
            </a>
          </p>
          <h3 className="mt-2 text-[1.56rem] font-semibold">
            2. Get some SOL
          </h3>
          <p>
            Use SOL (or any coin) in your wallet to swap to $STNK. If you
            don&apos;t have any SOL, you can buy it directly on Phantom,
            transfer from another wallet, or buy on a centralized exchange and
            send it to your wallet.
          </p>
          <h3 className="mt-2 text-[1.56rem] font-semibold">
            3. Swap for $STNK
          </h3>
          <p>
            Swap directly in the Phantom wallet app or go to{" "}
            <a
              href="https://jup.ag/swap/SOL-STNK"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jupiter
            </a>{" "}
            and connect your wallet, swap any asset to $STNK and confirm in the
            Phantom wallet when prompted.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center max-w-[480px] mx-auto">
          <Image
            src="/images/teajor.webp"
            alt="Stonks guy as a teacher writing on a whiteboard"
            width={480}
            height={480}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
