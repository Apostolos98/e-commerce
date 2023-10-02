import styles from '../styles/Card.module.css'
import { useNavigate } from 'react-router-dom';

export default function Card({src, price, name, reviewNum, avgReview, onSale, salePrice, sku}) {
    const navigate = useNavigate();
    const starStyle = {
        "--rating": avgReview,
          "--percent": `${(avgReview / 5) * 100}%`,
      };

    function handleClick(sku) {
        navigate(`/${sku}`)
    }
    
    return (
        <div className={styles.cont} onClick={() => handleClick(sku)}>
            <div className={styles.imgCont}>
                <img src={src} alt={name} />
            </div>
            <p className={styles.name}>{name}</p>
            <div className={styles.reviews}>
                <p className={styles.averageRating} style={starStyle}></p>
                <p>({reviewNum===null?0:reviewNum})</p>
            </div>
            {onSale===true?<p className={styles.sale}>
                <svg width="60" height="20" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="15" fontSize="15" fill='red'>{price}&euro;</text>
                    <line x1="0" y1="5" x2="50" y2="15" stroke="#ff0000bd" strokeWidth="1"/>
                </svg>
            </p>:null}
            <p className={styles.price}>{onSale===true?salePrice:price} &euro;</p>
        </div>
    )
}