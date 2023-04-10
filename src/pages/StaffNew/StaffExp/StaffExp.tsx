import EditComponent from "components/EditCell/EditCellComponent";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Staff_WorkExperience_service from "services/Staff/Staff_WorkExperience_service";

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
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const dataThEXP = () => {
    return (
      <>
        {dataExp?.map((td: Exp, index: number) => (
          <tr key={index}>
            {checkEdit && (
              <td>
                <ModalStaffEdit
                  button={<EditComponent />}
                  onSuccess={""}
                  key={""}
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
      />
    </div>
  );
}
