import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store.ts';
import { AppRoute } from '../dataTypes/enums/app-route.ts';
import { getIsAuthorized } from '../store/user/user.selectors.ts';

interface AuthorizationWrapperProps {
  children: React.JSX.Element;
  fallbackUrl: AppRoute;
}

export function AuthorizationWrapperForAuthorizedOnly({
  children,
  fallbackUrl,
}: AuthorizationWrapperProps): React.JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);
  return isAuthorized ? children : <Navigate to={fallbackUrl} />;
}

export function AuthorizationWrapperForUnauthorizedOnly({
  children,
  fallbackUrl,
}: AuthorizationWrapperProps): React.JSX.Element {
  const isUnauthorized = !useAppSelector(getIsAuthorized);
  return isUnauthorized ? children : <Navigate to={fallbackUrl} />;
}
