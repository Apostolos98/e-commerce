import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../main';
import styles from '../styles/Cart.module.css';
import bin from '../assets/bin.svg'

export default function Cart({ hideCart, setHideCart }) {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext)
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      let newTotal = 0;

  
      for (let i = 0; i < cartItems.length; i++) {
        newTotal += cartItems[i].price * cartItems[i].number;
      }
  
      setTotal(newTotal);
    }, [cartItems]);

    return (
        <div className={hideCart===false?styles.cont:`${styles.cont} ${styles.hidden}`}>
            <div className={styles.closeCont}>
                <div className={styles.close} onClick={() => setHideCart(true)}>X</div>
            </div>
            <div className={styles.itemsCont}>
                {cartItems.map((el) => {
                    return (
                        <div className={styles.item} key={el.name}>
                            <img src={el.url.href} alt="" width={96}/>
                            <div>
                                <p className={styles.name}>{el.name}</p>
                                <div className={styles.numPrice}>
                                    <p className={styles.price}>{el.price} &euro;</p>
                                    <div className={styles.forNum}>
                                        <p onClick={() => addToCart(el)}>+</p>
                                        <p>{el.number}</p>
                                        <p onClick={() => removeFromCart(el)}>-</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bin} onClick={() => removeFromCart(el, true)}>
                                <img src={bin} alt="" width={32}/>
                            </div>
                        </div>
                    )
                })}
                {cartItems.length===0?<p className={styles.noItems}>No items in cart</p>:null}
            </div>
            <div className={styles.total}>
                <div>
                    Total:
                </div>
                <div>
                    {total} &euro;
                </div>
            </div>
        </div>
    )
}