import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Train_Course_service from "services/Course/Train_Course/Train_Course_service";

interface Train {
  LearnStartDTimeUTC?: string;
  LearnEndDTimeUTC?: string;
  TrCsName?: string;
  TrainType?: string;
  LrCrStatus?: string;
  TrCsCodeSys?: string;
}

export default function StaffTrain() {
  const { staffCode } = useParams();

  const [dataTrain, setDataTrain] = useState([]);
  const fetchDataLabor = async () => {
    const resp = await Train_Course_service.GetByStaffCode(staffCode as string);
    if ((resp.Success = true)) {
      setDataTrain(resp.Data?.Lst_Train_Course?.DataList);
    }
    return resp;
  };
  useEffect(() => {
    fetchDataLabor();
  }, []);
  console.log(17, dataTrain);
  const dataThTrain = () => {
    return (
      <>
        {dataTrain?.map((td: Train, index: number) => (
          <tr key={index}>
            {/* <td>{td.DecisionNo}</td>
            <td>{td.ApprovalDate}</td>
            <td>{td.AppointGroup}</td>
            <td>{td.ApprovalPosition}</td>
            <td>{td.Remark}</td> */}
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
          "Tên khóa",
          "Trạng thái",
          "Loại",
          "Rank",
        ]}
        inforLabor={dataThTrain()}
        data={dataTrain}
        title={"Thêm quá trình"}
      />
    </div>
  );
}
