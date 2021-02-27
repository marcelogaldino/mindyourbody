import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

    const percentToNextLeve = Math.round((currentExperience * 100) / experienceToNextLevel)

    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${percentToNextLeve}%`}} />

                <span className={styles.currentExperience} style={{left: `${percentToNextLeve}%`}}>
                    {currentExperience}xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}

export default ExperienceBar