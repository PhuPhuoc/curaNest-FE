import React, { useState } from 'react';

interface StarRatingProps {
  onRateChange: (rating: number) => void;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ onRateChange, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (currentRating: number) => {
    setRating(currentRating);
    onRateChange(currentRating);
  };

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="32" 
      height="32"
      className={`cursor-pointer transition-colors duration-200 ${
        filled 
          ? 'fill-yellow-500 text-yellow-500' 
          : 'fill-gray-300 text-gray-300'
      }`}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  );

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input 
              type="radio" 
              name="rating" 
              value={currentRating} 
              className="hidden"
              onChange={() => handleRatingChange(currentRating)}
            />
            <div 
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            >
              <StarIcon 
                filled={currentRating <= (hover || rating)}
              />
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;