import React from 'react';
import { Form, Divider, Input, InputNumber, Button } from 'antd';
import 'antd/dist/antd.css'; // 필수 🧡
import './upload.scss';

const UploadPage = () => {
    return (
        <div id='upload-container' className='inner'>
            <Form name='product-upload'>

                <Form.Item name='img-upload'
                label={<div className='upload-label'>상품사진</div>}
                >
                    <div id='upload-img-placeholder'>
                        <img src='images/icons/camera.png' alt=''></img>
                        <span>이미지를 업로드 해주세요.</span>
                    </div>
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