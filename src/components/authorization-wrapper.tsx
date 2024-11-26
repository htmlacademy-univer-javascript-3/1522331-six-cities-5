import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store.ts';
import { AuthorizationStatus } from '../dataTypes/enums/authorization-status.ts';
import { AppRoutes } from '../dataTypes/enums/app-routes.ts';

interface AuthorizationWrapperProps {
  children: React.JSX.Element;
  fallbackUrl: AppRoutes;
}

export function AuthorizationWrapperForAuthorizedOnly({
  children,
  fallbackUrl,
}: AuthorizationWrapperProps): React.JSX.Element {
  const isAuthorized =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Authorized;
  return isAuthorized ? children : <Navigate to={fallbackUrl} />;
}

export function AuthorizationWrapperForUnauthorizedOnly({
  children,
  fallbackUrl,
}: AuthorizationWrapperProps): React.JSX.Element {
  const isUnauthorized =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Unauthorized;
  return isUnauthorized ? children : <Navigate to={fallbackUrl} />;
}
