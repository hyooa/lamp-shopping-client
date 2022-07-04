import React, { useState } from 'react';
import { Form, Divider, Input, InputNumber, Button, Upload } from 'antd'; // 💛 추가 ) Upload
import 'antd/dist/antd.css'; // 필수 🧡
import './upload.scss';
import { API_URL } from '../config/contansts';

 // 💛
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 원하는 경로로 이동

const UploadPage = () => {
    // 등록 후 메인으로 이동 💛
    const navigate = useNavigate();

    // 이미지 경로 상태관리 하기 💛
    const [ imageUrl, setImageUrl ] = useState(null);
    // 이미지 처리 함수
    const onChangeImage = (info) => {
        // 파일이 업로드 중일 때
        if(info.file.status === "uploading") {
            return;
        }
        // 파일이 업로드 완료되었을 때
        if(info.file.status === "done") {
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            // 받은 이미지경로를 imageUrl에 넣어줌
            setImageUrl(imageUrl);
        }
    }

    const onSubmit = ( values ) => { // 💛
        // 서버로 데이터 전송하기
        axios.post(`${API_URL}/products`, {
            name : values.name,
            price : values.price,
            seller : values.seller,
            imageUrl : imageUrl,
            description : values.description
        })
        .then ((result) => {
            console.log(result);
            navigate("/"); // home 으로 보내기
        })
        .catch (e => {
            console.log(e);
        })
    }

    return (
        <div id='upload-container' className='inner'>
                                        {/* submit = onFinish , 버튼 누르면 동작 💛 */}
            <Form name='product-upload' onFinish={(onSubmit)}>

                <Form.Item name='img-upload'
                label={<div className='upload-label'>상품사진</div>} 
                >
                    {/* 💛 클릭시 Upload 가 동작되도록 , input이 하나 숨어있음 */}
                    <Upload
                        name='image'
                        action={`${API_URL}/image`}
                        listType='picture'
                        showUploadList={false}
                        // onChange = {function() {
                        onChange ={onChangeImage} >
                            {/* 업로드 이미지가 있으면 이미지를 나타내고 업로드 이미지가 없으면
                            회색배경에 업로드 아이콘이 나타나도록 ~ */}
                            { // imageUrl ? true : null 일 때
                                imageUrl ?
                                (<img src={imageUrl} alt=''
                                width="200px" height="200px"/>)
                                :
                                <div id='upload-img-placeholder'>
                                    <img src='images/icons/camera.png' alt=''></img>
                                    <span>이미지를 업로드 해주세요.</span>
                                </div>
                            }
                        {/* }} > */}
                    </Upload>
                </Form.Item>
                <Divider></Divider>

                <Form.Item name='seller'
                label={<div className='upload-label'>판매자명</div>}
                >
                    <Input className='name-upload' size='large'
                    placeholder='판매자 이름을 입력하세요.'
                    ></Input>
                </Form.Item>
                <Divider></Divider>

                <Form.Item name='name'
                label={<div className='upload-label'>상품이름</div>}
                >
                    <Input className='upload-name' size='large'
                    placeholder='상품 이름을 입력하세요.'
                    ></Input>
                </Form.Item>
                <Divider></Divider>

                <Form.Item name='price'
                label={<div className='upload-label'>상품가격</div>}
                >
                    <InputNumber defaultValue={0} size='large'
                    ></InputNumber>
                </Form.Item>
                <Divider></Divider>

                <Form.Item name='description'
                label={<div className='upload-label'>상품소개</div>}
                >
                    <Input.TextArea
                    size='large'
                    id='product-description'
                    maxLength={300}
                    placeholder='상품소개를 적어주세요.'
                    ></Input.TextArea>
                </Form.Item>

                <Form.Item>
                    <Button id='submit-button' size='large' htmlType='submit'>상품등록하기</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UploadPage;