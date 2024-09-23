import React from 'react';
import './Card.scss'

interface CardProps {
  year: number;
  info: string;
}

export const Card = ({ year, info }: CardProps) => {
  return (
    <div>
      <span
        className="card"
      >
        {year}
      </span>
      <p className="cardText">{info}</p>
    </div>
  );
};
