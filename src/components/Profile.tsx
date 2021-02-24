import styles from '../styles/components/Profile.module.css'

function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/marcelogaldino.png" alt="Marcelo Galdino"/>
            <div>
                <strong>Marcelo Galdino</strong>
                
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level: 5454
                </p>
            </div>
        </div>
    )
}

export default Profile