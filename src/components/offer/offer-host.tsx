import React from 'react';
import { User } from '../../dataTypes/user.ts';
import { getFirstName } from '../../utils/username-utils.ts';

interface OfferHostProps {
  host: User;
}

export function OfferHost({ host }: OfferHostProps): React.JSX.Element {
  return (
    <>
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img
            className="offer__avatar user__avatar"
            src={host.avatarUrl}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">{getFirstName(host.name)}</span>
        {host.isPro && <span className="offer__user-status">Pro</span>}
      </div>
    </>
  );
}
