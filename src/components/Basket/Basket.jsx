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
                <p>{el.price}</p>
                <p>{el.size}</p>
              </div>
              <button onClick={(e) => e.target.parentElement.remove()}>Remove</button>
            </div>
          ))}
      </div>
      <div className='basket-checkout'>
        <h1>h</h1>
      </div>
    </div>
  )
}

export default Basket
