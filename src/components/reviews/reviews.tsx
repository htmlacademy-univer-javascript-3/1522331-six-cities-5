import { ReviewForm } from './review-form.tsx';
import { ReviewsList } from './reviews-list.tsx';
import { Review } from '../../dataTypes/review.ts';

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps): React.JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <ReviewsList reviews={reviews} />
      <ReviewForm />
    </section>
  );
}
