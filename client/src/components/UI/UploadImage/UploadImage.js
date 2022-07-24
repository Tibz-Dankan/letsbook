import axios from "axios";
import React, { Fragment, useState } from "react";
import { baseUrl } from "../../../store/appStore";
import styles from "./UploadImage.module.scss";
import { useSelector } from "react-redux";

const UploadImage = () => {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const token = useSelector((state) => state.auth.token);

  //   TODO: image validation (size and type)
  const handleImageChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    console.log(img);
    setImage(img);
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    const response = await axios.post(`${baseUrl}/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    console.log(response);
    if (response) setStatus(response.statusText);
  };

  return (
    <Fragment>
      <div className={styles["image__container"]}>
        <h1>Upload Image to the server</h1>
        {image.preview && (
          <img src={image.preview} width="100" height="100" alt="our image" />
        )}
        <hr></hr> {/*Image to be uploaded*/}
        <form onSubmit={(event) => handleImageSubmit(event)}>
          <input
            type="file"
            name="file"
            onChange={(event) => handleImageChange(event)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {status && <h4>{status}</h4>}
      </div>
    </Fragment>
  );
};

export default UploadImage;
