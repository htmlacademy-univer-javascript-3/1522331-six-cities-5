import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store.ts';
import { AppRoute } from '../dataTypes/enums/app-route.ts';
import { getAuthorizationStatus } from '../store/user/user.selectors.ts';
import { AuthorizationStatus } from '../dataTypes/enums/authorization-status.ts';
import { Spinner } from './spinner/Spinner.tsx';

interface AuthorizationWrapperProps {
  children: React.JSX.Element;
  fallbackUrl: AppRoute;
  requiredStatus: AuthorizationStatus;
}

export function AuthorizationWrapper({
  children,
  fallbackUrl,
  requiredStatus,
}: AuthorizationWrapperProps): React.JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }
  return authorizationStatus === requiredStatus ? (
    children
  ) : (
    <Navigate to={fallbackUrl} />
  );
}
