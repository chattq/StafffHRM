import * as api from "../helper";

const UploadFile = async (data: any) => {
  console.log(4, data);
  return await api.postFile("File/UploadFile", { data });
};
export default {
  UploadFile,
};
