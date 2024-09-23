import React from 'react';
import './Container.scss'

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};
