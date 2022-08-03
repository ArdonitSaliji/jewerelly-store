/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import { AiOutlineClose } from 'react-icons/ai'
import './TradeItem.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { trade } from './trade'

const TradeItem = ({ setTrade }) => {
  const [shapeState, setShapeState] = useState('Oval')
  const switchShape = (e) => {
    e.target.textContent !== shapeState && setShapeState(e.target.textContent)
  }
  const tradeItems = trade.map(
    ({ citrine: { image, size, price, shape } }) =>
      shape === shapeState && (
        <SwiperSlide>
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
          <h2>Citrine</h2>
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

        <div className='trade-shape'>
          <ul>
            <li onClick={(e) => switchShape(e)}>Oval</li>
            <li onClick={(e) => switchShape(e)}>Heart</li>
            <li onClick={(e) => switchShape(e)}>Round</li>
            <li onClick={(e) => switchShape(e)}>Octagon</li>
            <li onClick={(e) => switchShape(e)}>Trillion</li>
            <li onClick={(e) => switchShape(e)}>Pear</li>
          </ul>
        </div>

        <div className='trade-size'>
          <ul>
            <li>4 - 6 mm</li>
            <li>6 - 8 mm</li>
            <li>8 - 10 mm</li>
            <li>10 - 12 mm</li>
            <li>12 - 15 mm</li>
            <li>15 - 20 mm</li>
          </ul>
        </div>

        <div className='trade-cart-btns'>
          <button>Add to Cart</button>
          <button>Buy Now</button>
        </div>
        <AiOutlineClose className='x' onClick={() => setTrade(false)} />
      </div>
    </div>
  )
}

export default TradeItem
