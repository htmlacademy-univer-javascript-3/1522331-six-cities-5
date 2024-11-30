import { Helmet } from 'react-helmet-async';
import { Layout } from '../../components/Layout/layout.tsx';
import { FavoritesSection } from '../../components/favorites-section.tsx';

export function FavoritesPage(): React.JSX.Element {
  return (
    <div className="page">
      <Layout showFooter>
        <main className="page__main page__main--favorites">
          <Helmet>
            <title>6 cities - favorites</title>
          </Helmet>
          <div className="page__favorites-container container">
            <FavoritesSection />
          </div>
        </main>
      </Layout>
    </div>
  );
}
