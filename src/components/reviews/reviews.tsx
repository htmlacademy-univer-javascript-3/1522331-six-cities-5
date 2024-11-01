import { ReviewForm } from './review-form.tsx';
import { ReviewsList } from './reviews-list.tsx';
import { Review } from '../../dataTypes/review.ts';

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps): React.JSX.Element {
  const reviewsAvailable = reviews && reviews.length != 0;
  return (
    <section className="offer__reviews reviews">
      {reviewsAvailable ? (
        <ReviewsList reviews={reviews} />
      ) : (
        <span
          className="reviews__item"
          style={{
            justifyContent: 'center',
            fontSize: 12,
            color: 'lightgray',
          }}
        >
          No reviews available
        </span>
      )}
      <ReviewForm />
    </section>
  );
}
