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

  const changeShape = (e) => {
    setShapeState(e.target.textContent.toLowerCase())
  }

  trade[0][gemState]?.map((gem) => gem)
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
          <ul>
            <li onClick={(e) => changeShape(e)}>Oval</li>
            <li onClick={(e) => changeShape(e)}>Heart</li>
            <li onClick={(e) => changeShape(e)}>Round</li>
            <li onClick={(e) => changeShape(e)}>Octagon</li>
            <li onClick={(e) => changeShape(e)}>Trillion</li>
            <li onClick={(e) => changeShape(e)}>Pear</li>
          </ul>
        </div>

        <div className='trade-buttons size'>
          <ul>
            <li>4 - 6 mm</li>
            <li>6 - 8 mm</li>
            <li>8 - 10 mm</li>
            <li>10 - 12 mm</li>
            <li>12 - 15 mm</li>
            <li>15 - 20 mm</li>
          </ul>
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
