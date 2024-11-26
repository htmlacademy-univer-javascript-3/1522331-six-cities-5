import { RoomType } from '../../dataTypes/enums/room-type.ts';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../dataTypes/enums/app-routes.ts';
import cn from 'classnames';
import { Rating } from '../rating.tsx';
import { BookmarkButton } from '../bookmark-button.tsx';

interface PlaceCardProps {
  id: string;
  price: number;
  type: RoomType;
  image: string;
  title: string;
  rating: number;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  isPremium?: boolean;
  isFavorite?: boolean;
  isOnMainPage?: boolean;
}

export function OfferCard({
  id,
  price,
  type,
  image,
  title,
  rating,
  onMouseEnter,
  onMouseLeave,
  isPremium,
  isFavorite,
  isOnMainPage,
}: PlaceCardProps): React.JSX.Element {
  const handleMouseEnter = (): void => onMouseEnter?.(id);
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
            src={image}
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
          />
        </div>
        <Rating rating={rating} usePlace="place-card" />
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
