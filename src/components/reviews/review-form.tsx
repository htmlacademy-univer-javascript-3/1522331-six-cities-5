import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import {
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
} from '../../consts/reviews.ts';
import { postReview } from '../../store/async-actions.ts';
import {
  getCurrentOffer,
  getReviewPostingStatus,
} from '../../store/current-offer/current-offer.selectors.ts';
import { ReviewStatus } from '../../dataTypes/enums/review-status.ts';
import { setReviewPostingStatus } from '../../store/current-offer/current-offer.slice.ts';
import { Spinner } from '../spinner/Spinner.tsx';

type UserReview = {
  comment?: string;
  rating?: number;
};

export function ReviewForm(): React.JSX.Element {
  const [review, setReview] = useState<UserReview>();
  const dispatch = useAppDispatch();
  const offerId = useAppSelector(getCurrentOffer)!.id;
  const reviewPostingStatus = useAppSelector(getReviewPostingStatus);
  useEffect(() => {
    if (reviewPostingStatus === ReviewStatus.Success) {
      setReview({ comment: '', rating: undefined });
    }
  }, [reviewPostingStatus]);
  const onRatingChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ): void => setReview({ ...review, rating: +event.target.value });
  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ): void => setReview({ ...review, comment: event.target.value });
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ): void => {
    event.preventDefault();
    dispatch(
      postReview({
        offerId: offerId,
        rating: review?.rating || 5,
        comment: review?.comment || '',
      }),
    );
    dispatch(setReviewPostingStatus(ReviewStatus.Pending));
  };
  const isValid =
    review?.comment &&
    review?.comment?.length >= MIN_COMMENT_LENGTH &&
    review?.comment?.length <= MAX_COMMENT_LENGTH &&
    review?.rating;
  return (
    <form className="reviews__form form">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={review?.rating === 5}
          onChange={onRatingChange}
          disabled={reviewPostingStatus === ReviewStatus.Pending}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={review?.rating === 4}
          onChange={onRatingChange}
          disabled={reviewPostingStatus === ReviewStatus.Pending}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={review?.rating === 3}
          onChange={onRatingChange}
          disabled={reviewPostingStatus === ReviewStatus.Pending}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={review?.rating === 2}
          onChange={onRatingChange}
          disabled={reviewPostingStatus === ReviewStatus.Pending}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={review?.rating === 1}
          onChange={onRatingChange}
          disabled={reviewPostingStatus === ReviewStatus.Pending}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review?.comment || ''}
        onChange={onCommentChange}
        disabled={reviewPostingStatus === ReviewStatus.Pending}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>{' '}
          and no more than{' '}
          <b className="reviews__text-amount">
            {MAX_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid || reviewPostingStatus === ReviewStatus.Pending}
        >
          {reviewPostingStatus === ReviewStatus.Pending ? (
            <Spinner small />
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
}
