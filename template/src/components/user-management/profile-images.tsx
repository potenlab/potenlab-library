import Image from "next/image";

export interface ProfileImagesProps {
  images: string[];
}

export function ProfileImages({ images }: ProfileImagesProps) {
  return (
    <div className="flex flex-row gap-4">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Profile image ${index + 1}`}
          width={116}
          height={116}
          className="w-[116px] h-[116px] rounded-lg object-cover"
        />
      ))}
    </div>
  );
}
