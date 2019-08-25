import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default ({ husband, wife }) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt={husband.name + " " + wife.name} sizes={husband.heroImage.sizes} />
    <div className={styles.heroContainer}>
      <div className={styles.heroDetails}>
        <h3 className={styles.heroHeadline}>{husband.name}</h3>
        <p className={styles.heroTitle}>{husband.title}</p>
        <p>{husband.shortBio.shortBio}</p>
      </div>
      <div className={styles.heroDetails}>
        <h3 className={styles.heroHeadline}>{wife.name}</h3>
        <p className={styles.heroTitle}>{wife.title}</p>
        <p>{wife.shortBio.shortBio}</p>
      </div>
    </div>
  </div>
)
