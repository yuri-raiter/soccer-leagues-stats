import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import NextNProgress from 'nextjs-progressbar'
import '../styles/global.scss'

const config = {
  color: '#fff',
  showOnShallow: false,
  stopDelayMs: 100,
  height: 5
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const { league } = router.query!

  if (router.pathname.includes('/[league]')) {
    if (league === 'english-premier-league') config.color = '#7015A9'
    if (league === 'italian-serie-a') config.color = '#1DA5AD'
    if (league === 'spanish-la-liga') config.color = '#CE933F'
    if (league === 'german-bundesliga') config.color = '#DC2939'

    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/icons/ball.svg" />
          <title>Soccer Leagues Stats</title>
        </Head>
        <NextNProgress
          {...config}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
  else {
    config.color = '#fff'

    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/icons/ball.svg" />
          <title>Soccer Leagues Stats</title>
        </Head>
        <NextNProgress
          {...config}
        />
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
