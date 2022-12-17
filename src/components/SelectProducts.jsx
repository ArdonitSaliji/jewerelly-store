import { useEffect, useState } from 'react';

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

  return (
    <div className='product-container'>
      {products?.map((product, index) => {
        return (
          <div className='product' key={index}>
            <img src={product.image} alt='' />
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SelectProducts;
