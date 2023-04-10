import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Staff_Appoint_service from "services/Staff/Staff_Appoint_service";

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

  const [dataAppoint, setDataAppoint] = useState([]);
  const fetchDataAppoint = async () => {
    const resp = await Staff_Appoint_service.getByCode(staffCode as string);
    setDataAppoint(resp.Data.Lst_Staff_Appoint);
    return resp;
  };
  useEffect(() => {
    fetchDataAppoint();
  }, []);
  const dataThApp = () => {
    return (
      <>
        {dataAppoint?.map((td: App, index: number) => (
          <tr key={index}>
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
                  <div style={{ marginRight: "10px" }}>
                    <FaDownload />
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
        title={""}
      />
    </div>
  );
}
