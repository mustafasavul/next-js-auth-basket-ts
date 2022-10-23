import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import AuthForm from 'components/AuthForm';
import useTranslation from 'next-translate/useTranslation';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { t } = useTranslation();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p> {t('common:loading')} </p>;
  }

  return (
    <div className="auth-main">
      <div className="auth-bg"></div>
      <AuthForm />
    </div>
  );
}

export default AuthPage;
