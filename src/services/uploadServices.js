import axios from "axios";

export const axiosTeste = async formData => {
  await axios.post("http://localhost:3807/api/fileupload/upload", formData);
};
