import Image from "next/image";

export default function Roadmap() {
  return (
    <section id="roadmop">
      <div className="content-container !flex-col items-center !gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="section-heading">Roadmop</h2>
        </div>
        <div className="flex justify-center items-center max-w-[640px] w-full">
          <Image
            src="/images/stillfirstson.webp"
            alt="Still first meme"
            width={640}
            height={400}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
