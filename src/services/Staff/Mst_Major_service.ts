import * as api from "./../helper";

const GetAllActive = async () => {
  return await api.post("Mst_Major/GetAllActive", {});
};

export default {
  GetAllActive,
};
