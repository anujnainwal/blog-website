import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../../fetures/slices/category/categoryThunk";
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
  };

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
      key: "userId",
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
      key: "title",
      fixed: "left",
    },
    {
      title: "Created At",
      width: 50,
      dataIndex: "createdAt",
      key: "createdAt",
      fixed: "left",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (data) => (
        <>
          <Button onClick={() => openHandler(data)}>Edit</Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure you want to delete this?"
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const category = useSelector((state) => state.categorySlice);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

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
            onFinish={onFinish}
          >
            <Form.Item
              name="categoryId"
              label="Category ID"
              initialValue={editId}
              hasFeedback
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              name="categoryName"
              label="Category Name"
              initialValue={editText}
              hasFeedback
            >
              <Input />
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
        scroll={{ x: 1300 }}
      />
    </div>
  );
};

export default CategoryTable;
