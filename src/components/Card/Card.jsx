import React from "react";
import "../../components/Card/Card.css";
const Card = ({ children, ...props }) => {
  return (
    <div {...props} className="simple-card">
      {children}
    </div>
  );
};

export default Card;
