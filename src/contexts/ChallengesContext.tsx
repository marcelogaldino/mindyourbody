import { createContext, useState, ReactNode, useEffect } from 'react'

import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface ChallengesProviderProps {
    children: ReactNode
    level: number
    currentExperience: number
    challengesCompleted: number
    isMobileView: boolean
}

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number
    currentExperience: number
    challengesCompleted: number
    experienceToNextLevel: number
    LevelUp: () => void
    startedNewChallenge: () => void
    resetChallenge: () => void
    completeChallenge: () => void
    closeLevelUpModal: () => void
    activeChallenge: Challenge
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)    
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        if (!rest.isMobileView) {
            Notification.requestPermission()
        }
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function LevelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    function startedNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)

        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        if (!rest.isMobileView) {
            new Audio('./notification.mp3').play()
    
            if (Notification.permission === 'granted') {
                new Notification('Novo desafio 🎉🎉', {
                    body: `Valendo ${challenge.amount} xp!`
                })
            }
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge
        
        let finalExperiece = currentExperience + amount

        if (finalExperiece >= experienceToNextLevel) {
            finalExperiece = finalExperiece - experienceToNextLevel
            LevelUp()
        }

        setCurrentExperience(finalExperiece)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return(
        <ChallengesContext.Provider 
        value={{
            level, 
            LevelUp, 
            currentExperience, 
            challengesCompleted,
            experienceToNextLevel,
            startedNewChallenge,
            activeChallenge,
            completeChallenge,
            closeLevelUpModal,
            resetChallenge
            }}
        >
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}