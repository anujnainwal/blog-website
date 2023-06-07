import { Button, Form, Input } from "antd";
import React, { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategories } from "../../fetures/slices/category/categoryThunk";
import MessageResponse from "../../message/MessageResponse";
import { useNavigate } from 'react-router-dom';

const CategoriesForm = () => {
let navigate = useNavigate()
  let dispatch = useDispatch();
  let onFinish = (value) => {
    dispatch(createCategories(value));
    navigate('/categoryList')
  };
  let category = useSelector(state=>state.categorySlice)
  useEffect(()=>{
    if(category.isError === true){
      MessageResponse({type: 'error', content:category.errorMessage});
    }
    
  },[category])

  return (
    <div className="w-100 ">
      <Form
        // form={form}

        onFinish={onFinish}
        layout="vertical"
        style={{
          margin: "auto",
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              min: 5,
              max: 20,
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default CategoriesForm;
