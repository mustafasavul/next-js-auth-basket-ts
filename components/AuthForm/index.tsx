import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import classes from './auth-form.module.css';
import { toast } from 'react-toastify';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      localStorage.setItem('tpComSignIn', 'true');

      if (!result.error) {
        // set some auth state
        router.replace('/');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        toast.success(result.message);
        console.log(result);
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    }
  }

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? t('common:login') : t('common:singUp')}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">{t('common:yourEmail')}</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">{t('common:yourPassword')}</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>
            {isLogin ? t('common:login') : t('common:createAccount')}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? t('common:createAccount') : t('common:existingAccount')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
