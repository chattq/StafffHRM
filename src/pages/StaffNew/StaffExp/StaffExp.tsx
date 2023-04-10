import EditComponent from "components/EditCell/EditCellComponent";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Staff_WorkExperience_service from "services/Staff/Staff_WorkExperience_service";
import { v4 as uuid } from "uuid";

interface Exp {
  DateForm?: string;
  DateTo?: string;
  Company?: string;
  Position?: string;
  WorkExperience?: string;
}

export default function StaffExp() {
  const { staffCode } = useParams();
  const [flag, setFlag] = useState("");
  const [dataExp, setDataExp] = useState([]);
  const [id, setId] = useState("");
  const [dataEdit, setDataEdit] = useState([]);

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
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const dataThEXP = () => {
    return (
      <>
        {dataExp?.map((td: Exp, index: number) => (
          <tr key={index}>
            {checkEdit && (
              <td>
                <ModalStaffEdit
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

  const ModalBody = () => {};
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
        title={"Thêm quá trình"}
        loading={fetchDataExp}
        setFlag={setFlag}
        setId={setId}
      />
    </div>
  );
}
