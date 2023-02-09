import React, { useEffect, useState } from 'react';
// import { AiOutlineSearch } from 'react-icons/ai';
const Main = ({ setGemState }) => {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const getProducts = await fetch('http://127.0.0.1:8000/products');
      let json = await getProducts.json();
      setAllProducts(json);
    })();
  }, []);
  const getGemName = (e) => {
    const product = e.target;
    setGemState(product.title.substring(0, product.title.length - 1).toLowerCase());
    sessionStorage.setItem(
      'selectProduct',
      JSON.stringify(product.title.substring(0, product.title.length - 1).toLowerCase())
    );
    window.location.assign(
      `${window.location.href}product/${product.title
        .substring(0, product.title.length - 1)
        .toLowerCase()}`
    );
  };
  return (
    <div className='main '>
      <div className='main-title'>
        <h1>Buying gems and crystals has never been easier.</h1>
      </div>
      <div className='gems-container'>
        {allProducts?.map((product) => {
          return (
            <div
              title={product.name}
              key={product.id}
              className='gem'
              onClick={(e) => getGemName(e)}
            >
              <img src={process.env.PUBLIC_URL + product.image} alt='' />
              <h4>{product.name.charAt(0).toUpperCase() + product.name.slice(1, -1)}</h4>

              <p>{product.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
