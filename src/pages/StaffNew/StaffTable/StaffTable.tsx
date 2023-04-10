import { ShowError } from "components/Dialogs/Dialogs";
import EditComponent from "components/EditCell/EditCellComponent";
import FlagComponent from "components/FlagComponent";
import FormValidate from "components/FormValidate/FormValidate";
import HeaderComponent from "components/HeaderComponent/HeaderComponent";
import { FormItemInterface, MoreInterface } from "components/interface";
import { ColumnDataProps } from "components/table/TableDetail";
import TableStandard from "components/table/TableStandard";
import useListOrg from "hooks/Select/useListOrg";
import { useLocalization } from "hooks/useLocalization";
import { useWindowSize } from "hooks/useWindowSize";
import React, { useState, useEffect, ReactNode, useRef } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Content,
  DatePicker,
  Grid,
  TagPicker,
} from "rsuite";
import ResignReason_service from "services/Admin/ResignReason_service";
import { v4 as uuid } from "uuid";
import store from "store/store";
import ShowDetail from "components/ShowDetail";
import contract_service from "services/Admin/contract_type_service";
import contract_type_service from "services/Admin/contract_type_service";
import staff_reward from "services/Staff/staff_reward_service";
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import { convertDate } from "utils/date";
import useSelectListResignReason from "hooks/Select/useSelectListResignReason";
import staff_service from "services/Staff/staff_service";
import Avatar from "components/Avatar";
import { Link } from "react-router-dom";

type Props = {
  ReasonID: any[];
  DepartmentCode: any[];
  HistDateFrom: Date;
  HistDateTo: Date;
};

function StaffTable() {
  const formRef: any = useRef();
  const _l = useLocalization("StaffTable");
  const _t = useLocalization("toast");
  const _m = useLocalization("More");
  const _b = useLocalization("Button");
  const [keyword, setKeyword] = useState("");
  const selectListDepartment = useSelectListDepartment();
  const selectListResinReason = useSelectListResignReason();
  const windowSize = useWindowSize();
  const { OrgId } = store.getState().orgInfo;
  const [currentCode, setCurrentCode] = useState((<></>) as ReactNode);
  const [loading, setLoading] = useState("");
  const [formValidate, setFormValidate] = useState({} as Props);
  const [paramValue, setParamValue] = useState({} as any);

  // const handleAdd = () => {
  //   setCurrentCode(
  //     <Staff_Staff_Inactive_Edit uuid={uuid()} onSuccess={reloading} />
  //   );
  // };

  const reloading = () => {
    setLoading(uuid());
  };

  const columnList: ColumnDataProps[] = [
    {
      key: "__idx",
      label: _l("__idx"),
      width: 50,
      resizable: true,
    },
    {
      key: "StaffCode", // Mã nhân viên
      label: _l("StaffCode"),
      width: 200,
      resizable: true,
      cansort: true,
    },
    {
      key: "StaffName", // Họ tên
      label: _l("StaffName"),
      width: 300,
      resizable: true,
      cell: (dataRow: any) => (
        <>
          <Link
            to={`/StaffNew/${dataRow.StaffCode}/chitiet`}
            style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                className="mr-2"
                circle
                src={dataRow.AvatarUrl ? dataRow.AvatarUrl : dataRow.AvatarUrl}
                text={`${
                  dataRow.AvatarUrl ? dataRow.AvatarUrl : dataRow.StaffName
                }`}
              />
              <div className="name_staff">{dataRow.StaffName}</div>
            </div>
          </Link>
        </>
      ),
    },
    {
      key: "StaffPhone", // Điện thoại
      label: _l("StaffPhone"),
      width: 200,
      resizable: true,
    },
    {
      key: "StaffEmail", // Email
      label: _l("StaffEmail"),
      width: 200,
      resizable: true,
    },
    {
      key: "DepartmentName", // Phòng ban
      label: _l("DepartmentName"),
      width: 200,
      resizable: true,
    },
    {
      key: "PositionName", // Chức vụ
      label: _l("PositionName"),
      width: 200,
      resizable: true,
    },
    {
      key: "StaffStatus", // Trạng thái hoạt động
      label: _l("Trạng Thái"),
      width: 200,
      resizable: true,
      cansort: true,
      cell: (dataRow: any) => (
        <>
          {dataRow.StaffStatus === "ACTIVE" ? (
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
                background: "orange",
                color: "white",
                borderRadius: "6px",
                fontWeight: "600",
              }}>
              {_l("Đã nghỉ việc")}
            </span>
          )}
        </>
      ),
    },
  ];
  const fetchData = async ({
    page,
    limit,
    sortBy,
    sortDir,
  }: {
    page: number;
    limit: number;
    sortBy: string;
    sortDir: string;
  }) => {
    const param = {
      KeyWord: keyword,
      Ft_PageIndex: page - 1,
      Ft_PageSize: limit,
    };
    setParamValue(param);

    const resp = await staff_service.search(param);
    if (resp.Success) {
      const data = resp.Data.DataList;
      if (data) {
        const newResp = data.map((item: any, index: number) => {
          return {
            __idx: resp.Data.PageIndex * limit + index + 1,
            ...item,
          };
        });
        const param = {
          ...resp,
          Data: {
            ...resp.Data,
            DataList: newResp,
          },
        };
        return param;
      }
    }
    return resp;
  };

  const listForm: FormItemInterface[] = [
    {
      label: _l("ReasonID"),
      control: [
        {
          accepter: TagPicker,
          name: "ReasonID",
          data: selectListResinReason,
          valueKey: "ReasonID",
          labelKey: "ResignReason",
        },
      ],
    },
    {
      label: _l("DepartmentName"),
      control: [
        {
          accepter: TagPicker,
          name: "DepartmentCode",
          data: selectListDepartment,
          valueKey: "DepartmentCode",
          labelKey: "DepartmentName",
        },
      ],
    },
    {
      label: _l("HistDateFrom"),
      control: [
        {
          accepter: DatePicker,
          name: "HistDateFrom",
        },
        {
          accepter: DatePicker,
          name: "HistDateTo",
        },
      ],
    },
  ];

  const genFilterBlock = (onClose: any) => {
    return (
      <div style={{ width: "400px" }}>
        <FormValidate
          listItem={listForm}
          layout="horizontal"
          ref={formRef}
          formValue={formValidate}
          setFormValue={setFormValidate}></FormValidate>
        <Button
          style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
          appearance="primary"
          color="green"
          onClick={() => {
            const changing = {
              ...formValidate,
              ReasonID: formValidate?.ReasonID?.length
                ? formValidate.ReasonID.join(",")
                : "",
              DepartmentCode: formValidate?.DepartmentCode?.length
                ? formValidate.DepartmentCode.join(",")
                : "",
              HistDateFrom: formValidate?.HistDateFrom
                ? convertDate(formValidate.HistDateFrom)
                : "",
              HistDateTo: formValidate?.HistDateTo
                ? convertDate(formValidate.HistDateTo)
                : "",
            };

            reloading();
            onClose();
          }}>
          {_l("OK")}
        </Button>
      </div>
    );
  };

  const handleExportExcel = () => {
    console.log("paramValue ", paramValue);

    staff_service.exportExcel(paramValue).then((resp: any) => {
      if (resp.Success) {
        const url = resp.Data.Url;
        if (url) {
          toast.success(_t("export excel success"));
          window.location.href = url;
        } else {
          toast.error(_t("Don't have Url to link"));
        }
      } else {
        ShowError(resp.ErrorData);
      }
    });
  };

  const listMore: MoreInterface[] = [
    {
      label: _m("Export Excel"),
      event: handleExportExcel,
    },
  ];

  useEffect(() => {
    return () => {};
  }, [loading]);

  return (
    <div className="wrapper-container">
      <Container>
        <Grid fluid>
          <HeaderComponent
            keyword={keyword}
            setKeyword={setKeyword}
            reloading={reloading}
            // handleAdd={handleAdd}
            title=""
            listMore={listMore}
          />
          <Content>
            <TableStandard
              genFilterBlock={genFilterBlock}
              columns={columnList}
              dataKey="StaffCode"
              fetchData={fetchData}
              reloadKey={loading}
              height={windowSize.height - 170}
            />
          </Content>
        </Grid>
        {currentCode}
      </Container>
    </div>
  );
}

export default StaffTable;
