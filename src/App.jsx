import { useState, useEffect } from 'react'
import styles from './styles/App.module.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  return (
    <div className={styles.cont}>
      <div className={styles.textImage}>
        <img src="/src/assets/bestbuyApi.jpg" alt="" />
        <div className={styles.text}>
          <p className={styles.one}>This is my fake e-commeerce web site. It is based on Best Buy Api using most of the features the api provides to developers.</p>
          <p>
          The Best Buy API provides a simple, REST-based interface for an entire product catalog, past and present. 
          This includes pricing, availability, specifications, descriptions, and images for more than one million current and historical products. 
          Most product information is updated near real-time, including product pricing.
          </p>
        </div>
      </div>
      <button className={styles.button} onClick={() => navigate('/home')}>Shop Now</button>
    </div>
  )
}

export default App
