import { useEffect, useState } from 'react'
import styles from '../styles/SingleProductPage.module.css'
import { useContext } from 'react';
import { CartContext } from '../main';
import Slider from './Slider';

export default function ProductPage({ product, hideDropDown, setHideDropDown, hideCart, setHideCart }) {
    const { addToCart } = useContext(CartContext)
    const [index, setInd] = useState(null)
    const [primarySrc, setSrc] = useState(null)
    
    useEffect(() => {
        for (let i = 0; i < product.images.length; i++) {
            if (product.images[i].primary === true) {
                setSrc(product.images[i].href)
                break
            }
        }
    }, [])

    function handleClick() {
        if (hideDropDown === false) setHideDropDown(true)
        if (hideCart === false) setHideCart(true)
    }
    
    function handleImageClick(src, ind) {
        setInd(ind)
        setSrc(src)
    }

    function cartClick(item) {
        addToCart(item)
    }
    let url = product.images.filter((el) => el.rel === 'Front_Standard')[0]
    url = url===undefined?product.images[0]:url
    const item = {name: product.name, url: url, price: product.salePrice}

    const starStyle = {
          "--percent": `${(Number(product.customerReviewAverage) / 5) * 100}%`,
      };

    return (
        <div className={styles.cont} onClick={handleClick}>
            <div className={styles.basic}>
                <div className={styles.descr}>
                    <p className={styles.name}>{product.name}</p>
                    <div className={styles.reviewCont}>
                        <p className={styles.stars} style={starStyle}></p>
                        <p className={styles.review}>{product.customerReviewAverage} ({product.customerReviewCount===null?0:product.customerReviewCount} Reviews)</p>
                    </div>
                    <div className={styles.priceCont}>
                        {product.onSale===true?
                        <p className={styles.sale}>
                            <svg width="60" height="20" xmlns="http://www.w3.org/2000/svg">
                                <text x="0" y="15" fontSize="15" fill='red'>{product.regularPrice}&euro;</text>
                                <line x1="0" y1="5" x2="50" y2="15" stroke="#ff0000bd" strokeWidth="1"/>
                            </svg>
                        </p>:null}
                        <p className={styles.price}>{product.salePrice}&euro;</p>
                    </div>
                    <div className={styles.cart} onClick={() => cartClick(item)}>Add to cart</div>
                    <div className={styles.description}>{product.longDescription}</div>
                </div>
                <div className={styles.images}>
                    <Slider images={product.images} index={index} handleImageClick={handleImageClick}/>
                    <div className={styles.primary}>
                        <img src={primarySrc} alt="product image" />
                    </div>
                </div>
            </div>
            <div className={styles.fullInfo}>
                <p className={styles.overview}>Overview</p>
                <div className={styles.overviewCont}>
                    <div className={styles.featureCont}>
                        <p>Features</p>
                        <ul className={styles.features}>
                            {product.features.map((el) => {
                                if (el.feature[0] !== '&') return <li key={el.feature}>{el.feature}</li>// to not have feature like this:  Battery life varies by use and configuration. See apple.com/batteries for more information.
                            })}
                        </ul>
                    </div>
                    <div className={styles.featureCont}>
                        <p>What's included</p>
                        <ul className={styles.features}>
                            {product.includedItemList.map((el) => {
                                return <li key={el.includedItem}>{el.includedItem}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <p className={styles.specs}>Specifications</p>
                <div className={styles.outerCont}>
                    <div className={styles.specsCont}>
                            {product.details.map((el) => {
                                return (
                                    <div className={styles.details} key={el.name}>
                                        <p className={styles.title}>{el.name}</p>
                                        <p className={styles.value}>{el.value}</p>
                                    </div>
                                    
                                )
                            })}
                    </div>
                </div>
            </div>
            <div className={hideDropDown===true && hideCart===true?styles.hidden:styles.forGray}></div>
        </div>
    )
}