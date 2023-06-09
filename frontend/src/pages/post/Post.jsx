import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost } from "../../fetures/slices/post/post.thunk";
import './assets/style/post.css'
import { Avatar, Card, Col, Row, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import DateFormat from "../../components/dateFormat/DateFormat";
import { NavLink } from "react-router-dom";

const Post = () => {
  let dispatch = useDispatch();
  let blogPost = useSelector((state) => state.postSlice);
  useEffect(() => {
    dispatch(fetchAllPost());
  }, [dispatch]);



  return (
    <React.Fragment>
      <Navbar />
      <div className="flex">
        {blogPost.isLoading === true ? (
          <h2>Loading....</h2>
        ) : blogPost.posts ? (
          blogPost.posts.map((postData, index) => {
            return (
              <Card
                key={index}
                style={{
                  width: 240,
                  padding:'0 ',
                  margin: "20px 20px",
                  border: "1px solid grey",
                }}
                bordered={true}
                cover={
                  <img
                    alt="example"
                    src="https://i.ytimg.com/vi/Dorf8i6lCuk/maxresdefault.jpg"
                  />
                }
               
              >
                <Tag color="#cd201f" className="mb-3">{postData.category}</Tag>
                <Meta
                  title={postData.title}
                  description={postData.description} 
                  className="cutoff__text"
                />
  <br />  
                <NavLink to='/read'>Read More</NavLink>
                <br />  
                <br />
                <Row>
                  <Col>
                    <Avatar size={40} src={postData.author.profilePic} style={{margin:'0'}} />
                  </Col>
                  <Col>
                    {postData.author.firstname + postData.author.lastname}
                    <br />
                    {<DateFormat date={postData.createdAt}> </DateFormat>}
                  </Col>
                </Row>
              </Card>
            );
          })
        ) : (
          "no"
        )}
      </div>
    </React.Fragment>
  );
};

export default Post;
