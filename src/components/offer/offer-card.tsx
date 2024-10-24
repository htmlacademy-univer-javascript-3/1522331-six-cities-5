import { RoomType } from '../../dataTypes/enums/room-type.ts';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../dataTypes/enums/app-routes.ts';

interface PlaceCardProps {
  id: string;
  price: number;
  type: RoomType;
  image: string;
  title: string;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  isPremium?: boolean;
  isFavorite?: boolean;
}

export function OfferCard({
  id,
  price,
  type,
  image,
  title,
  onMouseEnter,
  onMouseLeave,
  isPremium,
  isFavorite,
}: PlaceCardProps): React.JSX.Element {
  const handleMouseEnter = (): void => onMouseEnter?.(id);
  const handleMouseLeave = (): void => onMouseLeave?.();
  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cities__card place-card"
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoutes.Offer}/:${id}`}>
          <img
            className="place-card__image"
            src={`../../markup/img/${image}`}
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
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '100%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}/:${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
