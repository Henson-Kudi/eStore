import envConf from "@/lib/env.conf";
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
      <Image
        src={`${envConf.apiBaseUrl}/users-service/files?url=${image}`}
        alt="Product image"
        onClick={onClick}
        width={112}
        height={112}
        className={`cursor-pointer border w-28 h-28 object-cover  ${isSelected ? "border-black" : "border-transparent"
          }`}
      />
    </div>
  );
}
