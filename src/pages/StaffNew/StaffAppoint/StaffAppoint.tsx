import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Staff_Appoint_service from "services/Staff/Staff_Appoint_service";
import StaffAppointEdit from "./StaffAppointEdit";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import EditComponent from "components/EditCell/EditCellComponent";
import { getNameFile } from "components/StafffNewDesign/IconUploadFIleStaff";

interface App {
  DecisionNo?: string;
  ApprovalDate?: string;
  ApprovalPosition?: string;
  Remark?: string;
  AppointFileName?: string;
  AppointFileUrl?: string;
  AppointGroup?: string;
}
export default function StaffAppoint() {
  const { staffCode } = useParams();
  const [flag, setFlag] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const [id, setId] = useState("");
  const [dataAppoint, setDataAppoint] = useState([]);
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const fetchDataAppoint = async () => {
    const resp = await Staff_Appoint_service.getByCode(staffCode as string);
    setDataAppoint(resp.Data.Lst_Staff_Appoint);
    return resp;
  };
  useEffect(() => {
    fetchDataAppoint();
  }, []);

  const handleEdit = (data: any) => {
    setFlag("detail");
    setDataEdit(data);
    setId(uuid());
  };

  const handleDeleteSingle = (data: any) => {
    setFlag("delete");
    setDataEdit(data);
    setId(uuid());
  };
  const handleAdd = () => {
    setFlag("update");
    setId(uuid());
  };
  const buttonModal = () => {
    return (
      <>
        {checkEdit && (
          <StaffAppointEdit
            button={
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "16px 30px",
                }}
                onClick={handleAdd}>
                <span
                  style={{
                    padding: "5px 15px",
                    borderRadius: "4px",
                    border: "1px solid",
                    color: "black",
                    cursor: "pointer",
                    background: "#eaeaea",
                  }}>
                  Thêm điều động
                </span>
              </div>
            }
            onSuccess={fetchDataAppoint}
          />
        )}
      </>
    );
  };

  const dataThApp = () => {
    return (
      <>
        {dataAppoint?.map((td: App, index: number) => (
          <tr key={index}>
            {checkEdit && (
              <td>
                <StaffAppointEdit
                  button={
                    <EditComponent
                      handleEdit={handleEdit}
                      data={dataEdit}
                      handleDeleteSingle={handleDeleteSingle}
                    />
                  }
                  data={td}
                  flag={flag}
                  uuid={id}
                  onSuccess={fetchDataAppoint}
                />
              </td>
            )}
            <td>{td.DecisionNo}</td>
            <td>{td.ApprovalDate}</td>
            <td>{td.AppointGroup}</td>
            <td>{td.ApprovalPosition}</td>
            <td>{td.Remark}</td>
            {td.AppointFileUrl === null ? (
              <td></td>
            ) : (
              <td>
                <a href={td.AppointFileUrl} style={{ display: "flex" }}>
                  <div style={{ marginRight: "10px", height: "20px" }}>
                    <img
                      src={getNameFile(td.AppointFileName)}
                      alt={td.AppointFileName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  {td.AppointFileName}
                </a>
              </td>
            )}
          </tr>
        ))}
      </>
    );
  };
  return (
    <div>
      <TableLabor
        dataHeader={[
          "Số quyết định",
          "Ngày điều động/bổ nhiệm",
          "Phòng ban",
          "Chức danh",
          "Ghi chú",
          "File đính kèm",
        ]}
        inforLabor={dataThApp()}
        data={dataAppoint}
        setId={setId}
        buttonModal={buttonModal()}
      />
    </div>
  );
}
