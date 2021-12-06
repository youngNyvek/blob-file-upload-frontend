import React, { useState } from "react";
import { downloadFile } from "../../../services/uploadServices";

const ViewImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const getImageFile = async () => {
    const res = await downloadFile(imageName);
    setImageUrl(URL.createObjectURL(res.data));
    setImageName("");
  };

  return (
    <div className="viewContainer">
      <img src={imageUrl} width={450} />
      <button onClick={getImageFile}>Ver</button>
      <input value={imageName} onChange={e => setImageName(e.target.value)} />
    </div>
  );
};

export default ViewImage;
