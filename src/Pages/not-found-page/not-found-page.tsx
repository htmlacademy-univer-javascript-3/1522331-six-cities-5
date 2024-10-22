import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';
import { Helmet } from 'react-helmet-async';

export function NotFoundPage(): React.JSX.Element {
  return (
    <main className={styles.container}>
      <Helmet>
        <title>404 - not found</title>
      </Helmet>
      <h1>404 - Page Not Found</h1>
      <p className={styles.title}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link to="/public" className={styles.link}>
        back to main page
      </Link>
    </main>
  );
}
