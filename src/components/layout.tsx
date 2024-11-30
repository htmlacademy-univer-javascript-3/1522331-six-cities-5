import { AppRoutes } from '../dataTypes/enums/app-routes.ts';
import { Link } from 'react-router-dom';
import { store, useAppSelector } from '../store/store.ts';
import { AuthorizationStatus } from '../dataTypes/enums/authorization-status.ts';
import { logout } from '../store/async-actions.ts';

interface LayoutProps {
  children: React.JSX.Element;
  showFooter?: boolean;
  dontShowUserInfo?: boolean;
}

export function Layout({
  children,
  showFooter,
  dontShowUserInfo,
}: LayoutProps): React.JSX.Element {
  const isAuthorized =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Authorized;
  const userInfo = useAppSelector((state) => state.userInfo);
  const favoritesCount = useAppSelector((state) => state.favoritesOffers);
  const handleLogout = () => {
    store.dispatch(logout());
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoutes.MainPage}>
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
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoutes.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          {userInfo?.avatarUrl && (
                            <img
                              className="user__avatar"
                              src={userInfo.avatarUrl}
                              alt="user avatar"
                            />
                          )}
                        </div>
                        <span className="header__user-name user__name">
                          {userInfo?.email}
                        </span>
                        <span className="header__favorite-count">
                          {favoritesCount.length}
                        </span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              ) : (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoutes.Login}
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
      {children}
      {showFooter && (
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoutes.MainPage}>
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      )}
    </>
  );
}
