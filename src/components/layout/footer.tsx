import { Link } from 'react-router-dom';
import { AppRoute } from '../../dataTypes/enums/app-route.ts';
import { memo } from 'react';

function FooterImpl() {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.MainPage}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
}

export const Footer = memo(FooterImpl);
