import React from 'react';

interface OfferInsideItemsProps {
  items: string[];
}

export function OfferInsideItems({
  items,
}: OfferInsideItemsProps): React.JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {items.map((item) => (
          <li key={item} className="offer__inside-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
