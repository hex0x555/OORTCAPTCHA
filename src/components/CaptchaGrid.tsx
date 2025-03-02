import { useState, useEffect } from "react";
import CaptchaTile from "./CaptchaTile";
import BucketImageFetcher from "./BucketImageFetcher";
import axios from "axios";

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
  const [sampleImages, setSampleImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitleFont(sansSerifFontOptions[Math.floor(Math.random() * sansSerifFontOptions.length)]);
    setDescriptionFont(fontOptions[Math.floor(Math.random() * fontOptions.length)]);
    setButtonFont(fontOptions[Math.floor(Math.random() * fontOptions.length)]);
    fetchCaptchaImages();
  }, []);

  const fetchCaptchaImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/generate_captcha');
      setSampleImages(response.data.grid_images);
    } catch (error) {
      console.error('Error fetching CAPTCHA images:', error);
      setError('Error fetching CAPTCHA images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTileToggle = (id: number, selected: boolean) => {
    const newSelectedTiles = new Set(selectedTiles);
    if (selected) {
      newSelectedTiles.add(id);
    } else {
      newSelectedTiles.delete(id);
    }
    setSelectedTiles(newSelectedTiles);
  };

  const handleSubmit = async () => {
    setVerifying(true);
    try {
      const response = await axios.post('http://localhost:5000/verify_captcha', {
        selectedImages: Array.from(selectedTiles).map(index => sampleImages[index])
      });
      onVerify(response.data.result === 'Correct');
    } catch (error) {
      console.error('Error verifying CAPTCHA:', error);
      onVerify(false);
    } finally {
      setVerifying(false);
    }
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

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mb-6">{error}</div>
        ) : (
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
        )}
        <button 
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
          onClick={handleSubmit}
          disabled={verifying}
          style={{ fontFamily: buttonFont }}
        >
          {verifying ? "Verifying..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CaptchaGrid;