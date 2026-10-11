import Image from "next/image";

/** Portrait or interior hero. Callers pass a checked photo — never an exterior. */
export default function HeroFrame({
  src,
  alt,
  ratio = "4 / 5",
}: {
  src: string;
  alt: string;
  ratio?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden bg-cream"
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 560px"
        className="object-cover"
      />
    </div>
  );
}
