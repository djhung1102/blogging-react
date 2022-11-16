import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const InputStyles = styled.div`
    position: relative;
    width: 100%;
    input {
        width: 100%;
        padding: ${(props) =>
            props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
        background-color: transparent;
        border: 1px solid ${(props) => props.theme.grayLight};
        border-radius: 8px;
        transition: all 0.2s linear;
        color: ${(props) => props.theme.black};
        font-size: 14px;
    }
    input::-webkit-input-placeholder {
        color: #b2b3bd;
    }
    input::-moz-input-placeholder {
        color: #b2b3bd;
    }
    .input-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
`;

const Input = ({ name = "", type = "text", children, control, ...props }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    return (
        <InputStyles hasIcon={children ? true : false}>
            <input id={name} type={type} {...field} {...props} />
            {children}
        </InputStyles>
    );
};
Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.any,
    control: PropTypes.any,
};

export default Input;
