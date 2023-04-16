import { ShowError } from "components/Dialogs/Dialogs";
import SideBarUser from "components/StafffNewDesign/SideBarUser";
import { MoreInterface } from "components/interface";
import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "rsuite";
import staff_service from "services/Staff/staff_service";
import { setCheckEdit, setData } from "store/reducers/ui";
import StaffInforEdit from "./StaffInforEdit";
import { useSelector } from "react-redux";
import MoreComponentStaff from "components/StafffNewDesign/MoreComponentStaff";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";

export default function StaffInfor() {
  const _m = useLocalization("More");
  const NetWorkID: string = `${import.meta.env.VITE_NETWORK_FIX}`;
  const { staffCode } = useParams<string>();
  const [dataStaff, setDataStaff] = useState([]);
  const [dataStaffDPM, setDataStaffDPM] = useState([]);
  const dispatch = useDispatch();
  const dataEdit = useSelector((state: any) => state.ui.data);

  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const fetchData = async () => {
    const resp = await staff_service.getByStaffCode(staffCode as string);
    setDataStaff(resp.Data?.Staff_Staff);
    setDataStaffDPM(resp.Data?.Staff_MapDepartment);
    dispatch(setData(resp.Data));
    return resp;
  };
  const [check, setCheck] = useState(true);
  const handleChangeEdit = () => {
    setCheck(false);
    dispatch(setCheckEdit(true));
  };

  const handleOff = () => {};

  // useEffect(() => {
  //   fetchData();
  // }, [dataEdit]);
  useEffect(() => {
    fetchData();
    dispatch(setCheckEdit(false));
  }, []);
  return (
    <>
      {dataStaff === undefined ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          Không có dữ liệu
        </div>
      ) : (
        <div style={{ width: "100%", background: "#f6f6f6" }}>
          <div
            style={{
              height: "60px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 30px 0 30px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}>
            <div>
              <Link to={`/${NetWorkID}/StaffNew`} style={{ color: "gray" }}>
                Danh sách nhân viên
              </Link>
              <span style={{ margin: "0 10px 0 10px" }}>/</span>
              <Link to={"/"} style={{ color: "black" }}>
                {check ? "Chi tiết nhân viên" : "Chỉnh sửa thông tin nhân viên"}
              </Link>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {checkEdit ? null : (
                <Button onClick={handleChangeEdit}>Chỉnh sửa</Button>
              )}
              <MoreComponentStaff />
            </div>
          </div>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              overflow: "scroll",
              height: "100vh",
            }}>
            <div>
              <SideBarUser dataStaff={dataStaff} dataStaffDPM={dataStaffDPM} />
            </div>
            <div style={{ marginLeft: "8px", width: "100%", height: "136vh" }}>
              <div
                style={{
                  backgroundColor: "white",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 30px 0 30px",
                }}>
                <NavLink
                  to={`/StaffNew/${staffCode}/chitiet`}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textTransform: "uppercase",
                          color: "green",
                          fontWeight: "600",
                        }
                      : {
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "600",
                        }
                  }>
                  Thông Tin Chung
                </NavLink>
                <NavLink
                  to={`/StaffNew/${staffCode}/labor`}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textTransform: "uppercase",
                          color: "green",
                          fontWeight: "600",
                        }
                      : {
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "600",
                        }
                  }>
                  Hợp đồng lao động
                </NavLink>
                <NavLink
                  to={`/StaffNew/${staffCode}/appoint`}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textTransform: "uppercase",
                          color: "green",
                          fontWeight: "600",
                        }
                      : {
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "600",
                        }
                  }>
                  Quá trình điều động/Bổ nhiệm
                </NavLink>
                <NavLink
                  to={`/StaffNew/${staffCode}/Train`}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textTransform: "uppercase",
                          color: "green",
                          fontWeight: "600",
                        }
                      : {
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "600",
                        }
                  }>
                  Quá trình đào tạo
                </NavLink>
                <NavLink
                  to={`/StaffNew/${staffCode}/Experience`}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textTransform: "uppercase",
                          color: "green",
                          fontWeight: "600",
                        }
                      : {
                          textTransform: "uppercase",
                          color: "black",
                          fontWeight: "600",
                        }
                  }>
                  Kinh nghiệm làm việc
                </NavLink>
              </div>
              <div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
