import React, { useEffect, useState } from 'react';
import { data } from './data';
import { AiOutlineSearch } from 'react-icons/ai';
const Main = ({ setGemState }) => {
  const [searchState, setSearchState] = useState('');
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      const getProducts = await fetch('http://localhost:5000/api/products/find');
      let json = await getProducts.json();
      setAllProducts(json);
    };

    getAllProducts();
  }, [searchState, setGemState]);

  return (
    <div className='main container'>
      <div className='main-title' style={{ textAlign: 'center', padding: '2rem 0 0rem' }}>
        <h1>Trading rare gems and crystals has never been easier.</h1>
      </div>
      <div className='main-search'>
        <div className='search'>
          <AiOutlineSearch style={{ fontSize: '22px', marginLeft: '0.5rem' }} />
          <input
            onChange={(e) => setSearchState(e.target.value)}
            type='text'
            placeholder='Search...'
          />
        </div>
      </div>

      <div className='gems-container'>
        {allProducts?.map((product) => {
          sessionStorage.setItem('shape', JSON.stringify('oval'));
          return (
            <div
              title={'Explorer ' + product.name}
              key={product._id}
              className='gem'
              onClick={(e) => {
                const product = e.target;
                setGemState(product.children[1].textContent.toLowerCase());
                sessionStorage.setItem(
                  'selectProduct',
                  JSON.stringify(product.children[1].textContent.toLowerCase())
                );
                window.location.assign(
                  `${window.location.href}${product.children[1].textContent.toLowerCase()}`
                );
              }}
            >
              <img src={process.env.PUBLIC_URL + product.image} alt='' />
              <h3>{product.name.charAt(0).toUpperCase() + product.name.slice(1, -1)}</h3>
              <p>{product.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;

// useEffect(() => {
//   data.map((product) => {
//     const uploadProducts = async () => {
//       const res = await fetch('http://localhost:5000/api/products/upload', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: product.name,
//           image: product.image,
//           shape: product.shape,
//           size: product.size,
//           price: product.price,
//           text: product.text,
//         }),
//       });
//     };
//     uploadProducts();
//   });
// }, []);
/* <div className='filter'>
          <label style={{ fontSize: '18px', marginRight: '0.5rem' }}>Sort by: </label>
          <select>
            {listing.map((value, i) => (
              <option key={i}>{value}</option>
            ))}
          </select>
        </div> */
