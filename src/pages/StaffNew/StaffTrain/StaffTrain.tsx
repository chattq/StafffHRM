import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Train_Course_service from "services/Course/Train_Course/Train_Course_service";
import StaffTrainEdit from "./StaffTrainEdit";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import EditComponent from "components/EditCell/EditCellComponent";
import { convertDate } from "utils/date";

interface Train {
  LearnStartDTimeUTC?: string;
  LearnEndDTimeUTC?: string;
  TrCsName?: string;
  TrainType?: string;
  LrCrStatus?: string;
  RankName?: any;
}

export default function StaffTrain() {
  const { staffCode } = useParams();
  const [flag, setFlag] = useState("");
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const [dataEdit, setDataEdit] = useState([]);
  const [id, setId] = useState("");
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
  const dataThTrain = () => {
    return (
      <>
        {dataTrain?.map((td: Train, index: number) => (
          <tr key={index}>
            {checkEdit && (
              <td>
                <StaffTrainEdit
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
            <td>{convertDate(td.LearnStartDTimeUTC)}</td>
            <td>{convertDate(td.LearnStartDTimeUTC)}</td>
            <td>{td.TrCsName}</td>
            <td>{td.LrCrStatus}</td>
            <td>{td.TrainType}</td>
            <td>{td.RankName}</td>
          </tr>
        ))}
      </>
    );
  };
  const buttonModal = () => {
    return (
      <>
        {checkEdit && (
          <StaffTrainEdit
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
                  Thêm quá trình đào tạo
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
        setId={setId}
        buttonModal={buttonModal()}
      />
    </div>
  );
}
