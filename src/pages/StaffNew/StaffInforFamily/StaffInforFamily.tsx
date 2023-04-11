import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Mst_RelativeInfo_service from "services/Staff/Mst_RelativeInfo_service";

import EditComponent from "components/EditCell/EditCellComponent";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import StaffInforFamilyEdit from "./StaffInforFamilyEdit";

interface Family {
  DateOfBirth?: string;
  Relationship?: string;
  FullName?: string;
  Career?: string;
}
export default function StaffInforFamily() {
  const { staffCode } = useParams();
  const [dataFamily, setDataFamily] = useState([]);
  const [flag, setFlag] = useState("");
  const [id, setId] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);

  const fetchDataFamily = async () => {
    const resp = await Mst_RelativeInfo_service.GetByStaffCode(
      staffCode as string
    );
    setDataFamily(resp.Data.Lst_Mst_RelativeInfo);
    return resp;
  };
  useEffect(() => {
    fetchDataFamily();
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

  const dataThFamily = () => {
    return (
      <>
        {dataFamily?.map((td: Family, index: number) => (
          <tr key={index}>
            {checkEdit && (
              <td>
                <StaffInforFamilyEdit
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
                  onSuccess={fetchDataFamily}
                />
              </td>
            )}
            <td>{index + 1}</td>
            <td>{td.Relationship}</td>
            <td>{td.FullName}</td>
            <td>{td.DateOfBirth}</td>
            <td>{td.Career}</td>
          </tr>
        ))}
      </>
    );
  };
  return (
    <>
      <div
        style={{
          background: "white",
          marginTop: "8px",
          padding: "20px 30px 20px 30px",
        }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              height: "30px",
              width: "30px",
              background: "green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}>
            <FaUsers style={{ color: "white" }} />
          </div>
          <span
            style={{ color: "black", fontWeight: "600", marginLeft: "15px" }}>
            Thông tin người thân
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <TableLabor
            dataHeader={[
              "STT",
              "Quan hệ",
              "Họ và tên",
              "Ngày Sinh",
              "Nghề nghiệp",
            ]}
            inforLabor={dataThFamily()}
            data={dataFamily}
            setId={setId}
          />
        </div>
      </div>
    </>
  );
}
