import Head from "next/head";

import { GetServerSideProps } from 'next'

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from '../components/ChallengeBox'
import { CountdownProvider } from "../contexts/CountdownContext";

import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import { ChallengesProvider } from '../contexts/ChallengesContext'

import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number,
  isMobileView: boolean
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      isMobileView={props.isMobileView}
    >

    <div className={styles.container}>
      <Head>
        <title>Início | Mind Your Body</title>
      </Head>
      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>

    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies
  
  let isMobileView = (ctx.req
    ? ctx.req.headers['user-agent']
    : navigator.userAgent).match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      isMobileView: Boolean(isMobileView)
    },
  }
}