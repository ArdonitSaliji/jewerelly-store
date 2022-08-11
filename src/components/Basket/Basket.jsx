import './Basket.css'
const Basket = ({ basketState }) => {
  return (
    <div className='basket'>
      <h2>Basket Items</h2>
      <div className='basket-items'>
        {basketState &&
          basketState.map((el, i) => (
            <div key={i} className='basket-item'>
              <h3>{el.title}</h3>
              <img src={el.image} alt='' />
              <div className='item-info'>
                <p>{el.size}</p>
                <p>{el.price}</p>
              </div>
              <button>Remove</button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Basket
