// import React, { useState, useEffect } from 'react';
import React from 'react'; // 💜
import './index.scss';
import axios from 'axios';
import useAsync from '../customHook/useAsync'; // 💜
import MainProduct from './MainProduct';
import { API_URL } from '../config/contansts';
import { Carousel } from 'antd'; // 🧡 슬라이더

// 💜 callback 으로 넣어줄 함수 만들어주기
async function getProducts() {
    const response = await axios.get(`${API_URL}/products`);
    return response.data; // getProducts 함수 실행되면 response.data 리턴
}

// 🧡 슬라이더
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: '#364d79',
    position : 'absolute',
    // bottom : '50px'
};

const MainPage = () => { // name, price, imgsrc, seller
    // 💜
    const [ state ] = useAsync (getProducts, []);
    const { loading, data, error } = state; // 다시 구조분해 할당
    if(loading) return <div>로딩이야</div>;
    if(error) return <div>에러야</div>;
    if(!data) return <div>없옹</div>;

    const onChange = (currentSlide) => { // 🧡 슬라이더
        console.log(currentSlide);
    };

    // const [ products, setProducts ] = useState([]);

    // useEffect(() => { // 화면에 다 그려졌을 때 한 번만 실행
    //     axios.get('http://localhost:3000/products') // 요청
    //     .then(result => {
    //         const products = result.data;
    //         // console.log(result.data.products);
    //         setProducts(products); // .products -> 객체의 key로 접근 , products : [ ~~ ]
    //         console.log(products);
    //         // console.log(result); // data 안에 products 담겨있음
    //         // console.log(result.data.products[1].name);
    //     }).catch((e) => {
    //         console.log(e);
    //     })
    // }, [])

    // if(products === []) return <div>로딩중입니다.</div>

    return (
        <div>
            <div id='main'>
                <div id='banner'>
                    {/* <img src='images/banners/banner1.png' alt=''></img> */}
                    <Carousel afterChange={onChange} autoplay>
                        <div>
                            <img src='images/banners/banner1.png' alt=''></img>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <img src='images/banners/banner1.png' alt=''></img>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <img src='images/banners/banner1.png' alt=''></img>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                    </Carousel>
                </div>
                <div id='product-list' className='inner'>
                    <h2>그린 조명 최신 상품</h2>
                    <div id='product-items'>
                        {/* 나중에 map 돌리기 */}
                        {/* {products.map(prod =>  */}
                        {data.map(prod => 
                            <MainProduct key={prod.id} prod={prod} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;