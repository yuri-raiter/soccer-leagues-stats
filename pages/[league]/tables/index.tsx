import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import DropDown from "../../../components/DropDown"
import { ITables, ITablesProps } from "../../../types"
import { getTables } from "../../../utils/data"
import { handleQuery } from "../../../utils/helpFunctions"
import styles from './styles.module.scss'

export default function Tables({ tables }: ITablesProps) {
  const router = useRouter()
  const league = handleQuery(router.query!)

  const [season, setSeason] = useState<string>('2020-2021')
  const [newTables, setNewTables] = useState<ITables[]>(tables)

  useEffect(() => {
    const l = league!.replaceAll('-', '_')
    getTables(l!, season).then(res => {
      if (res) setNewTables(res)
    })
  }, [season])

  return (
    <div className={styles.container}>
      <DropDown setSeason={setSeason} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Played</th>
            <th>Win</th>
            <th>Draw</th>
            <th>Loss</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {newTables.map(team => (
            <tr key={team.rank}>
              <td>{team.rank}</td>
              <td>{team.team}</td>
              <td>{team.played}</td>
              <td>{team.win}</td>
              <td>{team.draw}</td>
              <td>{team.loss}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalsDifference}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { params } = context

  const league = handleQuery(params!)
  const l = league?.replaceAll('-', '_')

  const season = '2020-2021'

  const tables = await getTables(l!, season)

  return {
    props: { tables }
  }
}
