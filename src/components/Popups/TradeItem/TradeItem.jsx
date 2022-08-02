/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import './TradeItem.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { trade } from './trade'
const TradeItem = () => {
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
            {trade.map(({ image, size, price }) => (
              <SwiperSlide>
                <img src={image} alt='' />
                <div className='trade-price'>
                  <h2>{size}</h2>
                  <h2>{price}</h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <hr className='the-SEPARATOR' />
        </div>

        <div className='trade-shape'>
          <ul>
            <li>Oval</li>
            <li>Heart</li>
            <li>Round</li>
            <li>Octagon</li>
            <li>Trillion</li>
            <li>Pear</li>
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
          <button>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default TradeItem
