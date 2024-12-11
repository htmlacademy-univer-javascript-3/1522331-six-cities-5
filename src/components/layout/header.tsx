import { Link } from 'react-router-dom';
import { AppRoute } from '../../dataTypes/enums/app-route.ts';
import { useAppSelector } from '../../store/store.ts';
import { memo } from 'react';
import { UserInfo } from './user-info.tsx';
import { getIsAuthorized } from '../../store/user/user.selectors.ts';

interface HeaderProps {
  dontShowUserInfo: boolean;
}

function HeaderImpl({ dontShowUserInfo }: HeaderProps) {
  const isAuthorized = useAppSelector(getIsAuthorized);
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.MainPage}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          {dontShowUserInfo ||
            (isAuthorized ? (
              <UserInfo />
            ) : (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            ))}
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderImpl);
