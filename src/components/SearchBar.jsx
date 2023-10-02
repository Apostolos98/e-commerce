import styles from '../styles/SearchBar.module.css';
import { useNavigate } from 'react-router-dom';
import DropDown from './DropDown';
import search from '../assets/search.svg'
import cart from '../assets/shopCart.svg'
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../main';

export default function SearchBar({ hideDropDown, setHideDropDown, hideCart, setHideCart }) {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext)
    const [number, setNumber] = useState(0)

    useEffect(() => {
        let a = 0
        for (let i = 0; i < cartItems.length; i++) {
            a += cartItems[i].number
        }
        setNumber(a)
    }, [cartItems])

    function handleSubmit(e) {
        e.preventDefault();
        const search = e.target.elements.search.value.replace(' ', '+')
        navigate(`/search/${search}`)
    }

    function handleClick(e) {
        if (hideDropDown === false && (e.target.id !== 'departments' && e.target.getAttribute('name') !== 'pDep')) {
            setHideDropDown(true)
        }
        else if (hideDropDown === true && e.target.id === 'ShowDep') {
            setHideDropDown(false)
            setHideCart(true)
        }
       
        if (hideCart === false) setHideCart(true)
    }

    function cartClick() {
        setHideCart(false)
        setHideDropDown(true)
    }

    return (
        <div className={styles.cont} onClick={(e) => handleClick(e)}>
            <div className={styles.cont1}>
                <div className={styles.logo}><div>Fake</div><div>Store</div></div>
                <DropDown hide={hideDropDown}/>
            </div>
            <div className={styles.cont2}>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" name='search' placeholder='Search for products'/>
                    <button type='submit'><img src={search} alt="" width={16}/></button>
                </form>
            </div>
            <div className={styles.cont3} onClick={cartClick}>
                Cart
                <img src={cart} alt="" width={38}/>
                <p className={styles.num}></p>
                <p className={styles.number}>{number===0?null:number}</p>
            </div>
        </div>
    )
}