import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../dataTypes/enums/app-route.ts';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { logout } from '../../store/async-actions.ts';
import { memo } from 'react';
import { getUserInfo } from '../../store/user/user.selectors.ts';
import { getFavoritesOffers } from '../../store/offers/offers.selectors.ts';
import { setFavoriteOffers } from '../../store/offers/offers.slice.ts';

function UserInfoImpl() {
  const userInfo = useAppSelector(getUserInfo);
  const favoritesCount = useAppSelector(getFavoritesOffers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(setFavoriteOffers([]));
    navigate(AppRoute.MainPage);
  };
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
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
          <div className="header__nav-link" onClick={handleLogout}>
            <span className="header__signout">Sign out</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export const UserInfo = memo(UserInfoImpl);
