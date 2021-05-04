import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://pbs.twimg.com/profile_images/1080185070449803267/n5g33tly_400x400.jpg" alt="Edmilson Tunechi" />
      <div>
        <strong> Edmilson Tunechi </strong>
        <p>
          <img src="icons/level.svg" alt="Level image" />
          Level {level}
        </p>
      </div>
    </div>
  );
}