import Image from "next/image";
import Link from "next/link";
import { ILeagueButton } from "../../types";
import styles from './styles.module.scss'

export default function LeagueButton({ src, alt }: ILeagueButton) {
  function leagueName(src: string) {
    return src.slice(8, -4)
  }

  return (
    <li className={styles.container}>
      <Link href={`${leagueName(src)}/matches`}>
        <a>
          <Image
            src={src}
            width={60}
            height={60}
            alt={alt}
          />
        </a>
      </Link>
    </li>
  )
}