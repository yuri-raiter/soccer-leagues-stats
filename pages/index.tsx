import type { NextPage } from 'next'
import LeagueButton from '../components/LeagueButton'
import styles from './home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Next.js Soccer Leagues Stats</h1>
      <ul className={styles.links}>
        <LeagueButton src='/leagues/english-premier-league.svg' alt='Premier League' />
        <LeagueButton src='/leagues/italian-serie-a.svg' alt='Serie A' />
        <LeagueButton src='/leagues/spanish-la-liga.svg' alt='La Liga' />
        <LeagueButton src='/leagues/german-bundesliga.svg' alt='Bundesliga' />
      </ul>
    </div>
  )
}

export default Home
