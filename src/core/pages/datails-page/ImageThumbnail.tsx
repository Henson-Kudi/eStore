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
    <div className=" w-full lg:w-auto">
      <img
        src={image}
        alt="Product image"
        onClick={onClick}
        className={`cursor-pointer border w-28 h-28  ${isSelected ? "border-black" : "border-transparent"
          }`}
      />
    </div>
  );
}
