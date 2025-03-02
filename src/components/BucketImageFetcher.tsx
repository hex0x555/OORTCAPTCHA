import React, { useState, useEffect } from "react";

interface BucketImageFetcherProps {
  onImagesFetched: (images: string[]) => void;
}

const BucketImageFetcher: React.FC<BucketImageFetcherProps> = ({ onImagesFetched }) => {
  const [buckets, setBuckets] = useState<string[]>([]);
  const [currentBucket, setCurrentBucket] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchObjects() {
      setCurrentBucket("oortcaptcha");
      // const response = await fetch(`https://js-backend-8hsj.onrender.com/api/list-objects/oortcaptcha`);
      const response = await fetch(`https://js-backend-8hsj.onrender.com/api/list-objects/oortbucket`);
   //  const response = await fetch(`https://oortcaptcha.standard.us-east-1.oortstorage.com/images/`);
      console.log(response);
      const objects = await response.json();
      
      if (!Array.isArray(objects)) {
        console.error("Expected an array of objects");
        return;
      }
  
      const imageUrls = objects.map((object: { Key: string }) => {
       // const bucketName = "captchaimages.standard";
        return `https://oortbucket.standard.us-east-1.oortstorage.com/${object.Key}`;
      });
  
      console.log(imageUrls);
  
      setImages(imageUrls);
      onImagesFetched(imageUrls);
    }
   
    fetchObjects();
  }, []);

 

  return (
    <div>
    <div id="objects">
      {images.length === 0 ? (
        <p>No objects found in this bucket.</p>
      ) : (
        images.map((imgUrl, index) => <img key={index} src={imgUrl} alt={`Image ${index}`} />)
      )}
    </div>
  </div>
  );
};

export default BucketImageFetcher;