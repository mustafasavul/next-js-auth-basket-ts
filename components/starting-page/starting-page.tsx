import Lottie from 'react-lottie-player';
import classes from './starting-page.module.css';
import lottieJson from 'public/assets/isometric-house.json';

function StartingPageContent() {
  // Show Link to Login page if NOT auth

  return (
    <section className={classes.starting}>
      <h3>Yeni Nesil Emlak Pazar Yeri</h3>
      <Lottie loop animationData={lottieJson} play />
    </section>
  );
}

export default StartingPageContent;
