import React, { useEffect, useState } from 'react';
import { data, listing } from './data';
import { AiOutlineSearch } from 'react-icons/ai';
const Main = ({ setTrade, setGemState }) => {
  const [searchState, setSearchState] = useState('');
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      const getProducts = await fetch('http://localhost:5000/api/products');
      let json = await getProducts.json();
      setAllProducts(json);
    };
    getAllProducts();
  }, [searchState, setGemState, setTrade]);

  return (
    <div className='main'>
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
        <div className='filter'>
          <label style={{ fontSize: '18px', marginRight: '0.5rem' }}>Sort by: </label>
          <select>
            {listing.map((value, i) => (
              <option key={i}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='gems-container'>
        {
          // searchState
          //   ? allGems.filter(({ props: { children } }) =>
          //       children[0].props.children.toLowerCase().includes(searchState.toLowerCase())
          //     )
          //   :
          allProducts?.map((product) => {
            sessionStorage.setItem('shape', JSON.stringify('oval'));
            return (
              <div
                key={product._id}
                className='gem'
                onClick={(e) => {
                  setTrade(true);
                  setGemState(e.target.firstElementChild.textContent.toLowerCase());
                }}
              >
                <h3>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
                <img src={product.image} alt='' />
                <p>{product.text}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Main;
