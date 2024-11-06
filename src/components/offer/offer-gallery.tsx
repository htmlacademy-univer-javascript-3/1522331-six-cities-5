import React from 'react';

interface OfferGalleryProps {
  imageSources: string[];
}

export function OfferGallery({
  imageSources,
}: OfferGalleryProps): React.JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {imageSources.map((src) => (
          <div key={`${src}`} className="offer__image-wrapper">
            <img className="offer__image" src={src} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}
