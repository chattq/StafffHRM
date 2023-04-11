import EditComponent from "components/EditCell/EditCellComponent";
import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Staff_WorkExperience_service from "services/Staff/Staff_WorkExperience_service";
import { v4 as uuid } from "uuid";
import StaffExpEdit from "./StaffExpEdit";

interface Exp {
  DateForm?: string;
  DateTo?: string;
  Company?: string;
  Position?: string;
  WorkExperience?: string;
}

export default function StaffExp() {
  const { staffCode } = useParams();
  const [dataExp, setDataExp] = useState([]);
  const [flag, setFlag] = useState("");
  const [id, setId] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);

  const fetchDataExp = async () => {
    const resp = await Staff_WorkExperience_service.GetByStaffCode(
      staffCode as string
    );
    setDataExp(resp.Data);
    return resp;
  };
  useEffect(() => {
    fetchDataExp();
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
          <StaffExpEdit
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
                  Thêm quá trình
                </span>
              </div>
            }
            onSuccess={fetchDataExp}
          />
        )}
      </>
    );
  };

  const dataThEXP = () => {
    return (
      <>
        {dataExp?.map((td: Exp, index: number) => (
          <tr key={index}>
            {checkEdit && (
              <td>
                <StaffExpEdit
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
                  onSuccess={fetchDataExp}
                />
              </td>
            )}
            <td>{td.DateTo}</td>
            <td>{td.DateForm}</td>
            <td>{td.Company}</td>
            <td>{td.Position}</td>
            {td.WorkExperience === null ? (
              <td>---</td>
            ) : (
              <td>{td.WorkExperience}</td>
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
          "Từ ngày",
          "Đến ngày",
          "Công ty",
          "Vị trí",
          "Kinh nghiệm làm việc",
        ]}
        inforLabor={dataThEXP()}
        data={dataExp}
        setId={setId}
        buttonModal={buttonModal()}
      />
    </div>
  );
}
