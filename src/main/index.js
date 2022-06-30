import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';

const MainPage = () => { // name, price, imgsrc, seller
    const [ products, setProducts ] = useState([]);

    useEffect(() => { // 화면에 다 그려졌을 때 한 번만 실행
        axios.get('http://localhost:3000/products') // 요청
        .then((result) => {
            const products = result.data.products;
            console.log(result.data.products);
            setProducts(products); // .products -> 객체의 key로 접근 , products : [ ~~ ]
            console.log(products);
            console.log(result); // data 안에 products 담겨있음
            // console.log(result.data.products[1].name);
        }).catch((e) => {
            console.log(e);
        })
    }, [])

    return (
        <div>
            <div id='main'>
                <div id='banner'>
                    <img src='images/banners/banner1.png' alt=''></img>
                </div>
                <div id='product-list' className='inner'>
                    <h2>그린 조명 최신 상품</h2>
                    <div id='product-items'>
                        {/* 나중에 map 돌리기 */}
                        {
                            products.map(prod => (
                                <div className='product-card'>
                                <div className='product-img'>
                                    <img src={prod.imgsrc} alt=''></img>
                                </div>
                                <div className='product-contents'>
                                    <span className='product-name'>{prod.name}</span>
                                    <span className='product-price'>{prod.price}</span>
                                    <div className='product-seller'>
                                        <img src='images/icons/avatar.png' alt=''></img>
                                        {prod.seller}
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;