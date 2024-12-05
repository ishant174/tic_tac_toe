import React from "react";
import "../../components/Card/Card.css";
const Card = ({ children, ...props }) => {
  return (
    <div {...props} className={`simple-card ${props.className}`}>
      {children}
    </div>
  );
};

export default Card;
