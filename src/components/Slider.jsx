import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Slider.module.css'

export default function Slider({ images, index, handleImageClick }) {
    const [pageY, setY] = useState(null)
    const [active, setActive] = useState(false)
    const [prev , setPrev] = useState(0)
    const element = useRef()

    useEffect(() => {
        const currentElement = element.current;
        currentElement.addEventListener('touchmove', touchMove, { passive: false });
    
        return () => {
          currentElement.removeEventListener('touchmove', touchMove);
        };
      }, []);

    function handleMove(e) {
        const height  = e.currentTarget.clientHeight
        if (active === true) {
            if (!( -(height - 300) > e.pageY - pageY + prev) && !(200 < e.pageY - pageY + prev)) {
                e.currentTarget.style.top = `${e.pageY - pageY + prev}px`
            }
        }
    }

    function handleMouseDown(e) {
        setActive(true)
        setY(e.pageY)     
    }

    function handleUp(e) {
        setActive(false);
        setPrev(e.pageY - pageY + prev)
    }

    function touchDown(e) {
        setActive(true)
        setY(e.targetTouches[0].pageY)  
    }

    function touchUp(e) {
        setActive(false);
        setPrev(e.changedTouches[0].pageY - pageY + prev)
    }

    function touchMove(e) {
        e.preventDefault();
        const height = e.currentTarget.clientHeight
        console.log(height)
        if (active === true) {
            if (!( -(height - 300) > e.changedTouches[0].pageY - pageY + prev) && !(200 < e.changedTouches[0].pageY - pageY + prev)) {
                e.currentTarget.style.top = `${e.changedTouches[0].pageY - pageY + prev}px`
            }
        }
    }

    return (
        <div className={styles.allImages}>
            <div className={styles.outerImagesCont}>
                <div className={styles.cont} onMouseDown={(e) => handleMouseDown(e)} 
                                            onMouseMove={(e) => handleMove(e)} 
                                            onMouseUp={(e) => handleUp(e)}
                                            onTouchStart={(e) => touchDown(e)}
                                            onTouchMove={(e) => touchMove(e)}
                                            onTouchEnd={(e) => touchUp(e)} ref={element}>
                    {images.map((el, ind) => {
                        if (el.rel.includes('Standard')) {
                            if (index === null && el.primary === true) return (
                                <div className={styles.single + ' ' + styles.selected} onClick={() => handleImageClick(el.href, ind)} key={el.href}>
                                    <img src={el.href} alt='' draggable='false'></img>
                                </div>
                                )
                            else if (index === null) return (
                                <div className={styles.single} onClick={() => handleImageClick(el.href, ind)} key={el.href}>
                                    <img src={el.href} alt='' draggable='false'></img>
                                </div>
                            )
                            else {
                                if ( ind === index) return (
                                    <div className={styles.single + ' ' + styles.selected} onClick={() => handleImageClick(el.href, ind)} key={el.href}>
                                        <img src={el.href} alt='' draggable='false'></img>
                                    </div>
                                )
                                else return (
                                    <div className={styles.single} onClick={() => handleImageClick(el.href, ind)} key={el.href}>
                                        <img src={el.href} alt='' draggable='false'></img>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </div>
        </div>
    )
}