import React, { memo, useState } from 'react';
import { store } from '../store/store.ts';
import { bookmarkOffer } from '../store/async-actions.ts';
import { Offer } from '../dataTypes/offer.ts';

interface BookmarkButtonProps {
  size: 'big' | 'small';
  isFavorite?: boolean;
  usagePlace: 'offer' | 'place-card';
  offerId: Offer['id'];
}

function BookmarkButtonImpl({
  size,
  offerId,
  isFavorite,
  usagePlace,
}: BookmarkButtonProps): React.JSX.Element {
  const [isFavoriteReactive, setIsFavoriteReactive] = useState<boolean>(
    isFavorite ?? false,
  );
  const sizes = {
    small: {
      width: 18,
      height: 19,
    },
    big: {
      width: 31,
      height: 33,
    },
  };
  return (
    <button
      className={`${usagePlace}__bookmark-button ${isFavoriteReactive ? `${usagePlace}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={() => {
        store.dispatch(
          bookmarkOffer({ offerId: offerId, status: !isFavoriteReactive }),
        );
        setIsFavoriteReactive(!isFavoriteReactive);
      }}
    >
      <svg
        className={`${usagePlace}__bookmark-icon`}
        width={sizes[size].width}
        height={sizes[size].height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavoriteReactive ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

export const BookmarkButton = memo(BookmarkButtonImpl);
