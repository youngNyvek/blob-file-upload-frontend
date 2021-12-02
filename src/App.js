import React, { useRef } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const testeRef = useRef();

  const axiosTeste = async () => {
    const formData = new FormData();

    for (let file of testeRef.current.files) {
      const splitName = file.name.split(".")[1];

      const fileExtension = splitName[splitName.length - 1];

      const changeName = new File([file], `changedname.${fileExtension}`, {
        type: file.type
      });

      formData.append("file", changeName);
    }

    await axios.post("http://localhost:3807/api/fileupload/upload", formData);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        ref={testeRef}
        onChange={() => console.log(Array.from(testeRef.current.files))}
      />

      <button onClick={axiosTeste}>Anexar arquivos</button>
    </div>
  );
};

export default App;
