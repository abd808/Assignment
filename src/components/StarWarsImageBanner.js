import React from 'react';
import '../CSS/CustomForm.css'; // Import custom CSS file

const StarWarsImageBanner = () => {
  return (
    <div style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        backgroundColor: 'black'
    }}>
      <img src="https://townsquare.media/site/442/files/2015/10/star-wars-posters-pic.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89" 
        alt="Star Wars"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />
      <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '3rem',
          textAlign: 'center'
      }}>
          <h1 className="form-title">Welcome to the Star Wars API!</h1>
      </div>
    </div>
  );
}

export default StarWarsImageBanner;
