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
import useListTypeReward from "hooks/Select/useListReward";
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import { convertDate } from "utils/date";
import Staff_Reward_Edit from "./staff_reward_edit";

type Props = {
  AwardTypeCode: any[];
  DepartmentCode: any[];
  RewardDateFrom: Date;
  RewardDateTo: Date;
  EffectiveDateFrom: Date;
  EffectiveDateTo: Date;
};

function Staff_Reward() {
  const formRef: any = useRef();
  const _l = useLocalization("Staff_Reward");
  const _t = useLocalization("toast");
  const _m = useLocalization("More");
  const _b = useLocalization("Button");
  const [keyword, setKeyword] = useState("");
  const selectListTypeReward = useListTypeReward();
  const selectListDepartment = useSelectListDepartment();
  const windowSize = useWindowSize();
  const { OrgId } = store.getState().orgInfo;
  const [currentCode, setCurrentCode] = useState((<></>) as ReactNode);
  const [condition, setCondition] = useState(
    {} as {
      AwardTypeCode?: string;
      DepartmentCode?: string;
      RewardDateFrom?: string;
      RewardDateTo?: string;
      EffectiveDateFrom?: string;
      EffectiveDateTo?: string;
    }
  );
  const [loading, setLoading] = useState("");
  const [formValidate, setFormValidate] = useState({} as Props);

  const handleDelete = async (data: any) => {
    const obj = data.map((item: any) => {
      return {
        StaffCode: item.StaffCode,
        Idx: item.Idx,
      };
    });

    setCurrentCode(
      <Staff_Reward_Edit
        code={obj}
        flag="delete"
        onSuccess={reloading}
        uuid={uuid()}
      />
    );
  };

  const handleShowDetail = (data: any) => {
    setCurrentCode(
      <Staff_Reward_Edit
        uuid={uuid()}
        flag="detail"
        onSuccess={reloading}
        code={data}
      />
    );
  };

  const handleAdd = () => {
    setCurrentCode(
      <Staff_Reward_Edit uuid={uuid()} flag="add" onSuccess={reloading} />
    );
  };

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
      key: "DecisionNumber", // Số quyết định
      label: _l("DecisionNumber"),
      width: 200,
      resizable: true,
      cell: (dataRow: any) => {
        return (
          <ShowDetail
            label={dataRow.DecisionNumber}
            event={() => handleShowDetail(dataRow)}
          />
        );
      },
    },
    {
      key: "RewardDay", // Ngày khen thưởng
      label: _l("RewardDay"),
      width: 200,
      resizable: true,
    },
    {
      key: "EffectiveDate", // Ngạy hiệu lực
      label: _l("EffectiveDate"),
      width: 200,
      resizable: true,
    },
    {
      key: "StaffCode", // mã nhân viên
      label: _l("StaffCode"),
      width: 200,
      resizable: true,
    },
    {
      key: "ss_StaffFullName", // Họ tên
      label: _l("ss_StaffFullName"),
      width: 200,
      resizable: true,
    },
    {
      key: "md_DepartmentName", // Phòng ban
      label: _l("md_DepartmentName"),
      width: 200,
      resizable: true,
    },
    {
      key: "mp_PositionName", // Chức danh
      label: _l("mp_PositionName"),
      width: 200,
      resizable: true,
    },
    {
      key: "ma_AwardTypeName", // Danh hiệu được khen thưởng
      label: _l("ma_AwardTypeName"),
      width: 200,
      resizable: true,
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
      ...condition,
      KeyWord: keyword,
      Ft_PageIndex: page - 1,
      Ft_PageSize: limit,
      sortColumn: sortBy,
      sortBy: sortDir,
    };

    const resp = await staff_reward.search(param);
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
      label: _l("AwardTypeName"),
      control: [
        {
          accepter: TagPicker,
          name: "AwardTypeCode",
          data: selectListTypeReward,
          valueKey: "AwardTypeCode",
          labelKey: "AwardTypeName",
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
      label: _l("EffectiveDateFrom"),
      control: [
        {
          accepter: DatePicker,
          name: "EffectiveDateFrom",
        },
        {
          accepter: DatePicker,
          name: "EffectiveDateTo",
        },
      ],
    },
    {
      label: _l("RewardDateFrom"),
      control: [
        {
          accepter: DatePicker,
          name: "RewardDateFrom",
        },
        {
          accepter: DatePicker,
          name: "RewardDateTo",
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
              AwardTypeCode: formValidate?.AwardTypeCode?.length
                ? formValidate.AwardTypeCode.join(",")
                : "",
              DepartmentCode: formValidate?.DepartmentCode?.length
                ? formValidate.DepartmentCode.join(",")
                : "",
              RewardDateFrom: formValidate?.RewardDateFrom
                ? convertDate(formValidate.RewardDateFrom)
                : "",
              RewardDateTo: formValidate?.RewardDateTo
                ? convertDate(formValidate.RewardDateTo)
                : "",
              EffectiveDateFrom: formValidate?.EffectiveDateFrom
                ? convertDate(formValidate.EffectiveDateFrom)
                : "",
              EffectiveDateTo: formValidate?.EffectiveDateTo
                ? convertDate(formValidate.EffectiveDateTo)
                : "",
            };
            setCondition(changing);
            reloading();
            onClose();
          }}>
          {_l("OK")}
        </Button>
      </div>
    );
  };

  const handleExportExcel = () => {
    staff_reward.exportExcel().then((resp: any) => {
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

  const handleUpdate = (checked: any) => {
    const obj = checked[0];

    setCurrentCode(
      <Staff_Reward_Edit
        code={obj}
        flag="update"
        onSuccess={reloading}
        uuid={uuid()}
      />
    );
  };

  const genButtonsWhenChecked = (checked: any[]) => {
    const deleteComponent = () => {
      return (
        <Button
          onClick={() => handleDelete(checked)}
          className="mr-2"
          appearance="primary"
          color="green">
          {_b("Delete")}
        </Button>
      );
    };

    const EditComponent = () => {
      return (
        <Button
          onClick={() => handleUpdate(checked)}
          className="mr-2"
          appearance="primary"
          color="orange">
          {_b("Edit")}
        </Button>
      );
    };

    return (
      <div className="d-flex align-items-center">
        {checked.length > 1 ? (
          deleteComponent()
        ) : (
          <>
            {EditComponent()} {deleteComponent()}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="wrapper-container">
      <Container>
        <Grid fluid>
          <HeaderComponent
            keyword={keyword}
            setKeyword={setKeyword}
            reloading={reloading}
            handleAdd={handleAdd}
            title="Staff_Reward"
            listMore={listMore}
          />
          <Content>
            <TableStandard
              genFilterBlock={genFilterBlock}
              columns={columnList}
              genButtonsWhenChecked={genButtonsWhenChecked}
              dataKey="DecisionNumber"
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

export default Staff_Reward;
