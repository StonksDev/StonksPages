import Image from "next/image";

export default function Footer() {
  return (
    <footer className="stock-bg text-white">
      <div className="content-container !flex-col items-center text-center !gap-6">
        <Image
          src="/images/logo.webp"
          alt="Stonks guy's floating head"
          width={56}
          height={56}
          className="!w-14 !h-14"
          loading="lazy"
        />
        <small className="text-[0.8rem] max-w-[720px]">
          Stonks ($STNK) is a meme coin with no intrinsic value or expectation
          of financial return. There is no formal team or roadmap. The coin is
          completely useless and for entertainment purposes only.
        </small>
      </div>
    </footer>
  );
}
