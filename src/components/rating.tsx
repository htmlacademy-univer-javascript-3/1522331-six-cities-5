import React from 'react';

interface RatingProps {
  rating: number;
  usePlace: string;
  isInOffer?: boolean;
}

export function Rating({
  rating,
  isInOffer,
  usePlace,
}: RatingProps): React.JSX.Element {
  return (
    <div className={`${usePlace}__rating rating`}>
      <div className={`${usePlace}__stars rating__stars`}>
        <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {isInOffer && (
        <span className="offer__rating-value rating__value">{rating}</span>
      )}
    </div>
  );
}
