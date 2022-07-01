import React from 'react';
import { Link } from 'react-router-dom';

const MainProduct = ({prod}) => {
    return (
        <div className='product-card'>
            {/* 링크 전달 */}
            <Link to={`/product/${prod.id}`}>
                <div className='product-img'>
                    <img src={prod.imageUrl} alt=''></img>
                </div>
                <div className='product-contents'>
                    <span className='product-name'>{prod.name}</span>
                    <span className='product-price'>{prod.price}</span>
                    <div className='product-seller'>
                        <img src='images/icons/avatar.png' alt=''></img>
                        {prod.seller}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MainProduct;