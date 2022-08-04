/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import { AiOutlineClose } from 'react-icons/ai'
import './TradeItem.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { trade } from './trade'

const TradeItem = ({ setTrade, gemState }) => {
  const [shapeState, setShapeState] = useState('oval')
  let check = new Set()
  const removedDuplicates = trade[0][gemState]
    ?.filter((gem) => !check.has(gem['shape']) && check.add(gem['shape']))
    ?.map((image) => image.image === require('./trade-images/sold.jpg'))

  const changeShape = (e) => {
    setShapeState(e.target.textContent.toLowerCase())
  }
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
  const tradeItems = trade[0][gemState]?.map(
    ({ image, size = '-', price = '-', shape }, index) =>
      shape.toLowerCase() === shapeState && (
        <SwiperSlide key={index}>
          <img src={image} alt='' />
          <div className='trade-price'>
            <h2>{size}</h2>
            <h2>{price}</h2>
          </div>
        </SwiperSlide>
      )
  )
  return (
    <div className='trade-container'>
      <div className='trade'>
        <div className='trade-image'>
          <h2>{gemState[0].toUpperCase() + gemState.substring(1)}</h2>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
          >
            {tradeItems ? (
              tradeItems
            ) : (
              <SwiperSlide>
                <img src={require('./trade-images/sold.jpg')} alt='' />
                <div className='trade-price'>
                  <h2>-</h2>
                  <h2>-</h2>
                </div>
              </SwiperSlide>
            )}
          </Swiper>

          <hr className='the-SEPARATOR' />
        </div>

        <div className='trade-buttons shape'>
          <ul>{shapes}</ul>
        </div>

        <div className='trade-buttons size'>
          <ul>{sizes}</ul>
        </div>

        <div className='trade-cart'>
          <button>Add To Cart</button>
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
