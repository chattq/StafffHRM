import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalStaffEdit from "./ModalStaffEdit";
import EditComponent from "components/EditCell/EditCellComponent";
import { v4 as uuid } from "uuid";

export default function TableLabor({
  dataHeader,
  inforLabor,
  data,
  title,
  loading,
  setFlag,
  setId,
}: {
  dataHeader?: any;
  inforLabor?: any;
  data?: any;
  title?: any;
  loading?: any;
  setFlag?: any;
  setId?: any;
}) {
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const handleAdd = () => {
    setFlag("update");
    setId(uuid());
  };
  return (
    <div style={{ background: "white", height: "100vh", marginTop: "8px" }}>
      {checkEdit && (
        <ModalStaffEdit
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
                {title}
              </span>
            </div>
          }
          onSuccess={loading}
        />
      )}
      <Table striped>
        <thead>
          <tr>
            {checkEdit && <th>Actions</th>}
            {dataHeader?.map((th: string, index: number) => (
              <th key={index}>{th}</th>
            ))}
          </tr>
        </thead>
        {data !== null ? <tbody>{inforLabor}</tbody> : null}
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}>
        {data == (undefined || null) && <div>Không có dữ liệu</div>}
      </div>
    </div>
  );
}
