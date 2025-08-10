// ObservedCard.jsx (or .tsx)
import React, { useRef, useEffect } from 'react';
import UIcards from '../components/homepage-UIcards';
import useIntersectionTransform from './shadowObserver.ts';

function ObservedCard({ data, index, getShadowRoot, pauseAnimation, customArrowIcon2 }) {
  const ref = useRef(null);
  useIntersectionTransform(ref, getShadowRoot, pauseAnimation);

  return (
    <UIcards
      key={index}
      ref={ref}
      title={data.title}
      backgroundColor={data.backgroundColor}
      image1={data.image1}
      image2={data.image2}
      alt1={data.alt1}
      alt2={data.alt2}
      url1={data.url1}
      className={`custom-card-${index}`}
      customArrowIcon2={customArrowIcon2}
    />
  );
}

export default ObservedCard;
