import React, { useState } from 'react';
import { Form, Divider, Input, InputNumber, Button, Upload } from 'antd'; // π μΆκ° ) Upload
import 'antd/dist/antd.css'; // νμ π§‘
import './upload.scss';
import { API_URL } from '../config/contansts';

 // π
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // μνλ κ²½λ‘λ‘ μ΄λ

const UploadPage = () => {
    // λ±λ‘ ν λ©μΈμΌλ‘ μ΄λ π
    const navigate = useNavigate();

    // μ΄λ―Έμ§ κ²½λ‘ μνκ΄λ¦¬ νκΈ° π
    const [ imageUrl, setImageUrl ] = useState(null);
    // μ΄λ―Έμ§ μ²λ¦¬ ν¨μ
    const onChangeImage = (info) => {
        // νμΌμ΄ μλ‘λ μ€μΌ λ
        if(info.file.status === "uploading") {
            return;
        }
        // νμΌμ΄ μλ‘λ μλ£λμμ λ
        if(info.file.status === "done") {
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            // λ°μ μ΄λ―Έμ§κ²½λ‘λ₯Ό imageUrlμ λ£μ΄μ€
            setImageUrl(imageUrl);
        }
    }

    const onSubmit = ( values ) => { // π
        // μλ²λ‘ λ°μ΄ν° μ μ‘νκΈ°
        axios.post(`${API_URL}/products`, {
            name : values.name,
            price : values.price,
            seller : values.seller,
            imageUrl : imageUrl,
            description : values.description
        })
        .then ((result) => {
            console.log(result);
            navigate("/"); // home μΌλ‘ λ³΄λ΄κΈ°
        })
        .catch (e => {
            console.log(e);
        })
    }

    return (
        <div id='upload-container' className='inner'>
                                        {/* submit = onFinish , λ²νΌ λλ₯΄λ©΄ λμ π */}
            <Form name='product-upload' onFinish={(onSubmit)}>

                <Form.Item name='img-upload'
                label={<div className='upload-label'>μνμ¬μ§</div>} 
                >
                    {/* π ν΄λ¦­μ Upload κ° λμλλλ‘ , inputμ΄ νλ μ¨μ΄μμ */}
                    <Upload
                        name='image'
                        action={`${API_URL}/image`}
                        listType='picture'
                        showUploadList={false}
                        // onChange = {function() {
                        onChange ={onChangeImage} >
                            {/* μλ‘λ μ΄λ―Έμ§κ° μμΌλ©΄ μ΄λ―Έμ§λ₯Ό λνλ΄κ³  μλ‘λ μ΄λ―Έμ§κ° μμΌλ©΄
                            νμλ°°κ²½μ μλ‘λ μμ΄μ½μ΄ λνλλλ‘ ~ */}
                            { // imageUrl ? true : null μΌ λ
                                imageUrl ?
                                (<img src={imageUrl} alt=''
                                width="200px" height="200px"/>)
                                :
                                <div id='upload-img-placeholder'>
                                    <img src='images/icons/camera.png' alt=''></img>
                                    <span>μ΄λ―Έμ§λ₯Ό μλ‘λ ν΄μ£ΌμΈμ.</span>
                                </div>
                            }
                        {/* }} > */}
                    </Upload>
                </Form.Item>
                <Divider></Divider>

                <Form.Item name='seller'
                label={<div className='upload-label'>νλ§€μλͺ</div>}
                >
                    <Input className='name-upload' size='large'
                    placeholder='νλ§€μ μ΄λ¦μ μλ ₯νμΈμ.'
                    ></Input>
                </Form.Item>
                <Divider></Divider>

                <Form.Item name='name'
                label={<div className='upload-label'>μνμ΄λ¦</div>}
                >
                    <Input className='upload-name' size='large'
                    placeholder='μν μ΄λ¦μ μλ ₯νμΈμ.'
                    ></Input>
                </Form.Item>
                <Divider></Divider>

                <Form.Item name='price'
                label={<div className='upload-label'>μνκ°κ²©</div>}
                >
                    <InputNumber defaultValue={0} size='large'
                    ></InputNumber>
                </Form.Item>
                <Divider></Divider>

                <Form.Item name='description'
                label={<div className='upload-label'>μνμκ°</div>}
                >
                    <Input.TextArea
                    size='large'
                    id='product-description'
                    maxLength={300}
                    placeholder='μνμκ°λ₯Ό μ μ΄μ£ΌμΈμ.'
                    ></Input.TextArea>
                </Form.Item>

                <Form.Item>
                    <Button id='submit-button' size='large' htmlType='submit'>μνλ±λ‘νκΈ°</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UploadPage;