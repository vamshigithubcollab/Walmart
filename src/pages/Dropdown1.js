import React, { useState } from 'react';
import './Dropdown.css';
// import { BiFontFamily } from 'react-icons/bi';
const Dropdown1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className='button1' style={{fontFamily:"cursive"}}>Select your current location</button>
      {isOpen && (
        <div className="dropdown-content">
          <button href="#" type="button" className="btn btn-success" >Entrance</button>
          <button href="#">Dairy Products</button>
          <button href="#">Frozen Foods</button>
          <button href="#">Bread And Bakery Items</button>
          <button href="#">Packaged Foods</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown1;
