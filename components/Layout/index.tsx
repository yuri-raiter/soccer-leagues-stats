import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ILayout } from "../../types";
import styles from './styles.module.scss'

export default function Layout({ children }: ILayout) {
  const router = useRouter()
  const { league } = router.query
  const route = router.pathname.slice(10)

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  function handleMobileOpen() {
    setIsMobileOpen(!isMobileOpen)
  }

  useEffect(() => {
    function handleIsMobileOpen() {
      setIsMobileOpen(value => value ? false : value)
    }

    router.events.on('routeChangeComplete', handleIsMobileOpen)

    return () => {
      router.events.off('routeChangeComplete', handleIsMobileOpen)
    }
  }, [])

  useEffect(() => {
    function handleIsMobileOpen() {
      if (window.innerWidth > 720) {
        return setIsMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleIsMobileOpen)

    return () => {
      window.removeEventListener('resize', handleIsMobileOpen)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link href="/">
          <a>
            <Image
              src='/icons/arrow-back.svg'
              width={25}
              height={25}
              alt='Arrow Back'
            />
          </a>
        </Link>
        <div className={styles['nav-routes']}>
          <Link href={`/${league}/matches`}>
            <a className={route == 'matches' ? styles[`active-${league}`] : ''}>Matches</a>
          </Link>
          <div className={styles[`${league}`]}>
            <Image
              src={`/leagues/${league}.svg`}
              width={50}
              height={50}
              alt='League'
              priority
            />
          </div>
          <Link href={`/${league}/tables`}>
            <a className={route == 'tables' ? styles[`active-${league}`] : ''}>Tables</a>
          </Link>
        </div>
        <div className={styles['nav-social']}>
          <a
            href="https://www.linkedin.com/in/yuri-nicolas-raiter/"
            target="_blank"
          >
            <Image
              src='/icons/linkedin.svg'
              width={30}
              height={30}
              alt='Linkedin'
            />
          </a>
          <a
            href="https://github.com/yuri-raiter"
            target="_blank"
          >
            <Image
              src='/icons/github.svg'
              width={30}
              height={30}
              alt='Github'
            />
          </a>
        </div>
      </div>
      <div className={styles['mobile-nav']}>
        <div className={styles['back-league-menu']}>
          <Link href="/">
            <a>
              <Image
                src='/icons/arrow-back.svg'
                width={25}
                height={25}
                alt='Arrow Back'
              />
            </a>
          </Link>
          <div className={styles[`${league}`]}>
            <Image
              src={`/leagues/${league}.svg`}
              width={50}
              height={50}
              alt='League'
              priority
            />
          </div>
          <div className={styles['hamburguer-menu']} onClick={handleMobileOpen}>
            {isMobileOpen ? (
              <Image
                src='/icons/x.svg'
                width={25}
                height={50}
                alt='Menu'
              />
            ) : (
              <Image
                src='/icons/menu.svg'
                width={25}
                height={50}
                alt='Menu'
              />
            )}
          </div>
        </div>
        <ul className={`
          ${styles['mobile-nav-routes']} 
          ${isMobileOpen ? styles['display-mobile-nav-routes'] : styles['hide-mobile-nav-routes']}
          `}>
          <li>
            <Link href={`/${league}/matches`}>
              <a className={route == 'matches' ? styles[`mobile-active-${league}`] : ''}>Matches</a>
            </Link>
          </li>
          <li>
            <Link href={`/${league}/tables`}>
              <a className={route == 'tables' ? styles[`mobile-active-${league}`] : ''}>Tables</a>
            </Link>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/yuri-nicolas-raiter/'
              target='_blank'
            >
              <div>
                <Image
                  src='/icons/linkedin.svg'
                  width={25}
                  height={25}
                  alt='Github'
                />
              </div>
              Linkedin
            </a>
          </li>
          <li>
            <a
              href='https://github.com/yuri-raiter'
              target='_blank'
            >
              <div>
                <Image
                  src='/icons/github.svg'
                  width={25}
                  height={25}
                  alt='Github'
                />
              </div>
              Github
            </a>
          </li>
        </ul>
      </div>
      {children}
    </div>
  )
}