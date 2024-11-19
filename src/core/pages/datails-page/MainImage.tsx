interface MainImageProps {
  selectedImage: string;
}

export default function MainImage({ selectedImage }: MainImageProps) {
  return (
    <div className="h-96 max-w-lg">
      <img src={selectedImage} alt="main Image" className="w-full" />
    </div>
  );
}
