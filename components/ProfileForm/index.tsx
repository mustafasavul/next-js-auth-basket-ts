import { useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import classes from './profile-form.module.css';
import { useSession } from 'next-auth/client';
import { Flex, Text } from '@chakra-ui/react';

function ProfileForm(props) {
  const [session] = useSession();

  const { t } = useTranslation();
  const oldPasswordRef = useRef<any>(null);
  const newPasswordRef = useRef<any>(null);

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <section>
      <Flex
        flexDirection={'row'}
        alignContent={'center'}
        justifyContent={'center'}
        gap={2}
      >
        <Text fontSize="md">
          <strong>Email: </strong>
        </Text>
        <Text fontSize="md">{session.user.email}</Text>
      </Flex>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">{t('common:newPassword')}</label>
          <input type="password" id="new-password" ref={newPasswordRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="old-password">{t('common:oldPassword')}</label>
          <input type="password" id="old-password" ref={oldPasswordRef} />
        </div>
        <div className={classes.action}>
          <button>{t('common:changePassword')}</button>
        </div>
      </form>
    </section>
  );
}

export default ProfileForm;
