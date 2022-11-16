import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo {
        display: inline-block;
        margin-bottom: 40px;
    }
    .heading {
        font-size: 60px;
        font-weight: bold;
        margin-bottom: 40px;
    }
`;

const NotFoundPage = () => {
    return (
        <NotFoundPageStyles>
            <NavLink to="/" className={"logo"}>
                <img srcSet="/logo.png 2x" alt="monkey-blogging" />
            </NavLink>
            <h1 className="heading">Oops! Page Not Found</h1>
        </NotFoundPageStyles>
    );
};

export default NotFoundPage;
