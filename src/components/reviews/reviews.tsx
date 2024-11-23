import { ReviewForm } from './review-form.tsx';
import { ReviewsList } from './reviews-list.tsx';
import { Review } from '../../dataTypes/review.ts';
import { useAppSelector } from '../../store/store.ts';
import { AuthorizationStatus } from '../../dataTypes/enums/authorization-status.ts';

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps): React.JSX.Element {
  const isAuthorized =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Authorized;
  const reviewsAvailable = reviews && reviews.length !== 0;
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
      {isAuthorized && <ReviewForm />}
    </section>
  );
}
