import React from 'react';
import './product.scss';

const ProductPage = () => {
    return (
        <div className='inner'>
            <div id='image-box'>
                <img src='images/products/product1.jpg' alt=''></img>
            </div>
            <div id='profile-box'>
                <ul>
                    <li>
                        <div>
                            <img src='images/icons/avatar.png' alt=''></img>
                            <span>그린</span>
                        </div>
                    </li>
                    <li>
                        제품명 : 새로운 조명
                    </li>
                    <li>
                        가격 : 50000원
                    </li>
                    <li>
                        등록일 : 2022년 06월 20일
                    </li>
                    <li>
                        상세설명 : 신상
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductPage;