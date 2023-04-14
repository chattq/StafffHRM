import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Mst_RelativeInfo_service from "services/Staff/Mst_RelativeInfo_service";
import { setCheckEdit } from "store/reducers/ui";
import StaffInforFamily from "../StaffInforFamily/StaffInforFamily";
import StaffAdd from "../StaffAdd/StaffAdd";

interface Family {
  DateOfBirth?: string;
  Relationship?: string;
  FullName?: string;
  Career?: string;
}

export default function StaffInforEdit() {
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const dispatch = useDispatch();
  const handleCancer = () => {
    dispatch(setCheckEdit(false));
  };
  return (
    <>
      {/* thông tin cá nhân */}
      <div
        style={{
          background: "white",
          marginTop: "8px",
          padding: "20px 30px 20px 30px",
        }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <FaUser style={{ color: "white" }} />
            </div>
            <span
              style={{ color: "black", fontWeight: "600", marginLeft: "15px" }}>
              Thông tin cá nhân
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                padding: "6px 15px",
                background: "green",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
              }}>
              Cập nhật
            </span>
            <span
              style={{
                padding: "6px 15px",
                background: "#eaf0f7",
                borderRadius: "4px",
                marginLeft: "15px",
                cursor: "pointer",
              }}
              onClick={handleCancer}>
              Hủy
            </span>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <StaffAdd />
        </div>
      </div>
      {/* thông tin gia đình */}
      <StaffInforFamily />
    </>
  );
}
