import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'type';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModel: () => void;
}

interface ChallengesProviderProps { 
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ??  0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [islevelUpModelOpen, setIslevelUpModelOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIslevelUpModelOpen(true);
  }

  function closeLevelUpModel() {
    setIslevelUpModelOpen(false);
  }
  
  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    setActiveChallenge(challenges[randomChallengeIndex]);

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification('New Challenge 🎉🎊', {
        body: `Valendo ${challenges[randomChallengeIndex].amount} xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(activeChallenge) {
      const { amount } = activeChallenge

      let finalExperience = currentExperience + amount

      if(finalExperience >= experienceToNextLevel) {
        finalExperience -= experienceToNextLevel
        levelUp();
      }

      setCurrentExperience(finalExperience)
      setActiveChallenge(null)
      setChallengesCompleted(challengesCompleted + 1)
    }
  }

  return (
    <ChallengesContext.Provider 
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModel
      }}
    >
      {children}
      {islevelUpModelOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}