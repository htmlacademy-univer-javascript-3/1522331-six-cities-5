import React from 'react';

interface BookmarkButtonProps {
  size: 'big' | 'small';
  isFavorite?: boolean;
  usagePlace: 'offer' | 'place-card';
}

export function BookmarkButton({size, isFavorite, usagePlace}: BookmarkButtonProps): React.JSX.Element {
  const sizes = {
    'small': {
      'width': 18,
      'height': 19,
    },
    'big': {
      'width': 31,
      'height': 33,
    }
  };
  return (
    <button
      className={`${usagePlace}__bookmark-button ${isFavorite ? `${usagePlace}__bookmark-button--active` : ''} button`}
      type="button"
    >
      <svg
        className={`${usagePlace}__bookmark-icon`}
        width={sizes[size].width}
        height={sizes[size].height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}
