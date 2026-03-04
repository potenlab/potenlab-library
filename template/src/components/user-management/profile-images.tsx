"use client";

import { useRef } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

export interface ProfileImagesProps {
  images: string[];
  maxImages?: number;
  editable?: boolean;
  onImageUpload?: (index: number, file: File) => void;
}

export function ProfileImages({
  images,
  maxImages = 3,
  editable = false,
  onImageUpload,
}: ProfileImagesProps) {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emptySlotCount =
    editable && images.length < maxImages ? maxImages - images.length : 0;

  const handleFileChange = (slotIndex: number, file: File | undefined) => {
    if (file && onImageUpload) {
      onImageUpload(slotIndex, file);
    }
  };

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
      {Array.from({ length: emptySlotCount }).map((_, i) => {
        const slotIndex = images.length + i;
        return (
          <button
            key={`empty-${slotIndex}`}
            type="button"
            className="flex w-[116px] h-[116px] items-center justify-center rounded-lg bg-table-header border-2 border-dashed border-border cursor-pointer"
            onClick={() => fileInputRefs.current[i]?.click()}
          >
            <ImagePlus className="w-6 h-6 text-placeholder" />
            <input
              ref={(el) => {
                fileInputRefs.current[i] = el;
              }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleFileChange(slotIndex, e.target.files?.[0])
              }
            />
          </button>
        );
      })}
    </div>
  );
}
