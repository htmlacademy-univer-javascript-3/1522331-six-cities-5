import React, { memo, useState } from 'react';
import { Offer } from '../../dataTypes/offer.ts';
import { SortOffers } from '../../dataTypes/sort-offers.ts';
import { useAppDispatch } from '../../store/store.ts';
import { setSorting } from '../../store/offers/offers.slice.ts';

const sortingOptions: [string, SortOffers][] = [
  ['Popular', (offers: Offer[]) => offers],
  [
    'Price: low to high',
    (offers: Offer[]) => offers.toSorted((a, b) => a.price - b.price),
  ],
  [
    'Price: high to low',
    (offers: Offer[]) => offers.toSorted((a, b) => b.price - a.price),
  ],
  [
    'Top rated first',
    (offers: Offer[]) => offers.toSorted((a, b) => b.rating - a.rating),
  ],
];

function OfferSortSelectImpl(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [sortingOption, setSortingOption] = useState('Popular');
  const dispatch = useAppDispatch();
  const handleSortChange = (sort: SortOffers, sortingOptionName: string) => {
    setSortingOption(sortingOptionName);
    dispatch(setSorting(sort));
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

export const OfferSortSelect = memo(OfferSortSelectImpl);
