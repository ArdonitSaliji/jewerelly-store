import React, { useEffect, useState } from "react";
// import { AiOutlineSearch } from 'react-icons/ai';
const Main = ({ setGemState }) => {
  const [searchState, setSearchState] = useState("");
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    const getAllProducts = (async () => {
      const getProducts = await fetch("/api/products/find");
      let json = await getProducts.json();
      setAllProducts(json);
    })();
  }, []);
  const getGemName = (e) => {
    const product = e.target;
    setGemState(
      product.title.substring(0, product.title.length - 1).toLowerCase()
    );
    sessionStorage.setItem(
      "selectProduct",
      JSON.stringify(
        product.title.substring(0, product.title.length - 1).toLowerCase()
      )
    );
    window.location.assign(
      `${window.location.href}product/${product.title
        .substring(0, product.title.length - 1)
        .toLowerCase()}`
    );
  };
  return (
    <div className="main ">
      <div
        className="main-title"
        style={{ textAlign: "center", padding: "2rem 0 0rem" }}
      >
        <h1>Buying gems and crystals has never been easier.</h1>
      </div>
      <div className="gems-container">
        {allProducts?.map((product) => {
          return (
            <div
              title={product.name}
              key={product._id}
              className="gem"
              onClick={(e) => getGemName(e)}
            >
              <img src={process.env.PUBLIC_URL + product.image} alt="" />
              <em>Agate</em>
              <h3>
                {product.name.charAt(0).toUpperCase() +
                  product.name.slice(1, -1)}
                <span></span>
              </h3>
              <h3 id="refl">
                {product.name.charAt(0).toUpperCase() +
                  product.name.slice(1, -1)}
              </h3>
              <p>{product.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
