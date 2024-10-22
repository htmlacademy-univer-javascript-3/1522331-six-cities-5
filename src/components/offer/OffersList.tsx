import { Offer } from '../../dataTypes/Offer.ts';
import { OfferCard } from './OfferCard.tsx';
import React from 'react';
import { Nullable } from 'vitest';

interface OffersListProps {
  offers: Offer[];
  onActiveOfferChange?: (offerId: Nullable<string>) => void;
}

export function OffersList({
  offers,
  onActiveOfferChange,
}: OffersListProps): React.JSX.Element {
  const handleActiveOfferChange = (id: Nullable<string>): void => {
    onActiveOfferChange?.(id);
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
          onMouseEnter={() => handleActiveOfferChange(offer.id)}
          onMouseLeave={() => handleActiveOfferChange(null)}
          isFavorite={offer.isFavorite}
          isPremium={offer.isPremium}
        />
      ))}
    </div>
  );
}
