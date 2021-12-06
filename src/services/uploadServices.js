import axios from "axios";

export const uploadFile = async formData => {
  await axios.post("http://localhost:3807/api/fileupload/upload", formData);
};

export const downloadFile = async fileName => {
  return axios.get(`http://localhost:3807/api/fileupload/download?fileName=${fileName}`, {
    responseType: "blob"
  });
};
