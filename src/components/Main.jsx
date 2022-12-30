import React, { useEffect, useState } from "react";
// import { AiOutlineSearch } from 'react-icons/ai';
const Main = ({ setGemState }) => {
  const [searchState, setSearchState] = useState("");
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    const getAllProducts = (async () => {
      const getProducts = await fetch(
        "http://localhost:5000/api/products/find"
      );
      let json = await getProducts.json();
      setAllProducts(json);
    })();
  }, []);
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
              title={"Explorer " + product.name}
              key={product._id}
              className="gem"
              onClick={(e) => {
                const product = e.target;
                setGemState(product.children[1].textContent.toLowerCase());
                console.log(product.children[1].textContent.toLowerCase());
                sessionStorage.setItem(
                  "selectProduct",
                  JSON.stringify(product.children[1].textContent.toLowerCase())
                );
                window.location.assign(
                  `${
                    window.location.href
                  }product/${product.children[1].textContent.toLowerCase()}`
                );
              }}
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
