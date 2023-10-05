import ProductsGrid from "./ProductsGrid";
import SearchBar from "./SearchBar";
import styles from '../styles/Page.module.css'
import { useState } from "react";
import Cart from "./Cart";

export default function ItemsPage({ products, setPage, page, lastPage, handleShorting, loading }) {
    const [hideDropDown, setHideDropDown] = useState(true)
    const [hideCart, setHideCart] = useState(true)

    return (
        <>
            <SearchBar hideDropDown={hideDropDown} setHideDropDown={setHideDropDown} hideCart={hideCart} setHideCart={setHideCart}/>
            <ProductsGrid products={products} setPage={setPage} page={page} lastPage={lastPage} hideDropDown={hideDropDown} setHideDropDown={setHideDropDown} hideCart={hideCart} setHideCart={setHideCart} handleShorting={handleShorting} loading={loading}/>
            <Cart hideCart={hideCart} setHideCart={setHideCart}/>
        </>
    )
}