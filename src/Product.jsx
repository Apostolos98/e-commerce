import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ProductPage from "./components/SingleProductPage";
import Cart from "./components/Cart";

export default function Product() {
    const { id:sku } = useParams();
    const [product, setProduct] = useState(null)
    const [hideDropDown, setHideDropDown] = useState(true)
    const [hideCart ,setHideCart] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function get() {
            let res;
            try {
                res = await fetch(`https://api.bestbuy.com/v1/products(sku=${sku})?format=json&show=name,regularPrice,salePrice,onSale,longDescription,images,features.feature,details,includedItemList,customerReviewCount,customerReviewAverage&apiKey=${import.meta.env.VITE_API_KEY}`)
                if (!res.ok) throw new Error(`Error: Request failed with status code ${res.status} (${res.statusText})`)
            }
            catch (err) {
                console.log(err.message + ', at Product.jsx')
            }
            if (res) {
                const data = await res.json()
                setProduct(data.products[0])
                setLoading(false)
            }
        }
        get()
    }, [sku])
    return (
        <div>
            <SearchBar hideDropDown={hideDropDown} setHideDropDown={setHideDropDown} hideCart = {hideCart} setHideCart={setHideCart}/>
            {<ProductPage product={product} hideDropDown={hideDropDown} setHideDropDown={setHideDropDown} hideCart={hideCart} setHideCart={setHideCart} loading={loading}/>}
            <Cart hideCart={hideCart} setHideCart={setHideCart}/>
        </div>
    )
}