import { Review } from '../../dataTypes/review.ts';
import { ReviewComponent } from './review-component.tsx';
import { useAppSelector } from '../../store/store.ts';
import { getReviewsCount } from '../../store/current-offer/current-offer.selectors.ts';

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps): React.JSX.Element {
  const reviewsCount = useAppSelector(getReviewsCount);
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviewsCount}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review: Review) => (
          <ReviewComponent
            key={review.id}
            comment={review.comment}
            rating={review.rating}
            date={new Date(review.date)}
            avatarUrl={review.user.avatarUrl}
            userName={review.user.name}
          />
        ))}
      </ul>
    </>
  );
}
