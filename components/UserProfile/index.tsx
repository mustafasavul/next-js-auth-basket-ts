import ProfileForm from 'components/ProfileForm';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import classes from './user-profile.module.css';

function UserProfile() {
  const { t } = useTranslation();

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
  }

  return (
    <section className={classes.profile}>
      <h1>{t('common:userProfile')}</h1>

      <Link href="/">
        <a>Home</a>
      </Link>

      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
