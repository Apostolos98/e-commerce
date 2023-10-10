import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from '../styles/DropDown.module.css'
import svg from '../assets/svg.svg'
import ham from '../assets/hamburger.svg'
import { CartContext } from "../main";

export default function DropDown({ hide }) {
  const [categories, setCat] = useState([])
  const [subCat, setSubCat] = useState([])
  const [index, setIndex] = useState(null)
  const [top, setTop] = useState('48.6px')
  const [classN , setName] = useState(styles.departments + ' ' + styles.hidden)
  const { setSearchWord } = useContext(CartContext)

  useEffect(() => {
    async function getData() {
        try {
            const res = await fetch('https://api.bestbuy.com/v1/categories(name=Best Buy*)?apiKey=qhqws47nyvgze2mq3qx4jadt&format=json')
            if (!res.ok) throw new Error('bad responce')
            const data = await res.json()
            setCat(data.categories[0].subCategories)
        }
        catch (err) {
            console.log('Error fetching data for DropDown: ' + err.message)
        }
    }
    getData()
  }, [])

  useEffect(() => {
    if (hide === true) {
      setName(styles.departments + ' ' + styles.hidden)
    }
    else if (hide === false) {
      setName(styles.departments)
    }
  }, [hide])

  function subCategoryReq(id) {
    return (fetch(`https://api.bestbuy.com/v1/categories(id=${id}*)?apiKey=qhqws47nyvgze2mq3qx4jadt&format=json`)
    .then(re => {
        if (!re.ok) throw new Error('Bad responce on DropDownclick')
        else {
          return re.json()
        }
    })
    .catch(er => {
        console.log(er)
        throw er
    })
    )
  }

  function DropDownClick(id, e) {
    async function get() {
        let data
        try {
            data = await subCategoryReq(id)
        }
        catch (er) {
            console.log('error: ' + er.message)
        }
    
        if (data) {
            setSubCat(data.categories[0].subCategories)
        }
    }
    get()
    let ind = e.target.getAttribute('data-id')
    ind = Number(ind)
    setIndex(ind)
    let height = 48 + 41.6 * ind + 20
    if (ind >= 15 && ind < 18) height = height - 41.6
    else if (ind >= 4 && ind < 18) height = height - 41.6 * 2 + 100
    else if (ind >= 18) height = height - 41.6 * 2
    setTop(`${height}px`)
  }

  return (
    <div className={styles.cont}>
        <p className={styles.shopBy} id="ShowDep">Shop by Department <img src={ham} alt="" width={24}/></p>
        <div className={classN} id="departments">
          {categories.map((el, ind) => {
              if (ind < 20 && ind !== 15 && ind !== 18) {
                let classN = styles.pDepartments
                if (index === ind) {
                  classN += ' ' + styles.active
                }
                return (<p className={classN} onClick={(e) => DropDownClick(el.id, e)} data-id={ind} key={ind} name='pDep'>
                          {el.name} <img src={svg} alt="" className={styles.svg}/>
                       </p>)
              }
          })}
        </div>
        <div className={(hide===true||subCat.length===0?styles.subCat + ' ' + styles.hidden:styles.subCat)} style={{ top: top}}>
            {subCat.map((el, ind) => {
                if (ind < 13) {
                  return <Link to={`/category/${el.id}`} className={styles.link} key={ind} onClick={() => setSearchWord(`"${el.name}"`)}>{el.name}</Link>
                }
            })}
        </div>
    </div>
  )
}