import { Navigate } from 'react-router-dom';

interface AuthorizationWrapperProps {
  children: React.JSX.Element;
}

export function AuthorizationWrapper({
  children,
}: AuthorizationWrapperProps): React.JSX.Element {
  const isAuthorized = false;
  return isAuthorized ? children : <Navigate to="/login" />;
}
