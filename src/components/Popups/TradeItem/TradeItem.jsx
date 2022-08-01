/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react'
import './TradeItem.css'

const TradeItem = () => {
  const [spanValue, setSpanValue] = useState(1)
  const [optionState, setOptionState] = useState(true)
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
  const switchOption = () => {
    setOptionState((prev) => !prev)
  }
  return (
    <div className='trade-container'>
      <div className='trade'>
        <div className='trade-options'>
          <a onClick={switchOption} className={optionState && 'active'}>
            Buy
          </a>
          <a onClick={switchOption} className={!optionState && 'active'}>
            Sell
          </a>
        </div>
        <div className='trade-image'>
          <h2>Citrine</h2>
          <img src={require('../../../images/citrine.png')} alt='' />
        </div>
        <div className='trade-quantity'>
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

        {/* <AiOutlineClose className='x' /> */}
      </div>
    </div>
  )
}

export default TradeItem
