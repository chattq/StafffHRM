import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Staff_LaborContract_service from "services/Staff/Staff_LaborContract_service";

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
  console.log(32, dataLabor);
  const dataTd = () => {
    return (
      <>
        {dataLabor?.map((td: Labor, index: number) => (
          <tr key={index}>
            <td>{td.ContractNo}</td>
            <td>{td.SignDate}</td>
            <td>{td.mct_ContractTypeName}</td>
            <td>{td.EffectiveDate}</td>
            <td>{td.ExpirationDate}</td>
            <td>{td.ContractDetail}</td>
            {td.ContractFileUrl === null ? (
              <td></td>
            ) : (
              <td>
                <a href={td.ContractFileUrl} style={{ display: "flex" }}>
                  <div style={{ marginRight: "10px" }}>
                    <FaDownload />
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
          title={""}
        />
      </div>
    </>
  );
}
