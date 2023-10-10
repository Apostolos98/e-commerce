import { useContext, useEffect } from 'react';
import styles from '../styles/ProductsGrid.module.css';
import Card from './Card'
import Loading from './Loading';
import { CartContext } from '../main';

export default function ProductsGrid({ products, setPage, page, lastPage, hideDropDown, setHideDropDown, hideCart, setHideCart, handleShorting, loading }) {
    const { searchWord } = useContext(CartContext)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }, [page])

    function handleNext() {
        if (page < Number(lastPage)) {
            setPage(page + 1)
        }
    }

    function handlePrev() {
        if (page <= 1) return;
        else setPage(page - 1)
    }

    function handleClick() {
        if (hideDropDown === false) setHideDropDown(true)
        if (hideCart === false) setHideCart(true)
    }

    const pages = []
    for (let i = 1; i < 3 && i + page < Number(lastPage); i++) {
        pages.push(<p onClick={() => setPage(page + i)} key={i}>{page + i}</p>)
    }

    return (
        <div className={styles.cont} onClick={() => handleClick()}>
            {loading===true?<Loading />:
            <>
                <div className={styles.forShorting}>
                    <div className={styles.searchWord}>{searchWord}</div>
                    <div>
                        <label htmlFor="sort">Sort by</label>
                        <select id="sort" onChange={handleShorting}>
                            <option value="popularity">Popularity</option>
                            <option value="priceAsc">Price-ascending</option>
                            <option value="priceDes">Price-descending</option>
                        </select>
                    </div>
                </div>
                <div className={styles.productCont}>
                    {products.map((el, ind) => {
                        let src;
                        for (let i = 0; i < el.images.length; i++) {
                            if (el.images[i].rel === 'Front_Standard') {
                                src = el.images[i].href
                                break
                            }
                        }
                        if (!src) {
                            for (let i = 0; i < el.images.length; i++) {
                                if (el.images[i].rel.includes('Standard')) {
                                    src = el.images[i].href
                                    break
                                }
                            }
                        }
                        return <Card 
                                name={el.name} 
                                price={el.regularPrice} 
                                src={el.image===null?'':src} 
                                reviewNum={el.customerReviewCount} 
                                avgReview={el.customerReviewAverage} 
                                onSale={el.onSale} 
                                salePrice={el.salePrice}
                                sku={el.sku} 
                                key={ind}/>
                    })}
                    {products.length===0?<p className={styles.notFound}>No products Found</p>:null}
                </div>
                <div className={styles.npButtons}>
                    <p onClick={handlePrev}>Previous</p>
                    {page>1?<p onClick={() => setPage(1)} key={'1'}>1</p>:null}
                    <p className={styles.currentPage}>{page}</p>
                    {pages}
                    {Number(lastPage) - page > 3?<span key={'...'}>...</span>:null}
                    {Number(lastPage) !== page && Number(lastPage) !== 0?<p onClick={() => setPage(Number(lastPage))}>{lastPage}</p>:null}
                    <p onClick={handleNext}>Next</p>
                </div>
                <div className={(hideDropDown===false || hideCart === false?styles.forGray:styles.forGray + ' ' + styles.hidden)}></div>
            </>
            }
        </div>
    )
}