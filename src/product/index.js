import React from 'react';
import './product.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync'; // ๐
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';

 // ๐
async function getProduct(id) {
    const response = await axios.get(`${API_URL}/product/${id}`);
    return response.data;
}

const ProductPage = () => {
    // ๐ ์ญ์  ํ home ์ผ๋ก
    const navigate = useNavigate();

    // const [ product, setProduct ] = useState(null);
    const { id } = useParams(); // key๋ก id ๋ค์ด๊ฐ์์, ๊ฐ๋ค์ด id์ ๋ด๊น
    // useParams() ์คํ๋๋ฉด ํ๋ผ๋ฏธํฐ ๊ฐ์ ๊ฐ์ง๊ณ  ์๋ ๊ฐ์ฒด๋ฅผ ๋ฐํ

     // ๐
    const [ state ] = useAsync(() => getProduct(id), [id] );
    const { loading, data:product, error } = state; // data๋ product๋ก ๋ฐ๊ฒ ๋ค
    if(loading) return <div>๋ก๋ฉ์ด์ผ</div>;
    if(error) return <div>์๋ฌ์ผ</div>;
    if(!product) return <div>์์น</div>;
    
    // useEffect( function() {
    //     axios.get(`http://localhost:3000/product/${id}`)
    //     .then (result => {
    //             console.log(result);
    //             const data = result.data;
    //             setProduct(data);
    //         }
    //     )
    //     .catch (e => {
    //         console.log(e);
    //     })
    // }, [] )
    // if(!product) return <div>๋ก๋ฉ์ค</div>;
    
    // ๐ ์ญ์ 
    const productDel = () => {
        axios.delete(`${API_URL}/product/${id}`)
        .then(result => {
            console.log('์ญ์ ๋์๋ค');
            navigate("/");
        })
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <div className='inner'>
            <div id='image-box'>
                <img src={product.imageUrl} alt=''></img>
            </div>
            <div id='profile-box'>
                <ul>
                    <li>
                        <div>
                            <img src='/images/icons/avatar.png' alt=''></img>
                            <span>{product.seller}</span>
                        </div>
                    </li>
                    <li>
                        ์ด๋ฆ์ ? {product.name}
                    </li>
                    <li>
                        ๊ฐ๊ฒฉ์ ? {product.price}
                    </li>
                    <li>
                        ๋ฑ๋ก์ผ์ ? {product.name}
                    </li>
                    <li>
                        ์ด๊ฑฐ๋ ? {product.description}
                    </li>
                </ul>
            </div>
            <div id='Del'>
                <span>์์ </span>
                <span onClick={productDel}>์ญ์ </span>
            </div>
        </div>
    );
};

export default ProductPage;