import { Helmet } from 'react-helmet-async';
import { FormEvent, useState } from 'react';
import { Layout } from '../../components/layout/layout.tsx';
import { LoginInfo } from '../../dataTypes/user.ts';
import { useAppDispatch } from '../../store/store.ts';
import { login } from '../../store/async-actions.ts';
import { LoginPageRightSection } from './login-page-right-section.tsx';

export function LoginPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: '',
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(loginInfo));
  };

  const validateEmail = (email: string) => {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  const isValid = () =>
    loginInfo.email &&
    validateEmail(loginInfo.email) &&
    loginInfo.password &&
    loginInfo.password.match(/[a-zA-z]/g) &&
    loginInfo.password.match(/[0-9]/g);
  return (
    <div className="page page--gray page--login">
      <Layout dontShowUserInfo>
        <main className="page__main page__main--login">
          <Helmet>
            <title>6 cities - login</title>
          </Helmet>
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(event) =>
                      setLoginInfo({ ...loginInfo, email: event.target.value })}
                    required
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(event) =>
                      setLoginInfo({
                        ...loginInfo,
                        password: event.target.value,
                      })}
                    required
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isValid()}
                >
                  Sign in
                </button>
              </form>
            </section>
            <LoginPageRightSection />
          </div>
        </main>
      </Layout>
    </div>
  );
}
