import React, { useState } from 'react';
import { Offer } from '../../dataTypes/offer.ts';
import { SortOffers } from '../../dataTypes/sort-offers.ts';

interface OfferSortSelectProps {
  onSortChange: (sort: SortOffers) => void;
}

const sortingOptions: [string, SortOffers][] = [
  ['Popular', (offers: Offer[]) => offers],
  [
    'Price: low to high',
    (offers: Offer[]) => offers.sort((a, b) => a.price - b.price),
  ],
  [
    'Price: high to low',
    (offers: Offer[]) => offers.sort((a, b) => b.price - a.price),
  ],
  [
    'Top rated first',
    (offers: Offer[]) => offers.sort((a, b) => b.rating - a.rating),
  ],
];

export function OfferSortSelect({
  onSortChange,
}: OfferSortSelectProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [sortingOption, setSortingOption] = useState('Popular');
  const handleSortChange = (sort: SortOffers, sortingOptionName: string) => {
    setSortingOption(sortingOptionName);
    onSortChange(sort);
    setIsOpen(false);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {sortingOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {sortingOptions.map(([name, sort]) => (
            <li
              className={`places__option ${name === sortingOption ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={name}
              onClick={() => handleSortChange(sort, name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
