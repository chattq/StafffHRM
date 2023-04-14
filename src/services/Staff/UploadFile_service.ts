import * as api from "../helper";

const UploadFile = async (data: any) => {
  return await api.postFile("File/UploadFile", {
    strJson: JSON.stringify(data),
  });
};
export default {
  UploadFile,
};
