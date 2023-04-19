import EditComponent from "components/EditCell/EditCellComponent";
import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Staff_LaborContract_service from "services/Staff/Staff_LaborContract_service";
import StaffLaborContractEdit from "./StaffLaborContractEdit";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { convertDate } from "utils/date";
import { getNameFile } from "components/StafffNewDesign/IconUploadFIleStaff";

interface Labor {
  ContractNo?: string;
  SignDate?: string;
  mct_ContractTypeName?: string;
  EffectiveDate?: string;
  ContractDetail?: string;
  ExpirationDate?: string;
  ContractFileName?: string;
  ContractFileUrl?: string;
}

export default function StaffLaborContract() {
  const { staffCode } = useParams();
  const [flag, setFlag] = useState("");

  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const [dataEdit, setDataEdit] = useState([]);
  const [id, setId] = useState("");

  const [dataLabor, setDataLabor] = useState([]);
  const fetchDataLabor = async () => {
    const resp = await Staff_LaborContract_service.getByStaffCode(
      staffCode as string
    );
    setDataLabor(resp.Data.Lst_Staff_LaborContract);
    return resp;
  };
  useEffect(() => {
    fetchDataLabor();
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
  const dataTd = () => {
    return (
      <>
        {dataLabor?.map((td: Labor, index: number) => (
          <tr key={index}>
            {checkEdit && (
              <td>
                <StaffLaborContractEdit
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
                  onSuccess={fetchDataLabor}
                />
              </td>
            )}
            <td>{td.ContractNo}</td>
            <td>{td.SignDate}</td>
            <td>{td.mct_ContractTypeName}</td>
            <td>{convertDate(td.EffectiveDate)}</td>
            <td>{convertDate(td.ExpirationDate)}</td>
            <td>{td.ContractDetail}</td>
            {td.ContractFileUrl === null ? (
              <td></td>
            ) : (
              <td>
                <a href={td.ContractFileUrl} style={{ display: "flex" }}>
                  <div style={{ marginRight: "10px", height: "20px" }}>
                    <img
                      src={getNameFile(td.ContractFileName)}
                      alt={td.ContractFileName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  {td.ContractFileName}
                </a>
              </td>
            )}
          </tr>
        ))}
      </>
    );
  };
  const buttonModal = () => {
    return (
      <>
        {checkEdit && (
          <StaffLaborContractEdit
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
                  Thêm hợp đồng
                </span>
              </div>
            }
            onSuccess={fetchDataLabor}
          />
        )}
      </>
    );
  };

  return (
    <>
      <div style={{ background: "white", marginTop: "8px" }}>
        <TableLabor
          dataHeader={[
            "Số hợp đồng",
            "Ngày ký",
            "Loại hợp đồng",
            "Ngày hiệu lực",
            "Ngày hết hạn",
            "Chi tiết hợp đồng",
            "Hợp đồng",
          ]}
          inforLabor={dataTd()}
          data={dataLabor}
          setId={setId}
          buttonModal={buttonModal()}
        />
      </div>
    </>
  );
}
