import { Navigate } from 'react-router-dom';

interface AuthorizationWrapperProps {
  isAuthorized: boolean;
  children: React.JSX.Element;
}

export function AuthorizationWrapper({
  isAuthorized,
  children,
}: AuthorizationWrapperProps): React.JSX.Element {
  return isAuthorized ? children : <Navigate to="/login" />;
}
