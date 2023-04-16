import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function TableLabor({
  dataHeader,
  inforLabor,
  data,
  buttonModal,
}: {
  dataHeader?: any;
  inforLabor?: any;
  data?: any;
  buttonModal?: any;
  setId?: any;
}) {
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);

  return (
    <div style={{ background: "white", height: "100vh", marginTop: "8px" }}>
      {buttonModal}
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
      {data === (undefined || null) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}>
          <div>Không có dữ liệu</div>
        </div>
      )}
    </div>
  );
}
