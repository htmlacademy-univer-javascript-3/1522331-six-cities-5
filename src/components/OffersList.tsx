import { Offer } from '../dataTypes/Offer.ts';
import { OfferCard } from './OfferCard.tsx';
import React, { useState } from 'react';

interface OffersListProps {
  offers: Offer[];
}

export function OffersList({ offers }: OffersListProps): React.JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState('');
  const handleMouseOver = (id: string): void => {
    setActiveOfferId(id);
    console.log(activeOfferId);
  };
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          id={offer.id}
          price={offer.price}
          type={offer.type}
          image={offer.previewImage}
          title={offer.title}
          onMouseOver={handleMouseOver}
          isFavorite={offer.isFavorite}
          isPremium={offer.isPremium}
        />
      ))}
    </div>
  );
}
