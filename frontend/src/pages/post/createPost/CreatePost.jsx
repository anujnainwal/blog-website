import React, { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import CardComponents from "../../../components/cardComponents/CardComponents";
import { Button, Form, Input, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory} from "../../../fetures/slices/category/categoryThunk";
import { useForm } from "antd/es/form/Form";
import { createPost } from "../../../fetures/slices/post/post.thunk";

const CreatePost = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categorySlice);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const onFinish = (values) => {
    let {title,category,description,postImage} = values
    
    let postImages = postImage[0].originFileObj

   
    
    let postData = new FormData();
    postData.append('title',title);
    postData.append('category',category);
    postData.append('description',description);
    postData.append('postImage',postImages);
   dispatch(createPost(postData))
   form.resetFields()
  };

  const validateFile = (_, fileList) => {
    if (fileList.length === 0) {
      return Promise.reject("Please upload a file");
    }

    console.log(fileList)
    const file = fileList[0];
    const fileType = file.type;
    const fileSize = file.size / 1024 / 1024; // Convert to MB

    if (
      (fileType === "image/jpeg" ||
        fileType === "image/png" ||
        fileType === "image/jpg") &&
      fileSize <= 1
    ) {
      return Promise.resolve(file); // Return the file object
    }

    if (
      fileType !== "image/jpeg" &&
      fileType !== "image/png" &&
      fileType !== "image/jpg"
    ) {
      return Promise.reject("Only JPG, JPEG, and PNG file types are allowed");
    }

    if (fileSize > 1) {
      return Promise.reject("File size must be within 1MB");
    }

    return Promise.reject();
  };

  return (
    <React.Fragment>
      <Navbar />

      <div
        className="h-100"
        style={{ display: "grid", placeContent: "center", height: "100vh" }}
      >
        <CardComponents title={"Create Post Form"} height={95} width={500}>
          <Form onFinish={onFinish} form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              hasFeedback
              rules={[
                {
                  required: true,
                  min: 3,
                  max: 100,
                },
              ]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item
              label="Select Category"
              name="category"
              hasFeedback
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Please select a category"
                style={{
                  width: 200,
                }}
              >
                {categories.categories
                  ? categories.categories.map((item) => (
                      <Select.Option key={item.title}>
                        {item.title}
                      </Select.Option>
                    ))
                  : "sadsa"}
              </Select>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  min: 3,
                  max: 500,
                },
              ]}
            >
              <TextArea
                placeholder="Enter your description"
                style={{ resize: "none" }}
                rows={5}
                showCount
                maxLength={500}
              />
            </Form.Item>
            <Form.Item
              label="File"
              name="postImage"
              rules={[
                {
                  validator: validateFile,
                },
              ]}
              getValueFromEvent={(e) => e && e.fileList}
            >
              <Upload
                maxCount={1}
                accept=".jpg,.jpeg,.png"
                multiple={false}
                beforeUpload={() => false}
              >
                <Button>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item noStyle shouldUpdate>
              {({ getFieldsValue }) => {
                const { title, description, category } = getFieldsValue();
                const formIsComplete =
                  !!title && !!description && !!category;
                return (
                  <Button htmlType="submit" disabled={!formIsComplete}>
                    Submit
                  </Button>
                );
              }}
            </Form.Item>
          </Form>
        </CardComponents>
      </div>
    </React.Fragment>
  );
};

export default CreatePost;
