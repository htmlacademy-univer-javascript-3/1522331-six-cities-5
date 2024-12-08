import { ReviewForm } from './review-form.tsx';
import { ReviewsList } from './reviews-list.tsx';
import { Review } from '../../dataTypes/review.ts';
import { useAppSelector } from '../../store/store.ts';
import { useMemo } from 'react';
import { getIsAuthorized } from '../../store/user/user.selectors.ts';
import { MAX_REVIEWS_COUNT } from '../../consts/reviews.ts';

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps): React.JSX.Element {
  const sortedReviews = useMemo(
    () =>
      reviews
        .toSorted(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        .slice(0, MAX_REVIEWS_COUNT),
    [reviews],
  );
  const isAuthorized = useAppSelector(getIsAuthorized);
  const reviewsAvailable = reviews && reviews.length !== 0;
  return (
    <section className="offer__reviews reviews">
      {reviewsAvailable ? (
        <ReviewsList reviews={sortedReviews} />
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
