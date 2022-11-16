import React from "react";
import styled, { css } from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
    cursor: pointer;
    padding: 0 25px;
    line-height: 1;
    ${(props) =>
        props.kind === "secondary" &&
        css`
            background-color: white;
            color: ${(props) => props.theme.primary};
        `};
    ${(props) =>
        props.kind === "primary" &&
        css`
            color: white;
            background-image: linear-gradient(
                to right bottom,
                ${(props) => props.theme.primary},
                ${(props) => props.theme.secondary}
            );
        `};
    border-radius: 8px;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.height || "70px"};
    border: 1px solid transparent;
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;
/**
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */
const Button = ({
    type = "button",
    onClick = () => {},
    children,
    kind = "primary",
    ...props
}) => {
    const { isLoading, to } = props;
    const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
    if (to !== "" && typeof to === "string") {
        return (
            <NavLink to={to} style={{ display: "inline-block" }}>
                <ButtonStyles type={type} kind={kind} {...props}>
                    {child}
                </ButtonStyles>
            </NavLink>
        );
    }
    return (
        <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
            {child}
        </ButtonStyles>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(["button", "submit"]),
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default Button;
