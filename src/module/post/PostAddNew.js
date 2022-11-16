import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Dropdown from "../../components/dropdown/Dropdown";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import { async } from "@firebase/util";
import {
    addDoc,
    collection,
    getDocs,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const { userInfo } = useAuth();
    console.log(userInfo);
    const {
        control,
        watch,
        setValue,
        // formState: { errors, isValid, isSubmitting },
        handleSubmit,
        getValues,
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            slug: "",
            status: 2,
            // categoryId: "",
            hot: false,
            image: "",
            // author: "",
        },
    });
    const watchStatus = watch("status");
    const watchCategory = watch("category");
    const watchHot = watch("hot");
    console.log("PostAddNew ~ watchStatus", watchStatus);
    console.log("PostAddNew ~ watchCategory", watchCategory);
    const { image, progress, onSelectImage, handleDeleteImage } =
        useFirebaseImage(setValue, getValues);

    const addPostHandler = async (values) => {
        const cloneValues = { ...values };
        cloneValues.slug = slugify(values.slug || values.title, {
            lower: true,
        });
        cloneValues.status = Number(values.status);
        const colRef = collection(db, "posts");
        await addDoc(colRef, {
            ...cloneValues,
            image,
            userId: userInfo.uid,
            // createdAt: serverTimestamp,
        });
        toast.success("Create post successfully!!!");
        reset({
            title: "",
            slug: "",
            status: 2,
            hot: false,
            image: "",
            // author: "",
        });
        // console.log(values);
        // handleUploadImage(cloneValues.image);
    };

    // const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getData() {
            const colRef = collection(db, "categories");
            const q = query(colRef, where("status", "==", 1));
            const querySnapshot = await getDocs(q);
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            // setCategories(result);
        }
        getData();
    }, []);

    return (
        <PostAddNewStyles>
            <h1 className="dashboard-heading">Add new post</h1>
            <form onSubmit={handleSubmit(addPostHandler)}>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Title</Label>
                        <Input
                            control={control}
                            placeholder="Enter your title"
                            name="title"
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input
                            control={control}
                            placeholder="Enter your slug"
                            name="slug"
                        ></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Image</Label>
                        <ImageUpload
                            onChange={onSelectImage}
                            handleDeleteImage={handleDeleteImage}
                            progress={progress}
                            image={image}
                        ></ImageUpload>
                    </Field>
                    <Field>
                        <Label>Status</Label>
                        <div className="flex items-center gap-x-5">
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.APPROVED
                                }
                                onClick={() =>
                                    setValue("status", postStatus.APPROVED)
                                }
                                value={postStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.PENDING
                                }
                                onClick={() =>
                                    setValue("status", postStatus.PENDING)
                                }
                                value={postStatus.PENDING}
                            >
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={
                                    Number(watchStatus) === postStatus.REJECTED
                                }
                                onClick={() =>
                                    setValue("status", postStatus.REJECTED)
                                }
                                value={postStatus.REJECTED}
                            >
                                Reject
                            </Radio>
                        </div>
                    </Field>

                    <Field>
                        <Label>Author</Label>
                        <Input
                            control={control}
                            placeholder="Find the author"
                        ></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Feature post</Label>
                        <Toggle
                            on={watchHot === true}
                            onClick={() => setValue("hot", !watchHot)}
                        ></Toggle>
                    </Field>
                </div>
                <Button type="submit" className="mx-auto">
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
};

export default PostAddNew;
