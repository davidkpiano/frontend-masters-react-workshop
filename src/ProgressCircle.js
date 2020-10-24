import * as React from 'react';

export const ProgressCircle = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100"
      height="100"
      fill="none"
      className="circles"
    >
      <circle r="40" cx="50" cy="50" pathLength="1" />
      <circle className="progress" r="40" cx="50" cy="50" pathLength="1" />
    </svg>
  );
};
