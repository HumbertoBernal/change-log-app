import Head from 'next/head'
import { Fragment } from 'react'
import HeroSection from '@/modules/landing/HeroSection'
import Footer from '@/modules/landing/Footer'


export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Change Log</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='mt-8'>
        <HeroSection />
      </main>
      <Footer />
    </Fragment>
  )
}
