/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import { AiOutlineClose } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/navigation';
import { trade } from './trade';
const TradeItem = ({ setTrade, gemState, basketState, setBasketState }) => {
  const shape = JSON.parse(sessionStorage.getItem('shape'));
  const [product, setProduct] = useState(null);
  const [productShapes, setProductShapes] = useState(null);
  const currentTitle = useRef();
  const currentImage = useRef();
  const currentPrice = useRef();
  const currentSize = useRef();

  useEffect(() => {
    const getProductsByName = async () => {
      const productByName = await fetch('http://localhost:5000/api/products/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: gemState.toLowerCase(),
          shape: shape,
        }),
      });
      const json = await productByName.json();
      setProduct(json);
    };
    getProductsByName();
  }, [gemState, shape]);
  useEffect(() => {
    const getProductShapes = async () => {
      const productShapes = await fetch('http://localhost:5000/api/products/find/shape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: gemState.toLowerCase(),
        }),
      });
      const json = await productShapes.json();
      setProductShapes(json);
    };
    getProductShapes();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('basket', JSON.stringify(basketState));
  // }, [basketState]);
  // const changeShape = (e) => {
  //   setShapeState(e.target.textContent.toLowerCase());
  // };

  // let check = new Set();
  // const removedDuplicates =
  //   trade[0][gemState] &&
  //   trade[0][gemState][0]
  //     ?.filter((gem) => !check.has(gem['shape']) && check.add(gem['shape']))
  //     ?.map((image) => image.image === require('./trade-images/sold.jpg'));

  // const shapes = trade[0].shapes.map((shape, index) => {
  //   return (
  //
  //   );
  // });

  const sizes = trade[0].sizes.map((size, index) => <li key={index}>{size}</li>);
  // const colors =
  //   trade[0][gemState] &&
  //   trade[0][gemState][1]?.colors.map((color, index) => (
  //     <li
  //       key={index}
  //       style={{ background: `linear-gradient(to right, rgba(${color})  , rgba(${color}, 0.6)  )` }}
  //     ></li>
  //   ))

  return (
    <div className='trade-container'>
      <div className='trade'>
        <div className='trade-image'>
          <h2 ref={currentTitle}>{/* {gemState[0].toUpperCase() + gemState.substring(1)} */}</h2>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
          >
            {product && product.length > 0 ? (
              product.map((prod, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img src={prod.image} ref={currentImage} alt='' />
                    <div className='trade-price'>
                      <h2 ref={currentSize}>5.2 x 7.1 mm</h2>
                      <h2 ref={currentPrice}>{prod.price}</h2>
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <SwiperSlide>
                <img src={require('./trade-images/sold.jpg')} alt='' />
                <div className='trade-price'>
                  <h2>-</h2>
                  <h2>-</h2>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          <hr className='the-SEPARATOR' />
        </div>

        <div className='trade-buttons shape'>
          <ul>
            {productShapes?.map((product, index) => (
              <li className={'not-sold'} key={index}>
                {product.shape.charAt(0).toUpperCase() + product.shape.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        <div className='trade-buttons size'>
          <ul>{sizes}</ul>
        </div>
        {/* Planning to add option to choose gem by color */}
        {/* <div className='trade-buttons color'>
          <ul>{colors}</ul>
        </div> */}

        <div className='trade-cart'>
          <button
            onClick={() => {
              // updateUserCart();
              setBasketState([
                ...basketState,
                {
                  title: currentTitle.current.innerText,
                  image: currentImage.current.src,
                  price: currentPrice.current.innerText,
                  size: currentSize.current.innerText,
                },
              ]);
            }}
          >
            Add To Cart
          </button>
          <button>Buy Now</button>
        </div>
        <AiOutlineClose
          className='x'
          onClick={() => {
            setTrade(false);
          }}
        />
      </div>
    </div>
  );
};

export default TradeItem;
// const updateUserCart = async () => {
//   const updateCart = await fetch('http://localhost:5000/user/update/cart', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: {
//       product: {
//         title: currentTitle.current.innerText,
//         image: currentImage.current.src,
//         price: currentPrice.current.innerText,
//         size: currentSize.current.innerText,
//       },
//     },
//   });
//   const json = await updateCart.json();
//   console.log(json);
// };
