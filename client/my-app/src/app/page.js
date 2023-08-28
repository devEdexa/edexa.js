'use client'
import Image from 'next/image'
import styles from './page.module.css'


import {EdexaClient} from "../../../../src/classes/ERC20Class.ts"

export default function Home() {

  async function run(){
  //  let edexaClient =  new EdexaClient(window.ethereum)
  }
  return (
    <>
    <button onClick={run}>
      helelo
    </button>
    </>
  )
}
