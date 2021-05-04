import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
  const { level, closeLevelUpModel } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header> {level} </header>

        <strong>Congrats</strong>

        <p>You reached a new level</p>

        <button type="button" onClick={closeLevelUpModel}>
          <img src="/icons/close.svg" alt=""/>
        </button>
      </div>
    </div>
  )
}