import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

function Profile() {
    const {level} = useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/marcelogaldino.png" alt="Marcelo Galdino"/>
            <div>
                <strong>Marcelo Galdino</strong>
                
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level: {level}
                </p>
            </div>
        </div>
    )
}

export default Profile