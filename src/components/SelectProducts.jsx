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

  return products.map((product, index) => (
    <div key={index}>
      <img src={process.env.PUBLIC_URL + product.image} alt='' />
      <h2>{product.price}</h2>
    </div>
  ));
};

export default SelectProducts;
