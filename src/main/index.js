// import React, { useState, useEffect } from 'react';
import React from 'react'; // π
import './index.scss';
import axios from 'axios';
import useAsync from '../customHook/useAsync'; // π
import MainProduct from './MainProduct';
import { API_URL } from '../config/contansts';
import { Carousel } from 'antd'; // π§‘ μ¬λΌμ΄λ

// π callback μΌλ‘ λ£μ΄μ€ ν¨μ λ§λ€μ΄μ£ΌκΈ°
async function getProducts() {
    const response = await axios.get(`${API_URL}/products`);
    return response.data; // getProducts ν¨μ μ€νλλ©΄ response.data λ¦¬ν΄
}

// π§‘ μ¬λΌμ΄λ
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
    // π
    const [ state ] = useAsync (getProducts, []);
    const { loading, data, error } = state; // λ€μ κ΅¬μ‘°λΆν΄ ν λΉ
    if(loading) return <div>λ‘λ©μ΄μΌ</div>;
    if(error) return <div>μλ¬μΌ</div>;
    if(!data) return <div>μμΉ</div>;

    const onChange = (currentSlide) => { // π§‘ μ¬λΌμ΄λ
        console.log(currentSlide);
    };

    // const [ products, setProducts ] = useState([]);

    // useEffect(() => { // νλ©΄μ λ€ κ·Έλ €μ‘μ λ ν λ²λ§ μ€ν
    //     axios.get('http://localhost:3000/products') // μμ²­
    //     .then(result => {
    //         const products = result.data;
    //         // console.log(result.data.products);
    //         setProducts(products); // .products -> κ°μ²΄μ keyλ‘ μ κ·Ό , products : [ ~~ ]
    //         console.log(products);
    //         // console.log(result); // data μμ products λ΄κ²¨μμ
    //         // console.log(result.data.products[1].name);
    //     }).catch((e) => {
    //         console.log(e);
    //     })
    // }, [])

    // if(products === []) return <div>λ‘λ©μ€μλλ€.</div>

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
                    <h2>κ·Έλ¦° μ‘°λͺ μ΅μ  μν</h2>
                    <div id='product-items'>
                        {/* λμ€μ map λλ¦¬κΈ° */}
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