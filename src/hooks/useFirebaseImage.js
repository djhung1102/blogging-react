import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
const storage = getStorage();

export default function useFirebaseImage(setValue, getValues) {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState("");
    if (!setValue || !getValues) return;
    const handleUploadImage = (file) => {
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progressPercent =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progressPercent);
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        console.log("Nothing at all");
                }
            },
            (error) => {
                console.log("Error");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImage(downloadURL);
                });
            }
        );
    };
    const onSelectImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setValue("image_name", file.name);
        handleUploadImage(file);
    };
    const handleDeleteImage = () => {
        const imageRef = ref(storage, "images/" + getValues("image_name"));
        deleteObject(imageRef)
            .then(() => {
                console.log("Remove successfully");
                setImage("");
            })
            .catch((error) => {
                console.log("Can not delete image");
            });
    };
    return {
        image,
        progress,
        onSelectImage,
        handleDeleteImage,
    };
}
