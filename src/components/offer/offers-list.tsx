import { Offer } from '../../dataTypes/offer.ts';
import { OfferCard } from './offer-card.tsx';
import React from 'react';
import { Nullable } from 'vitest';

interface OffersListProps {
  offers: Offer[];
  onActiveOfferChange?: (offer: Nullable<Offer>) => void;
}

export function OffersList({
  offers,
  onActiveOfferChange,
}: OffersListProps): React.JSX.Element {
  const handleActiveOfferChange = (offer: Nullable<Offer>): void => {
    onActiveOfferChange?.(offer);
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
          onMouseEnter={() => handleActiveOfferChange(offer)}
          onMouseLeave={() => handleActiveOfferChange(null)}
          isFavorite={offer.isFavorite}
          isPremium={offer.isPremium}
        />
      ))}
    </div>
  );
}
