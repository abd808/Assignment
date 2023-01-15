import React from 'react';
import '../CSS/CustomForm.css'; // Import custom CSS file

const StarWarsImageBanner = () => {
  return (
    <div className="image-banner-container">
      <img src="https://townsquare.media/site/442/files/2015/10/star-wars-posters-pic.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89" 
        alt="Star Wars"
        className="image-banner-img"
      />
      <div className="image-banner-text-container">
          <h1 className="form-title">Welcome to the Star Wars API!</h1>
      </div>
    </div>
  );
}

export default StarWarsImageBanner;
  