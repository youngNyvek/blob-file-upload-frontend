import React, { useRef } from "react";
import "./App.css";

const App = () => {
  const testeRef = useRef();

  const getFileExtension = fileType => {
    return fileType.split("/")[1];
  };

  const createFormData = async () => {
    const formData = new FormData();

    for (let file of testeRef.current.files) {
      const fileExtension = getFileExtension(file.type);

      const changeName = new File([file], `changedname.${fileExtension}`, {
        type: file.type
      });

      formData.append("file", changeName);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        ref={testeRef}
        onChange={() => console.log(Array.from(testeRef.current.files))}
      />

      <button onClick={createFormData}>Enviar arquivos</button>
    </div>
  );
};

export default App;
