import { Link } from 'react-router-dom';
import { AppRoutes } from '../../dataTypes/enums/app-routes.ts';
import cn from 'classnames';
import { Rating } from '../rating.tsx';
import { BookmarkButton } from '../bookmark-button.tsx';
import { capitalize } from '../../utils/string-utils.ts';
import { memo } from 'react';
import { Offer } from '../../dataTypes/offer.ts';

interface PlaceCardProps {
  offer: Offer;
  onMouseEnter?: (offer: Offer) => void;
  onMouseLeave?: () => void;
  isOnMainPage?: boolean;
}

export function OfferCardImpl({
  offer,
  onMouseEnter,
  onMouseLeave,
  isOnMainPage,
}: PlaceCardProps): React.JSX.Element {
  const {
    id,
    price,
    type,
    previewImage,
    title,
    rating,
    isPremium,
    isFavorite,
  } = offer;
  const handleMouseEnter = (): void => onMouseEnter?.(offer);
  const handleMouseLeave = (): void => onMouseLeave?.();
  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'place-card',
        { cities__card: isOnMainPage },
        { 'near-places__card': !isOnMainPage },
      )}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={cn(
          'place-card__image-wrapper',
          { 'cities__image-wrapper': isOnMainPage },
          { 'near-places__image-wrapper': !isOnMainPage },
        )}
      >
        <Link to={`${AppRoutes.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            size="small"
            isFavorite={isFavorite}
            usagePlace="place-card"
            offerId={id}
          />
        </div>
        <Rating rating={rating} usePlace="place-card" />
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export const OfferCard = memo(OfferCardImpl);
