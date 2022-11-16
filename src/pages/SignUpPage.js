import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import IconEyeClose from "../components/icon/IconEyeClose";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import Button from "../components/button/Button";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import slugify from "slugify";

const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
});

const SignUpPage = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const handleSignUp = async (values) => {
        if (!isValid) return;
        console.log(values);
        const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
        });
        const colRef = collection(db, "users");
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            username: slugify(values.fullname, { lower: true }),
        });
        // await addDoc(colRef, {
        //     fullname: values.fullname,
        //     email: values.email,
        //     password: values.password,
        // });
        toast.success("Register successfully!!!");
        navigate("/");
    };
    const [togglePassword, setTogglePassword] = useState(false);

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0)
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 100,
            });
    }, [errors]);
    useEffect(() => {
        document.title = "Register Page";
    }, []);
    return (
        <AuthenticationPage>
            <form className="form" onSubmit={handleSubmit(handleSignUp)}>
                <Field>
                    <Label htmlFor="fullname" className="label">
                        Fullname
                    </Label>
                    <Input
                        type="text"
                        name="fullname"
                        placeholder="Enter your fullname"
                        control={control}
                    />
                </Field>
                <Field>
                    <Label htmlFor="email" className="label">
                        Email
                    </Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        control={control}
                    />
                </Field>
                <Field>
                    <Label htmlFor="password" className="label">
                        Password
                    </Label>
                    <Input
                        type={togglePassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        control={control}
                    >
                        {togglePassword ? (
                            <IconEyeClose
                                className="input-icon"
                                onCLick={() => setTogglePassword(false)}
                            ></IconEyeClose>
                        ) : (
                            <IconEyeOpen
                                className="input-icon"
                                onCLick={() => setTogglePassword(true)}
                            ></IconEyeOpen>
                        )}
                    </Input>
                </Field>
                <div className="have-account">
                    You already have an account?{" "}
                    <NavLink to={"/sign-in"}>Login</NavLink>
                </div>
                <Button
                    type="submit"
                    kind="primary"
                    style={{
                        width: "100%",
                        maxWidth: 250,
                        margin: "0 auto",
                    }}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <LoadingSpinner></LoadingSpinner>
                    ) : (
                        "Sign Up"
                    )}
                </Button>
            </form>
        </AuthenticationPage>
    );
};

export default SignUpPage;
