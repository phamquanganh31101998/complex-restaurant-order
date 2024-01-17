import React, { useState } from 'react';

interface TrollProps {
  title?: string;
}

export const Troll = (props: TrollProps) => {
  const { title = 'default' } = props;
  const [clickTime, setClickTime] = useState(0);

  const handleClick = () => {
    setClickTime(clickTime + 1);
  };

  return (
    <React.Fragment>
      <h1 data-testid="introduction-text">This is a troll component</h1>
      <h2 data-testid="title-text">Title: {title}</h2>
      <br />
      <button onClick={handleClick} data-testid="increase-button">
        Click here!
      </button>
      <br />
      {!!clickTime && <h2 data-testid="number">Click times: {clickTime}</h2>}
    </React.Fragment>
  );
};
