import React from 'react';
import './product.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync'; // 💜
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';

 // 💜
async function getProduct(id) {
    const response = await axios.get(`${API_URL}/product/${id}`);
    return response.data;
}

const ProductPage = () => {
    // 💛 삭제 후 home 으로
    const navigate = useNavigate();

    // const [ product, setProduct ] = useState(null);
    const { id } = useParams(); // key로 id 들어가있음, 값들이 id에 담김
    // useParams() 실행되면 파라미터 값을 가지고 있는 객체를 반환

     // 💜
    const [ state ] = useAsync(() => getProduct(id), [id] );
    const { loading, data:product, error } = state; // data는 product로 받겠다
    if(loading) return <div>로딩이야</div>;
    if(error) return <div>에러야</div>;
    if(!product) return <div>없옹</div>;
    
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
    // if(!product) return <div>로딩중</div>;
    
    // 💛 삭제
    const productDel = () => {
        axios.delete(`${API_URL}/product/${id}`)
        .then(result => {
            console.log('삭제되었다');
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
                        이름은 ? {product.name}
                    </li>
                    <li>
                        가격은 ? {product.price}
                    </li>
                    <li>
                        등록일은 ? {product.name}
                    </li>
                    <li>
                        이거는 ? {product.description}
                    </li>
                </ul>
            </div>
            <div id='Del'>
                <span>수정</span>
                <span onClick={productDel}>삭제</span>
            </div>
        </div>
    );
};

export default ProductPage;