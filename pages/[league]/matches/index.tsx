import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import DropDown from "../../../components/DropDown"
import { usePrevious } from "../../../hooks/usePrevious"
import { IMatches, IMatchesProps } from "../../../types"
import { getMatches } from "../../../utils/data"
import { handleQuery } from "../../../utils/helpFunctions"
import styles from './styles.module.scss'

export default function Matches({ matches }: IMatchesProps) {
  const router = useRouter()
  const league = handleQuery(router.query!)

  const [season, setSeason] = useState<string>('2020-2021')
  const [newMatches, setNewMatches] = useState<IMatches[]>(matches)
  const [round, setRound] = useState<number>(1)

  const prev = usePrevious(season)

  useEffect(() => {
    if (prev !== season) {
      const l = league?.replaceAll('-', '_')
      getMatches(l!, 1, season).then(res => {
        if (res) {
          setNewMatches(res)
          setRound(1)
        }
      })
    }
  }, [season])

  async function addRound() {
    const r = round + 1;

    getMatches(league!, r, season).then(res => {
      if (res) {
        setNewMatches(res)
        setRound(r)
      }
    })
  }

  function subtractRound() {
    if (round > 1) {
      const r = round - 1

      getMatches(league!, r, season).then(res => {
        if (res) {
          setNewMatches(res)
          setRound(r)
        }
      })
    }
  }

  return (
    <div className={styles.container}>
      <DropDown setSeason={setSeason}/>
      <div className={styles.round}>
        <div onClick={subtractRound}>
          <Image
            src={'/icons/arrow-left.svg'}
            width={20}
            height={20}
            alt='Arrow Left'
          />
        </div>
        <p>Rodada {round}</p>
        <div onClick={addRound}>
          <Image
            src={'/icons/arrow-right.svg'}
            width={20}
            height={20}
            alt='Arrow Right'
          />
        </div>
      </div>
      <ul className={styles.list}>
        {newMatches.map((match: IMatches) => (
          <li key={match.homeTeam}>
            <div className={styles['final-score']}>
              <div className={styles.teams}>
                <p>{match.homeTeam}</p>
                <p>{match.homeScore}</p>
              </div>
              <div className={styles.teams}>
                <p>{match.awayTeam}</p>
                <p>{match.awayScore}</p>
              </div>
            </div>
            <p className={styles.date}>{
              new Date(match.matchDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'numeric',
                year: 'numeric'
              })
            }</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { league: 'english-premier-league' } },
      { params: { league: 'italian-serie-a' } },
      { params: { league: 'spanish-la-liga' } },
      { params: { league: 'german-bundesliga' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context

  const league = handleQuery(params!)
  const l = league?.replaceAll('-', '_')

  const season = '2020-2021'

  const matches = await getMatches(l!, 1, season)

  return {
    props: { matches }
  }
}
