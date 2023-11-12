import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function PixelImage({ src, alt, className }: Props) {
  return (
    <Image
      className={`pixel-art ${className}`}
      src={src}
      alt={alt}
      quality={100}
      width={0}
      height={0}
      unoptimized
    />
  );
}
