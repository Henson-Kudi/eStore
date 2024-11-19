import Image from "next/image";

interface ImageThumbnailProps {
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ImageThumbnail({
  image,
  isSelected,
  onClick,
}: ImageThumbnailProps) {
  return (
    <Image
      src={image}
      alt="Product image"
      width={100}
      height={100}
      onClick={onClick}
      className={`cursor-pointer border ${
        isSelected ? "border-black" : "border-transparent"
      }`}
    />
  );
}
