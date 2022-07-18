import React from 'react'
import './Main.css'
const Main = () => {
  return (
    <div>
      <div className='rocks'>
        <div className='rock'>
          <h3>Citrine</h3>
          <img src={require('../../images/cit1.jpg')} alt='' />
          <p>
            Citrine is a color, the most common reference for which is certain coloured varieties of
            quartz which are a medium deep shade of golden yellow.
          </p>
          <button type='button' className='rock-btn'>
            Buy or sell
          </button>
        </div>

        <div className='rock'>
          <h3>Amethyst</h3>
          <img src={require('../../images/ame.jpg')} alt='' />
          <p>
            Amethyst is a violet variety of quartz. The name comes from the Koine Greek amethystos
            from a-, "not" and methysko, "intoxicate", a reference to the belief that the stone
            protected its owner from drunkenness
          </p>
          <button type='button' className='rock-btn'>
            Buy or sell
          </button>
        </div>

        <div className='rock'>
          <h3>Diamond</h3>
          <img src={require('../../images/diamant.jpg')} alt='' />
          <p>
            Diamond, a mineral composed of pure carbon. It is the hardest naturally occurring
            substance known; it is also the most popular gemstone. Because of their extreme
            hardness, diamonds have a number of important industrial applications.
          </p>
          <button type='button' className='rock-btn'>
            Buy or sell
          </button>
        </div>

        <div className='rock'>
          <h3>Sapphire</h3>
          <img src={require('../../images/sapphire.jpg')} alt='' />
          <p>
            Sapphire is a precious gemstone, a variety of the mineral corundum, consisting of
            aluminium oxide with trace amounts of elements such as iron, titanium, chromium,
            vanadium, or magnesium.
          </p>
          <button type='button' className='rock-btn'>
            Buy or sell
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
