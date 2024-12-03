import React, { memo } from 'react';

interface RatingProps {
  rating: number;
  usePlace: string;
  showRatingValue?: boolean;
}

function RatingImpl({
  rating,
  showRatingValue,
  usePlace,
}: RatingProps): React.JSX.Element {
  return (
    <div className={`${usePlace}__rating rating`}>
      <div className={`${usePlace}__stars rating__stars`}>
        <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showRatingValue && (
        <span className="offer__rating-value rating__value">{rating}</span>
      )}
    </div>
  );
}

export const Rating = memo(RatingImpl);
