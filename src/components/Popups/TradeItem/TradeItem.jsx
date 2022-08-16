/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import { AiOutlineClose } from 'react-icons/ai'
import './TradeItem.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { trade } from './trade'

const TradeItem = ({ setTrade, gemState, basketState, setBasketState }) => {
  const [shapeState, setShapeState] = useState('oval')
  const currentTitle = useRef()
  const currentImage = useRef()
  const currentPrice = useRef()
  const currentSize = useRef()

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketState))
  }, [basketState])
  const changeShape = (e) => {
    setShapeState(e.target.textContent.toLowerCase())
  }

  let check = new Set()
  const removedDuplicates =
    trade[0][gemState] &&
    trade[0][gemState][0]
      ?.filter((gem) => !check.has(gem['shape']) && check.add(gem['shape']))
      ?.map((image) => image.image === require('./trade-images/sold.jpg'))

  const shapes = trade[0].shapes.map((shape, index) => {
    return (
      <li
        className={removedDuplicates ? (removedDuplicates[index] ? 'sold' : 'not-sold') : 'sold'}
        key={index}
        onClick={(e) => changeShape(e)}
      >
        {shape}
      </li>
    )
  })

  const sizes = trade[0].sizes.map((size, index) => <li key={index}>{size}</li>)
  const colors =
    trade[0][gemState] &&
    trade[0][gemState][1]?.colors.map((color, index) => (
      <li
        key={index}
        style={{ background: `linear-gradient(to right, rgba(${color})  , rgba(${color}, 0.6)  )` }}
      ></li>
    ))

  const tradeItems = trade[0][gemState] ? (
    trade[0][gemState][0].map(
      ({ image, size = '-', price = '-', shape }, index) =>
        shape.toLowerCase() === shapeState && (
          <SwiperSlide key={index}>
            <img src={image} ref={currentImage} alt='' />
            <div className='trade-price'>
              <h2 ref={currentSize}>{size}</h2>
              <h2 ref={currentPrice}>{price}</h2>
            </div>
          </SwiperSlide>
        )
    )
  ) : (
    <SwiperSlide>
      <img src={require('./trade-images/sold.jpg')} alt='' />
      <div className='trade-price'>
        <h2>-</h2>
        <h2>-</h2>
      </div>
    </SwiperSlide>
  )
  return (
    <div className='trade-container'>
      <div className='trade'>
        <div className='trade-image'>
          <h2 ref={currentTitle}>{gemState[0].toUpperCase() + gemState.substring(1)}</h2>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
          >
            {tradeItems}
          </Swiper>

          <hr className='the-SEPARATOR' />
        </div>

        <div className='trade-buttons shape'>
          <ul>{shapes}</ul>
        </div>

        <div className='trade-buttons size'>
          <ul>{sizes}</ul>
        </div>
        <div className='trade-buttons color'>
          <ul>{colors}</ul>
        </div>

        <div className='trade-cart'>
          <button
            onClick={() => {
              setBasketState([
                ...basketState,
                {
                  title: currentTitle.current.innerText,
                  image: currentImage.current.src,
                  price: currentPrice.current.innerText,
                  size: currentSize.current.innerText,
                },
              ])
            }}
          >
            Add To Cart
          </button>
          <button>Buy Now</button>
        </div>
        <AiOutlineClose
          className='x'
          onClick={() => {
            setTrade(false)
          }}
        />
      </div>
    </div>
  )
}

export default TradeItem
