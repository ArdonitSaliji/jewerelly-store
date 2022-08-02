/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react'
import './TradeItem.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const TradeItem = () => {
  const [spanValue, setSpanValue] = useState(1)
  const [optionState, setOptionState] = useState(false)
  const inputRef = useRef()
  const spanRef = useRef()
  const inputChangedHandler = () => {
    spanRef.current.classList.add('show')
    setSpanValue(inputRef.current.value)
    spanRef.current.style.left = 5 + spanValue * 8 + '%'
  }
  const hideInput = () => {
    spanRef.current.classList.remove('show')
  }

  return (
    <div className='trade-container'>
      <div className='trade'>
        <div className='trade-options'>
          <a
            style={!optionState ? { width: '90%', backgroundColor: 'green' } : { width: '7rem' }}
            onClick={() => setOptionState((prev) => !prev)}
          >
            Buy
          </a>
          <a
            style={optionState ? { width: '90%', backgroundColor: 'green' } : { width: '7rem' }}
            onClick={() => setOptionState((prev) => !prev)}
          >
            Sell
          </a>
        </div>
        <div className='trade-image'>
          <h2>Citrine</h2>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <img src={require('../../../images/citrine.png')} alt='' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require('../../../images/cit1.jpg')} alt='' />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='trade-quantity'>
          <div className='trade-form'>
            <ul>
              <li>Heart</li>
              <li>Oval</li>
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
              <li>12 - 14 mm</li>
              <li>14 - 20 mm</li>
            </ul>
          </div>

          <div className='trade-slider'>
            <div className='trade-slider-value'>
              <span ref={spanRef}>{spanValue}</span>
            </div>
            <div className='trade-val left'>1</div>
            <input
              className='trade-slide'
              ref={inputRef}
              type='range'
              onChange={(e) => inputChangedHandler(e)}
              onBlur={hideInput}
              defaultValue='1'
              min='1'
              max='10'
              step='0.1'
            />
            <div className='trade-val right'>10</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradeItem
