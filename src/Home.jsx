import { useState, useEffect } from 'react'
import ItemsPage from './components/ItemsPage'

export default function Home() {
    const [products, setProd] = useState([])
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('customerReviewCount.dsc')
    const [lastPage, setLastPage] = useState(1)

    useEffect(() => {
        fetchProducts(page)
        .then(data => {
            setProd(data.products)
            setLastPage(data.totalPages)
        })
    }, [page, sort])
    
    function fetchProducts(page) {
      return (
        fetch(`https://api.bestbuy.com/v1/products?sort=${sort}&pageSize=12&apiKey=qhqws47nyvgze2mq3qx4jadt&page=${page}&format=json&`)
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
        <ItemsPage products={products} setPage={setPage} page={page} lastPage={lastPage} handleShorting={handleShorting}/>
    )
}