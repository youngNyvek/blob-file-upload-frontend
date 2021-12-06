import React, { useState, useEffect } from "react";
import { uploadFile } from "../../../services/uploadServices";
import { useDropzone } from "react-dropzone";

const InputFile = () => {
  const [files, setFiles] = useState([]);
  const userName = "Kevin Faria";

  const onDrop = acceptedFiles => {
    const addPreview = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );

    setFiles([...files, ...addPreview]);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: "image/*",
    maxFiles: 5,
    multiple: true,
    onDrop
  });

  const removeFile = fileIndex => () => {
    const newFiles = [...files];
    newFiles.splice(fileIndex, 1);
    setFiles(newFiles);
  };

  const createFormData = async () => {
    const formData = new FormData();
    const formatName = fileName => {
      const fileExt = /(?:\.([^.]+))?$/.exec(fileName)[1];
      const userNameWithoutSpace = userName.split(" ").join("");
      const fullDateOfUpload = new Date();

      return `${userNameWithoutSpace}_${fullDateOfUpload.toISOString()}.${fileExt}`;
    };

    files.forEach(image => {
      const processName = formatName(image.name);

      const changeName = new File([image], processName, {
        type: image.type
      });

      formData.append("file", changeName);
    });

    uploadFile(formData).then(() => {
      alert("Upload realizado com sucesso!!");
    });
  };

  useEffect(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    console.log(files);
  }, [files]);

  return (
    <div className="inputContainer">
      <div
        {...getRootProps({
          className: `dropzone ${isDragActive && "dragActive"} ${isDragReject && "dragReject"}`
        })}
      >
        <input {...getInputProps()} />
        <p> Clique ou arraste as fotos</p>
      </div>
      <div style={{ display: "flex" }}>
        {files.map((file, index) => (
          <div
            key={file.preview}
            style={{ position: "relative", cursor: "pointer " }}
            onClick={removeFile(index)}
          >
            <span className="removeImage">REMOVER</span>
            <img src={file.preview} />
          </div>
        ))}
      </div>
      <button onClick={createFormData}>Enviar imagens</button>
    </div>
  );
};

export default InputFile;
