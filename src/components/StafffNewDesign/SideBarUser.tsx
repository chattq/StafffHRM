import Avatar from "components/Avatar";
import { useLocalization } from "hooks/useLocalization";
import React from "react";
import {
  FaLocationArrow,
  FaMailBulk,
  FaMailchimp,
  FaPhone,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import InputUploadIMG from "./InputUploadIMG";

export default function SideBarUser({
  dataStaff,
  dataStaffDPM,
}: {
  dataStaff: any;
  dataStaffDPM: any;
}) {
  const _l = useLocalization("StaffTable");
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  return (
    <div
      style={{
        width: "220px",
        background: "white",
        padding: "25px 20px 25px 20px",
      }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {checkEdit ? (
          <InputUploadIMG
            imgStaff={dataStaff.AvatarUrl}
            checkUpdate={checkEdit}
          />
        ) : (
          <Avatar
            style={{ height: "100px", width: "100px", fontSize: "30px" }}
            circle
            src={
              dataStaff.AvatarUrl ? dataStaff.AvatarUrl : dataStaff.AvatarUrl
            }
            text={`${
              dataStaff.AvatarUrl ? dataStaff.AvatarUrl : dataStaff.StaffName
            }`}
          />
        )}
      </div>
      <h3 style={{ textAlign: "center", fontSize: "16px", padding: "5px 0" }}>
        {dataStaff.StaffFullName}
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}>
        {dataStaff.StaffStatus === "ACTIVE" ? (
          <span
            style={{
              padding: "6px 10px 6px 10px",
              background: "green",
              color: "white",
              borderRadius: "6px",
              fontWeight: "600",
            }}>
            {_l("Đang làm việc")}
          </span>
        ) : (
          <span
            style={{
              padding: "6px 10px 6px 10px",
              border: "1px solid orange",
              color: "orange",
              borderRadius: "6px",
              fontWeight: "600",
            }}>
            {_l("Đã nghỉ việc")}
          </span>
        )}
      </div>
      <div
        style={{
          borderTop: "1px solid",
          borderBottom: "1px solid",
          padding: "12px 0",
          marginTop: "20px",
        }}>
        {dataStaff.StaffPhone === null ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaPhone />
            <span style={{ marginLeft: "15px" }}>Đang cập nhật</span>
          </div>
        ) : (
          <div>
            <FaPhone />
            <span style={{ marginLeft: "15px" }}>{dataStaff.StaffPhone}</span>
          </div>
        )}
        {dataStaff.StaffEmail === null ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaMailBulk />
            <span
              style={{
                marginLeft: "15px",
                marginTop: "10px",
                marginBottom: "10px",
              }}>
              Đang cập nhật
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", textAlign: "center" }}>
            <div>
              <FaMailBulk />
            </div>
            <span
              style={{
                marginLeft: "15px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {dataStaff.StaffEmail}
            </span>
          </div>
        )}
        {dataStaff.StaffAddress === null ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaLocationArrow />
            <span style={{ marginLeft: "15px" }}>Đang cập nhật</span>
          </div>
        ) : (
          <div style={{ display: "flex", textAlign: "center" }}>
            <div>
              <FaLocationArrow />
            </div>
            <span
              style={{
                marginLeft: "15px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {dataStaff.StaffAddress}
            </span>
          </div>
        )}
      </div>
      {dataStaffDPM.length === 0 ? null : (
        <div
          style={{
            borderBottom: "1px solid",
            padding: "12px 0",
          }}>
          {dataStaffDPM.map((item: any, index: any) => (
            <div key={index}>
              {item.md_DepartmentName === null ? (
                <div>
                  <div>{_l("Tên chức danh:")}</div>
                  <span
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}>
                    Đang cập nhật
                  </span>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#4b4e4fad",
                      fontWeight: "600",
                      marginBottom: "3px",
                    }}>
                    {_l("Tên chức danh:")}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      marginTop: "10px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {item.md_DepartmentName}
                  </span>
                </div>
              )}
              {item.mp_PositionName === null ? (
                <div style={{ marginTop: "10px" }}>
                  <div>{_l("Tên chức danh:")}</div>
                  <span
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}>
                    Đang cập nhật
                  </span>
                </div>
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#4b4e4fad",
                      fontWeight: "600",
                      marginBottom: "3px",
                    }}>
                    {_l("Tên chức danh:")}
                  </div>
                  <p
                    style={{
                      width: "100%",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginTop: "10px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {item.mp_PositionName}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
