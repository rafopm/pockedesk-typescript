import Image from 'next/image'
import React from 'react'
import Styles from '../styles/logo.module.css'

const Logo = () => {
    return (
        <div className={Styles.header}>
            <div className={Styles.container}>
                <Image src="/images/pokemon_logo.png" alt="Pokedesk" width={200} height={74} />
                <div className={Styles.home} >
                <Image src="/images/home.svg" alt="Home" width={40} height={40}  />
                </div>
            </div>
        </div>
    )
}

export default Logo