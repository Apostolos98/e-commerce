import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ItemsPage from "./components/ItemsPage";
import { CartContext } from "./main";

export default function Search() {
    const { q } = useParams()
    const [products, setProd] = useState([])
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('customerReviewCount.dsc')
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const { setSearchWord } = useContext(CartContext)

    useEffect(() => {
        let words = q.split('+')
        words = words.map((el) => `search=${el}`)
        words = words.join('&')
        fetchProducts(words, page)
        .then(data => {
            setProd(data.products)
            setLastPage(data.totalPages)
            setLoading(false)
        })
    }, [page, q, sort])

    useEffect(() => {
        setPage(1)
        let words = q.split('+') // for the searchWord to change for each new search
        let searchW = '';
        for (let i = 0; i < words.length; i++) {
            searchW += ' ' + words[i]
        }
        searchW = `"${searchW}"`
        setSearchWord(searchW)
    }, [q])    
    
    function fetchProducts(words, page) {
      return (
        fetch(`https://api.bestbuy.com/v1/products(${words})?sort=${sort}&pageSize=12&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&format=json`)
        .then(re => {
            if (!re.ok) throw new Error(`Error: Request failed with status code ${re.status} (${re.statusText})`)
            else {
                return re.json()
            }
        })
        .then(data => data)
        .catch(error => {
            console.log(error.message)
        })
      )
    }

    function handleShorting(e) {
        if (e.target.value === 'popularity') setSort('customerReviewCount.dsc')
        else if (e.target.value === 'priceDes') setSort('salePrice.dsc')
        else if (e.target.value === 'priceAsc') setSort('salePrice.asc')
      }

    return (
        <ItemsPage products={products} setPage={setPage} page={page} lastPage={lastPage} handleShorting={handleShorting} loading={loading}/>        
    )
}