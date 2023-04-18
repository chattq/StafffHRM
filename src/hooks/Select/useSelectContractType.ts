import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import store from "store/store";
import { ShowError } from "components/Dialogs/Dialogs";
import { setListContractType } from "store/reducers/selectApi";
import department_service from "services/Admin/department_service";
import Staff_laborContract_service from "services/Staff/Staff_LaborContract_service";

const useSelectListContractType = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const select = store.getState().selectApiSlice.listContractType;
  const fetch = async () => {
    const resp = await Staff_laborContract_service.getAllActiveContractType();
    if (resp.Success) {
      dispatch(setListContractType(resp.Data));
      setLoading(uuid());
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    render();
  }, [loading, select]);

  const render = () => {
    if (select.length) {
      return select;
    } else {
      fetch();
    }
  };
  return select;
  // return list;
};

export default useSelectListContractType;
