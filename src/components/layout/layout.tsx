import { Header } from './header.tsx';
import { Footer } from './footer.tsx';

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
  return (
    <>
      <Header dontShowUserInfo={dontShowUserInfo ?? false} />
      {children}
      {showFooter && <Footer />}
    </>
  );
}
