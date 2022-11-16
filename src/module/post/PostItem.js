import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .post {
        &-image {
            height: 202px;
            margin-bottom: 20px;
            display: block;
            width: 100%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 16px;
            }
        }
        &-category {
            margin-bottom: 16px;
        }
        &-title {
            margin-bottom: 8px;
        }
    }
`;

const PostItem = () => {
    return (
        <PostItemStyles>
            <PostImage
                url="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
                className="post-image"
                to="/"
            ></PostImage>
            <PostCategory className="post-category" type="secondary">
                Kiến thức
            </PostCategory>
            <PostTitle size="normal" className="post-title">
                Setup góc làm việc đơn giản
            </PostTitle>
            <PostMeta></PostMeta>
        </PostItemStyles>
    );
};

export default PostItem;
