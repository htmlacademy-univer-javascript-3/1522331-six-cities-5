import { Link } from 'react-router-dom';
import { AppRoutes } from '../../dataTypes/enums/app-routes.ts';
import { store, useAppSelector } from '../../store/store.ts';
import { logout } from '../../store/async-actions.ts';
import { memo } from 'react';

function UserInfoImpl() {
  const userInfo = useAppSelector((state) => state.userInfo);
  const favoritesCount = useAppSelector((state) => state.favoritesOffers);
  const handleLogout = () => {
    store.dispatch(logout());
  };
  return (
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
  );
}

export const UserInfo = memo(UserInfoImpl);
