import './Checkout.css';
const Checkout = () => {
  return (
    <div className='checkout-container'>
      <form action=''>
        <div className='row'>
          <div className='col'>
            <h3 className='title'>Billing address</h3>

            <div className='inputBox'>
              <span>Full name :</span>
              <input type='text' placeholder='john deo' />
            </div>
            <div className='inputBox'>
              <span>Email :</span>
              <input type='email' placeholder='example@example.com' />
            </div>
            <div className='inputBox'>
              <span>Address :</span>
              <input type='text' placeholder='room - street - locality' />
            </div>
            <div className='inputBox'>
              <span>City :</span>
              <input type='text' placeholder='mumbai' />
            </div>

            <div className='flex'>
              <div className='inputBox'>
                <span>State :</span>
                <input type='text' placeholder='State' />
              </div>
              <div className='inputBox'>
                <span>Zip code :</span>
                <input type='text' placeholder='123 456' />
              </div>
            </div>
          </div>

          <div className='col'>
            <h3 className='title'>payment</h3>

            <div className='inputBox'>
              <span>cards accepted :</span>
              <img src={require('./images/card_img.png')} alt='' />
            </div>
            <div className='inputBox'>
              <span>name on card :</span>
              <input type='text' placeholder='mr. john deo' />
            </div>
            <div className='inputBox'>
              <span>credit card number :</span>
              <input type='number' placeholder='1111-2222-3333-4444' />
            </div>
            <div className='inputBox'>
              <span>exp month :</span>
              <input type='text' placeholder='january' />
            </div>

            <div className='flex'>
              <div className='inputBox'>
                <span>exp year :</span>
                <input type='number' placeholder='exp year' />
              </div>
              <div className='inputBox'>
                <span>CVV :</span>
                <input type='text' placeholder='1234' />
              </div>
            </div>
          </div>
        </div>

        <input type='submit' value='proceed to checkout' className='submit-btn' />
      </form>
    </div>
  );
};

export default Checkout;
