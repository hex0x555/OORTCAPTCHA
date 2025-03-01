
import { useState, useEffect } from "react";
import CaptchaTile from "./CaptchaTile";

// Sample image URLs for the captcha tiles - image segmentation captcha
const sampleImages = [
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=200&h=200&auto=format&fit=crop",
];

// Array of Google Fonts to randomly choose from
const fontOptions = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Raleway",
  "Ubuntu",
  "Nunito",
  "Poppins"
];

// Sans-serif font options for the title
const sansSerifFontOptions = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Raleway",
  "Ubuntu",
  "Nunito",
  "Poppins"
];

interface CaptchaGridProps {
  onVerify: (verified: boolean) => void;
}

const CaptchaGrid = ({ onVerify }: CaptchaGridProps) => {
  const [selectedTiles, setSelectedTiles] = useState<Set<number>>(new Set());
  const [verifying, setVerifying] = useState(false);
  const [titleFont, setTitleFont] = useState("");
  const [descriptionFont, setDescriptionFont] = useState("");
  const [buttonFont, setButtonFont] = useState("");

  useEffect(() => {
    // Randomly select fonts when the component mounts
    setTitleFont(sansSerifFontOptions[Math.floor(Math.random() * sansSerifFontOptions.length)]);
    setDescriptionFont(fontOptions[Math.floor(Math.random() * fontOptions.length)]);
    setButtonFont(fontOptions[Math.floor(Math.random() * fontOptions.length)]);
  }, []);

  const handleTileToggle = (id: number, selected: boolean) => {
    const newSelectedTiles = new Set(selectedTiles);
    if (selected) {
      newSelectedTiles.add(id);
    } else {
      newSelectedTiles.delete(id);
    }
    setSelectedTiles(newSelectedTiles);
  };

  const handleSubmit = () => {
    setVerifying(true);
    
    // Simulate verification (in a real app, you'd verify against actual traffic light positions)
    setTimeout(() => {
      // For this example, let's pretend the verification always succeeds
      onVerify(true);
      setVerifying(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden">
      <div className="p-6 bg-white/30 backdrop-blur-sm border border-gray-100/40 rounded-lg shadow-sm">
        <div className="mb-6">
          <h2 
            className="text-lg font-medium text-[#1A1F2C] mb-2"
            style={{ fontFamily: titleFont }}
          >
            Verification
          </h2>
          <p 
            className="text-sm text-[#8E9196]"
            style={{ fontFamily: descriptionFont }}
          >
            Identify the parts of the image containing code or matrix patterns.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          {sampleImages.map((image, index) => (
            <CaptchaTile 
              key={index} 
              id={index} 
              image={image}
              onToggle={handleTileToggle}
            />
          ))}
        </div>
        
      
      </div>
    </div>
  );
};

export default CaptchaGrid;
