import { Review } from '../../dataTypes/review.ts';
import { ReviewComponent } from './review-component.tsx';

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps): React.JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
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
