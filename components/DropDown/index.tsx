import { DropDownProps } from "../../types"
import styles from './styles.module.scss'

export default function DropDown({ setSeason }: DropDownProps) {
  
  function handleOnChange(season: string) {
    setSeason(season)
  }

  return (
    <select
        name="season" 
        onChange={e => handleOnChange(e.currentTarget.value)}
        className={styles.container}
      >
        <option>2020-2021</option>
        <option>2019-2020</option>
        <option>2018-2019</option>
        <option>2017-2018</option>
        <option>2016-2017</option>
        <option>2015-2016</option>
        <option>2014-2015</option>
      </select>
  )
}