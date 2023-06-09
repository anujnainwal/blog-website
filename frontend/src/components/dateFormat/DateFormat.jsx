import React from 'react';

const DateFormat = ({ date }) => {
  const calculateRelativeDate = () => {
    const currentDate = new Date();
    const providedDate = new Date(date);
    const timeDifference = currentDate.getTime() - providedDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return 'just now';
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(secondsDifference / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const relativeDate = calculateRelativeDate();

  return (
    <span style={{fontSize:12}}>{relativeDate}</span>
  );
};

export default DateFormat;
