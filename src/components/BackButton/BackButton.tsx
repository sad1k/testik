import React from 'react';
import "./BackButton.scss";

interface Props{
  onClick: () => void;
  reverse?: boolean;
  disabled?: boolean;
}

const BackButton = ({ onClick, reverse, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      className={"back-button" + (reverse ? " rotate" : "")}
      onClick={onClick}
    ></button>
  );
};

export default BackButton;
