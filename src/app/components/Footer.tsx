import Link from 'next/link'
import React from 'react'
import Styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <div className={Styles.footer}>
      <span>© 2024    -    </span>
      <span>Ir a la web del desarrollador: </span>
      <Link href={'https://rafopm.netlify.app/'} target={'_blank'}  className={Styles.link}>Rafael Pampavilca</Link>
      
    </div>
  )
}

export default Footer