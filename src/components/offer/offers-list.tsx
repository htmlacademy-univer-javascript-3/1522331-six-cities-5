import { Offer } from '../../dataTypes/offer.ts';
import { OfferCard } from './offer-card.tsx';
import React, { memo, useCallback } from 'react';
import { Nullable } from 'vitest';

interface OffersListProps {
  offers: Offer[];
  onActiveOfferChange?: (offer: Nullable<Offer>) => void;
  isOnMainPage?: boolean;
}

export function OffersListImpl({
  offers,
  onActiveOfferChange,
  isOnMainPage,
}: OffersListProps): React.JSX.Element {
  const handleMouseEnter = useCallback(
    (offer: Offer) => onActiveOfferChange?.(offer),
    [onActiveOfferChange],
  );
  const handleMouseLeave = useCallback(
    () => onActiveOfferChange?.(null),
    [onActiveOfferChange],
  );
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isOnMainPage={isOnMainPage}
        />
      ))}
    </div>
  );
}

export const OffersList = memo(OffersListImpl);
