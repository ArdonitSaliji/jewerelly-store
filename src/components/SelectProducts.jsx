import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const SelectProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const selectProducts = async () => {
      const product = JSON.parse(sessionStorage.getItem('selectProduct').toLocaleLowerCase());
      const res = await fetch('http://localhost:5000/api/products/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product,
        }),
      });
      let json = await res.json();
      setProducts(json);
    };
    selectProducts();
  }, []);

  const addToBasket = async (e) => {
    const addProduct = await fetch('http://localhost:5000/user/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: e.target.parentElement.parentElement.title,
        user: JSON.parse(sessionStorage.getItem('user')),
      }),
    });
    const json = await addProduct.json();
    console.log(json);
  };

  return (
    <div className='product-container'>
      {products?.map((product, index) => {
        return (
          <div className='product' title={product.name} key={index}>
            <img src={process.env.PUBLIC_URL + product.image} alt='' />
            <div className='content'>
              <div className='description'>
                <p>Size: {product.size}</p>
                <p>Price: {product.price}</p>
              </div>
              <div
                className='cart-container'
                onClick={(e) => {
                  addToBasket(e);
                }}
              >
                <AiOutlineShoppingCart className='cart' />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectProducts;
