import React from "react";

export interface ILayout {
  children: React.ReactNode
}

export interface DropDownProps {
  setSeason: React.Dispatch<React.SetStateAction<string>>
}

export interface IPathsParams {
  params: {
    league: string
    season: string
  }
}

export interface IMatches {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  matchDate: string
}

export interface ITables {
  rank: number
  badge: string
  team: string
  played: number
  win: number
  draw: number
  loss: number
  goalsFor: number
  goalsAgainst: number
  goalsDifference: number
  points: number
}

export interface IMatchesProps {
  matches: IMatches[]
}

export interface ITablesProps {
  tables: ITables[]
}

export interface ILeagueButton {
  src: string
  alt: string
}