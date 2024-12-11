import React, { useState } from 'react';
import { store, useAppSelector } from '../store/store.ts';
import { bookmarkOffer } from '../store/async-actions.ts';
import { Offer } from '../dataTypes/offer.ts';
import { getIsAuthorized } from '../store/user/user.selectors.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../dataTypes/enums/app-route.ts';

interface BookmarkButtonProps {
  size: 'big' | 'small';
  isFavorite?: boolean;
  usagePlace: 'offer' | 'place-card';
  offerId: Offer['id'];
}

export function BookmarkButton({
  size,
  offerId,
  isFavorite,
  usagePlace,
}: BookmarkButtonProps): React.JSX.Element {
  const navigate = useNavigate();
  const [isFavoriteReactive, setIsFavoriteReactive] = useState<boolean>(
    isFavorite ?? false,
  );
  const isAuthorized = useAppSelector(getIsAuthorized);
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
      className={`${usagePlace}__bookmark-button ${isFavoriteReactive && isAuthorized ? `${usagePlace}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={() => {
        if (isAuthorized) {
          store.dispatch(
            bookmarkOffer({ offerId: offerId, status: !isFavoriteReactive }),
          );
          setIsFavoriteReactive(!isFavoriteReactive);
        } else {
          navigate(AppRoute.Login);
        }
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
        {isFavoriteReactive && isAuthorized ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}
