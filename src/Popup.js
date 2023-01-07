import React, { useState } from 'react';
import './CSS/Popup.css';
import './CSS/CustomForm.css'; // Import custom CSS file
import { Form, Button, FormControl, FormLabel } from 'react-bootstrap';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button title="Instructions" className="custom-button" onClick={() => setIsOpen(true)}>?</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-inner">
          <Button title=" Close "type="submit" variant="primary" className="custom-button" onClick={() => setIsOpen(false)}>x</Button>
            <h1>Instructions</h1>
            <p>- Use dropdown to select the type of entity you wish to know about</p>
            <p>- Enter a number in the text field, which acts as a unique identifier to a particular entity of selected type</p>
            <p>- If entered number is greater than number of instances of selected entity, you will be thrown an error</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;