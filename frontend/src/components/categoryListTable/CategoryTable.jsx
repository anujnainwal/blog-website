import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchAllCategory } from "../../fetures/slices/category/categoryThunk";
import { Avatar, Button, Form, Input, Popconfirm, Table } from "antd";
import CommonModal from "../commonModal/CommonModal";

const CategoryTable = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState(null);

  const openHandler = (data) => {
    setEditId(data._id);
    setEditText(data.title);
    setOpenModal(true);
  };  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const columns = [
    {
      title: "Category Id",
      width: 50,
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
    },
    {
      title: "Author",
      width: 50,
      dataIndex: "userId",
      key: "_id",
      fixed: "left",
      render: (data) => (
        <div>
          <Avatar src={`${data.profilePic}`} />
          <span>{data.firstname + data.lastname}</span>
        </div>
      ),
    },
    {
      title: "Category Title",
      width: 50,
      dataIndex: "title",
      key: "_id",
      fixed: "left",
    },
    {
      title: "Created At",
      width: 50,
      dataIndex: "createdAt",
      key: "_id",
      fixed: "left",
    },
    {
      title: "Action",
      key: "_id",
      fixed: "right",
      width: 50,
      render: (data) => (
        <>
          <Button onClick={() => openHandler(data)}>Edit</Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure you want to delete this?"
            onConfirm={()=>{dispatch(deleteCategory(data._id));dispatch(fetchAllCategory())}}
            onCancel={()=>alert('Cancelled')}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];


  const category = useSelector((state) => state.categorySlice);


  const data = Array.isArray(category.categories) ? category.categories : [];

  const onClose = () => {
    setOpenModal(false);
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };


  return (
    <div>
      {openModal && (
        <CommonModal
          title="Edit Category"
          onClose={onClose}
          openModal={openModal}
        >
          <Form
            form={form}
            layout="vertical"
            style={{
              margin: "auto",
              maxWidth: 600,
            }}
            initialValues={[editId,editText]}
      
            onFinish={onFinish}
          >
            <Form.Item
              name={[editId,'categoryId']}
              label="Category ID"
              hasFeedback
              initialValue={editId}
            
              
            >
             
              <Input  readOnly />
            </Form.Item>

            <Form.Item
              name={[editText,'categoryName']}
              label="Category Name"
              initialValue={editText}
              hasFeedback
              rules={[{
                required: 'Category Name is required',
                min: 5,
                max: 20
                
              }]}
            >
              <Input type="text" placeholder="Enter category name" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </CommonModal>
      )}

      <Table
        columns={columns}
        dataSource={data}
        loading={category.isLoading}
        scroll={{ x: 1300 }}
      />
    </div>
  );
};

export default CategoryTable;
