import axios from "axios"
import { IMatches, ITables } from "../types"

const leaguesId: any = {
  english_premier_league: 4328,
  italian_serie_a: 4332,
  spanish_la_liga: 4335,
  german_bundesliga: 4331
}

export async function getMatches(league: string, round: number, season: string) {
  const l = league.replaceAll('-', '_')
  const id = leaguesId[l]

  let matches = [] as IMatches[]

  try {
    const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/2/eventsround.php?id=${id}&r=${round}&s=${season}`)
    const { events } = response.data

    events.map((match: any) => {
      const { 
        strHomeTeam,
        strAwayTeam,
        intHomeScore,
        intAwayScore,
        dateEvent
      } = match

      const o = {
        homeTeam: strHomeTeam,
        awayTeam: strAwayTeam,
        homeScore: intHomeScore,
        awayScore: intAwayScore,
        matchDate: dateEvent
      }

      matches.push(o)
    })
  }

  catch {
    return null
  }

  return matches
}

export async function getTables(league: string, season: string) {
  const l = league.replaceAll(' ', '_')
  const id = leaguesId[l]

  let tables = [] as ITables[]

  try {
    const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/2/lookuptable.php?l=${id}&s=${season}`)
    const { table } = response.data

    table.map(((team: any) => {
      const {
        intRank,
        strTeam,
        strTeamBadge,
        intPlayed,
        intWin,
        intDraw,
        intLoss,
        intGoalsFor,
        intGoalsAgainst,
        intGoalDifference,
        intPoints
      } = team

      const o = {
        rank: intRank,
        badge: strTeamBadge,
        team: strTeam,
        played: intPlayed,
        win: intWin,
        draw: intDraw,
        loss: intLoss,
        goalsFor: intGoalsFor,
        goalsAgainst: intGoalsAgainst,
        goalsDifference: intGoalDifference,
        points: intPoints
      }

      tables.push(o)
    }))
  }
  catch {
    return null
  }

  return tables
}