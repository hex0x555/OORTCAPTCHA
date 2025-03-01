
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Array of Google Fonts to randomly choose from
const fontOptions = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Raleway",
  "Ubuntu",
  "Playfair Display",
  "Merriweather",
  "Nunito",
  "Poppins"
];

interface CaptchaTileProps {
  id: number;
  image: string;
  onToggle: (id: number, selected: boolean) => void;
}

const CaptchaTile = ({ id, image, onToggle }: CaptchaTileProps) => {
  const [selected, setSelected] = useState(false);
  const [randomFont, setRandomFont] = useState("");
  
  useEffect(() => {
    // Randomly select a font when the component mounts
    const randomIndex = Math.floor(Math.random() * fontOptions.length);
    setRandomFont(fontOptions[randomIndex]);
  }, []);

  const handleClick = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    onToggle(id, newSelected);
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "relative aspect-square overflow-hidden rounded-md cursor-pointer transition-all duration-300 transform",
        "hover:shadow-md hover:scale-[1.02]",
        selected ? "ring-2 ring-[#0EA5E9]/70 scale-[0.98]" : "ring-1 ring-gray-200/30"
      )}
      style={{ fontFamily: randomFont }}
    >
      <div className="absolute inset-0 bg-gray-100/50 animate-pulse" />
      <img 
        src={image} 
        alt={`Captcha tile ${id}`} 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        loading="lazy"
        onLoad={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        style={{ opacity: 0 }}
      />
      {selected && (
        <div className="absolute inset-0 bg-[#0EA5E9]/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#0EA5E9]/70 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-3 h-3 text-white"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptchaTile;
