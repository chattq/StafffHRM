import * as api from "../helper";

const UploadFile = async (data: any) => {
  return await api.postFile("File/UploadFile", { data });
};
export default {
  UploadFile,
};
