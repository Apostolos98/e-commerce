import { useState, useEffect } from "react";
import ItemsPage from './components/ItemsPage.jsx'
import { useParams } from "react-router-dom";


export default function Category() {
    const { id } = useParams()
    const [products, setProd] = useState([])
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('customerReviewCount.dsc')
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts(id, page)
        .then(data => {
          setProd(data.products)
          setLastPage(data.totalPages)
          setLoading(false)
        })
    }, [page, id, sort])

    useEffect(() => {
      setPage(1)
    }, [id])
    
    function fetchProducts(id, page) {
      return (
        fetch(`https://api.bestbuy.com/v1/products((categoryPath.id=${id}))?sort=${sort}&pageSize=12&apiKey=qhqws47nyvgze2mq3qx4jadt&format=json&page=${page}`)
        .then(re => {
            if (!re.ok) throw new Error(`Error: Request failed with status code ${re.status} (${re.statusText})`)
            else {
                return re.json()
            }
        })
        .then(data => data)
        .catch(error => {
            console.log(error.message, 'failed to fetch at category')
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