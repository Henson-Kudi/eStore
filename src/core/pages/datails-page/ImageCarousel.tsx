"use client"

import ImageThumbnail from "./ImageThumbnail";

interface ImageCarouselProp {
  selectedImage: string;
  setSelectedImage?: (image: string) => void; // Optional prop
}

export default function ImageCarousel({
  selectedImage,
  setSelectedImage = () => {}, 
}: ImageCarouselProp) {
  const images = [
    "https://images.unsplash.com/photo-1617603280856-0ecabba82e09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="flex md:flex-col space-y-4">
      {images.map((image) => (
        <ImageThumbnail
          key={image}
          image={image}
          isSelected={selectedImage === image}
          onClick={() => setSelectedImage(image)}
        />
      ))}
    </div>
  );
}