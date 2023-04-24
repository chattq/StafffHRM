import { useLocalization } from "hooks/useLocalization";
import React, { useState } from "react";
import CourseDetailInfor from "./CourseDetailInfor";
import { useDispatch } from "react-redux";
import { setCheckEdit, setCheckModal } from "store/reducers/ui";
import { useSelector } from "react-redux";
import CourseContent from "../CourseContent/CourseContent";
import Train_Course_service from "services/Course/Train_Course/Train_Course_service";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ShowError } from "components/Dialogs/Dialogs";
import store from "store/store";

export default function CourseDetail() {
  const _l = useLocalization("Staff_Reward");
  const [categoryForm, setCategoryForm] = useState("");
  const dispatch = useDispatch();
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const { codeCourse } = useParams();
  const _t = useLocalization("toast");
  const nav = useNavigate();
  const { OrgId } = store.getState().orgInfo;

  const handleChangeEdit = () => {
    setCategoryForm("plaintext");
    dispatch(setCheckEdit(true));
    dispatch(setCheckModal(true));
  };
  const handleCancer = () => {
    setCategoryForm("");
    dispatch(setCheckEdit(false));
  };
  const handleDeleteCourse = async () => {
    const resp = await Train_Course_service.remove(codeCourse as string);
    if (resp.Success) {
      toast.success(_t("Delete success !"));
      nav(`/${OrgId}/Course/Manager_course`);
    } else {
      ShowError(resp.ErrorData);
    }
  };
  return (
    <div
      style={{
        background: "#f5f7f9",
        width: "100%",
        overflow: "scroll",
        height: "95vh",
      }}>
      <div
        style={{
          display: "flex",
          background: "#fff",
          height: "60px",
          padding: "0 30px",
          paddingLeft: "50px",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>{_l("Đào tạo")}</div>
          <div style={{ padding: "0 15px" }}>{">"}</div>
          <div style={{ color: "black", fontWeight: "600" }}>
            {_l("Chi tiết khóa học")}
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {checkEdit ? (
            <div style={{ display: "flex", gap: "20px" }}>
              <div
                style={{
                  border: "1px solid green",
                  padding: "5px 15px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  background: "green",
                  color: "white",
                  fontWeight: "600",
                }}>
                {_l("Cập nhật")}
              </div>
              <div
                style={{
                  border: "1px solid",
                  padding: "5px 15px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  background: "#fff6f6",
                  color: "black",
                  fontWeight: "600",
                }}
                onClick={handleDeleteCourse}>
                {_l("Xóa")}
              </div>
            </div>
          ) : null}
          <div
            style={{
              border: "1px solid",
              padding: "5px 15px",
              cursor: "pointer",
              borderRadius: "5px",
              background: "#fff6f6",
              color: "black",
              fontWeight: "600",
            }}>
            {_l("Câu hỏi kiểm tra")}
          </div>
          {checkEdit ? (
            <div
              style={{
                border: "1px solid",
                padding: "5px 15px",
                cursor: "pointer",
                borderRadius: "5px",
                background: "#fff6f6",
                color: "black",
                fontWeight: "600",
              }}
              onClick={handleCancer}>
              {_l("Hủy")}
            </div>
          ) : (
            <div
              style={{
                border: "2px solid",
                padding: "5px 15px",
                cursor: "pointer",
                borderRadius: "5px",
                background: "#fff6f6",
                color: "black",
                fontWeight: "600",
              }}
              onClick={handleChangeEdit}>
              {_l("Chỉnh sửa")}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          marginTop: "10px",
          padding: "25px 30px 25px 30px",
        }}>
        <CourseDetailInfor categoryForm={categoryForm} />
      </div>
      <div
        style={{
          background: "#fff",
          marginTop: "10px",
          padding: "25px 0 25px 0",
        }}>
        <CourseContent />
      </div>
    </div>
  );
}
