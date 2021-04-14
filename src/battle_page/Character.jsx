import React from 'react';
import PropTypes from 'prop-types';

export const Character = ({name, image, maxHP, hp}) => {
  return <div>
    <div>{name}</div> 
    <div>{image}</div> 
    <div>{maxHP}</div> 
    <div>{hp}</div>
  </div>;
};

Character.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  maxHP: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
};

Character.defaultProps = {
  
};
