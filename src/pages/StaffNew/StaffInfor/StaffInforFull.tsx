import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Mst_RelativeInfo_service from "services/Staff/Mst_RelativeInfo_service";
import StaffInforFamily from "../StaffInforFamily/StaffInforFamily";

export default function StaffInforFull() {
  const data = useSelector((state: any) => state.ui.data);

  return (
    <>
      {/* thông tin cá nhân */}
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
            <FaUser style={{ color: "white" }} />
          </div>
          <span
            style={{ color: "black", fontWeight: "600", marginLeft: "15px" }}>
            Thông tin cá nhân
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
          }}>
          <div style={{ display: "flex", width: "43%" }}>
            <div>
              <p>Mã nhân viên</p>
              <p>Họ và tên</p>
              <p>Loại</p>
              <p>Phòng ban</p>
              <p>Ghi chú</p>
              <p>OrgID</p>
              <p>TK công ty</p>
              <p>Bắt đầu</p>
              <p>Nghỉ việc</p>
              <p>Trạng Thái</p>
            </div>
            <div className="name_staff_new" style={{ marginLeft: "40px" }}>
              {/* mã nhân viên */}
              {data?.Staff_Staff?.StaffCode === null ? (
                <p>{`---`}</p>
              ) : (
                <p>{data?.Staff_Staff?.StaffCode}</p>
              )}
              {/* tên nhân viên */}
              {data?.Staff_Staff?.StaffFullName === null ? (
                <p>{data?.Staff_Staff?.StaffName}</p>
              ) : (
                <p>{data?.Staff_Staff?.StaffFullName}</p>
              )}
              {/* hình thức làm việc */}
              {data?.Staff_Staff?.ms_StaffTypeName === null ? (
                <p>{`---`}</p>
              ) : (
                <p>{data?.Staff_Staff?.ms_StaffTypeName}</p>
              )}
              {/* phòng ban */}
              {data?.Staff_MapDepartment?.length > 1 ? (
                <p>{`Nhiều phòng ban (${data?.Staff_MapDepartment?.length})`}</p>
              ) : data?.Staff_MapDepartment?.length === 0 ? (
                <p>---</p>
              ) : (
                data?.Staff_MapDepartment?.map((item: any, index: number) => {
                  if (item?.md_DepartmentName !== null) {
                    return <p key={index}>{item?.md_DepartmentName}</p>;
                  } else {
                    return <p key={index}>---</p>;
                  }
                })
              )}

              {/* mẫ cty */}
              {data?.Staff_Staff?.Remark === null ? (
                <p>{`---`}</p>
              ) : (
                <p>{data?.Staff_Staff?.Remark}</p>
              )}
              {/* mẫ cty */}
              {data?.Staff_Staff?.OrgID === null ? (
                <p>{`---`}</p>
              ) : (
                <p>{data?.Staff_Staff?.OrgID}</p>
              )}

              {/* tài khoản công ty */}
              {data?.Staff_Staff?.UserID === null ? (
                <p>{`---`}</p>
              ) : (
                <p>{data?.Staff_Staff?.UserID}</p>
              )}
              {/* thời gian bắt đầu */}
              {data?.Staff_Staff?.WorkingStartDate === null ? (
                <p>{`---`}</p>
              ) : (
                <p>{data?.Staff_Staff?.WorkingStartDate}</p>
              )}
              {/* nghỉ việc */}
              {data?.Staff_Staff?.WorkingEndDate === null ? (
                <p>{`---`}</p>
              ) : (
                <p>{data?.Staff_Staff?.WorkingEndDate}</p>
              )}
              {data?.Staff_Staff?.StaffStatus === "ACTIVE" ? (
                <p>{"Đang làm việc"}</p>
              ) : (
                <p>{"Đã nghỉ việc"}</p>
              )}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <p>Điện thoại</p>
              <p>Email</p>
              <p>DOB</p>
              <p>Giới tính</p>
              <p>Nơi sinh</p>
              <p>Địa chỉ thường trú</p>
              <p>Số giấy tờ</p>
              <p>Ngày cấp</p>
              <p>Nơi Cấp</p>
            </div>
            <div className="name_staff_new" style={{ marginLeft: "40px" }}>
              {/* điện thoại */}
              {data?.Staff_Staff?.StaffPhone === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.StaffPhone}</p>
              )}
              {/* email */}
              {data?.Staff_Staff?.StaffEmail === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.StaffEmail}</p>
              )}
              {/* giới tính */}
              {data?.Staff_Staff?.DBO === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.DBO}</p>
              )}
              {/* giới tính */}
              {data?.Staff_Staff?.Gender === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.Gender}</p>
              )}
              {/* nơi sinh */}
              {data?.Staff_Staff?.BirthPlace === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.BirthPlace}</p>
              )}
              {/* điaị chỉ */}
              {data?.Staff_Staff?.PermanentAddress === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.PermanentAddress}</p>
              )}
              {/* số giấy tờ */}
              {data?.Staff_Staff?.IDCardNumber === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.IDCardNumber}</p>
              )}
              {/* ngày cấp */}
              {data?.Staff_Staff?.DateOfIssue === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.DateOfIssue}</p>
              )}
              {/* nơi cấp */}
              {data?.Staff_Staff?.PlaceOfIssue === null ? (
                <p>---</p>
              ) : (
                <p>{data?.Staff_Staff?.PlaceOfIssue}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* thông tin gia đình */}
      <StaffInforFamily />
    </>
  );
}
