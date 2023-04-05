import FormValidate from "components/FormValidate/FormValidate";
import GenButtonWhenChecked from "components/GenButtonWhenChecked";
import HeaderComponent from "components/HeaderComponent/HeaderComponent";
import { FormItemInterface, MoreInterface } from "components/interface";
import ShowDetail from "components/ShowDetail";
import { ColumnDataProps } from "components/table/TableDetail";
import TableStandard from "components/table/TableStandard";
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListDiscipline from "hooks/Select/useSelectListDiscipline";
import { useLocalization } from "hooks/useLocalization";
import { useWindowSize } from "hooks/useWindowSize";
import { useRef, useState } from "react";
import {
  Button,
  Container,
  Content,
  DatePicker,
  Grid,
  TagPicker,
} from "rsuite";
import staff_discipline_service from "services/Staff/staff_discipline_service";
import store from "store/store";
import { convertDate } from "utils/date";
import { v4 as uuid } from "uuid";
import Staff_Discipline_Edit from "./Staff_Discipline_Edit";

type Props = {
  DepartmentCode: any[];
  DisciplineCode: any[];
  BreachDayFrom: Date;
  BreachDayTo: Date;
  EffectiveDateFrom: Date;
  EffectiveDateTo: Date;
  ExpirationDateFrom: Date;
  ExpirationDateTo: Date;
};

function Staff_Discipline() {
  const formRef: any = useRef();
  const _l = useLocalization("Staff_Discipline");
  const _t = useLocalization("toast");
  const _m = useLocalization("More");
  const _b = useLocalization("Button");
  const [keyword, setKeyword] = useState("");
  const selectListTypeDiscipline = useSelectListDiscipline();
  const selectListDepartment = useSelectListDepartment();
  const windowSize = useWindowSize();
  const [currentCode, setCurrentCode] = useState(<></>);
  const { OrgId } = store.getState().orgInfo;
  const [condition, setCondition] = useState(
    {} as {
      DepartmentCode?: string;
      DisciplineCode?: string;
      BreachDayFrom?: string;
      BreachDayTo?: string;
      EffectiveDateFrom?: string;
      EffectiveDateTo?: string;
      ExpirationDateFrom?: string;
      ExpirationDateTo?: string;
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
      <Staff_Discipline_Edit
        code={obj}
        flag="delete"
        onSuccess={reloading}
        uuid={uuid()}
      />
    );
  };

  const handleShowDetail = (data: any) => {
    setCurrentCode(
      <Staff_Discipline_Edit
        uuid={uuid()}
        flag="detail"
        onSuccess={reloading}
        code={data}
      />
    );
  };

  const handleAdd = () => {
    setCurrentCode(
      <Staff_Discipline_Edit uuid={uuid()} flag="add" onSuccess={reloading} />
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
      key: "StaffCode", // Mã nhân viên
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
      key: "BreachDay", // Ngày vi phạm
      label: _l("BreachDay"),
      width: 200,
      resizable: true,
    },
    {
      key: "DisciplineReason", // Lý do bị kỷ luật
      label: _l("DisciplineReason"),
      width: 200,
      resizable: true,
    },
    {
      key: "mdi_DisciplineName", // Hình thức kỷ luật
      label: _l("mdi_DisciplineName"),
      width: 200,
      resizable: true,
    },
    {
      key: "EffectiveDate", // Ngày hiệu lực
      label: _l("EffectiveDate"),
      width: 200,
      resizable: true,
    },
    {
      key: "ExpirationDate", // Ngày hết hiệu lực
      label: _l("ExpirationDate"),
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
      OrgID: OrgId,
      KeyWord: keyword,
      Ft_PageIndex: page - 1,
      Ft_PageSize: limit,
      sortColumn: sortBy,
      sortBy: sortDir,
    };

    const resp = await staff_discipline_service.search(param);
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
      label: _l("DisciplineCode"),
      control: [
        {
          accepter: TagPicker,
          name: "DisciplineCode",
          data: selectListTypeDiscipline,
          valueKey: "DisciplineCode",
          labelKey: "DisciplineName",
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
      label: _l("BreachDayFrom"),
      control: [
        {
          accepter: DatePicker,
          name: "BreachDayFrom",
        },
        {
          accepter: DatePicker,
          name: "BreachDayTo",
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
      label: _l("ExpirationDateFrom"),
      control: [
        {
          accepter: DatePicker,
          name: "ExpirationDateFrom",
        },
        {
          accepter: DatePicker,
          name: "ExpirationDateTo",
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
          setFormValue={setFormValidate}
        ></FormValidate>
        <Button
          style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
          appearance="primary"
          color="green"
          onClick={() => {
            const changing = {
              ...formValidate,
              DisciplineCode: formValidate?.DisciplineCode?.length
                ? formValidate.DisciplineCode.join(",")
                : "",
              DepartmentCode: formValidate?.DepartmentCode?.length
                ? formValidate.DepartmentCode.join(",")
                : "",
              BreachDayFrom: formValidate?.BreachDayFrom
                ? convertDate(formValidate.BreachDayFrom)
                : "",
              BreachDayTo: formValidate?.BreachDayTo
                ? convertDate(formValidate.BreachDayTo)
                : "",
              EffectiveDateFrom: formValidate?.EffectiveDateFrom
                ? convertDate(formValidate.EffectiveDateFrom)
                : "",
              EffectiveDateTo: formValidate?.EffectiveDateTo
                ? convertDate(formValidate.EffectiveDateTo)
                : "",
              ExpirationDateFrom: formValidate?.ExpirationDateFrom
                ? convertDate(formValidate.ExpirationDateFrom)
                : "",
              ExpirationDateTo: formValidate?.ExpirationDateTo
                ? convertDate(formValidate.ExpirationDateTo)
                : "",
            };
            setCondition(changing);
            reloading();
            onClose();
          }}
        >
          {_l("OK")}
        </Button>
      </div>
    );
  };

  const handleExportExcel = () => {};

  const listMore: MoreInterface[] = [
    {
      label: _m("Export Excel"),
      event: handleExportExcel,
    },
  ];

  const handleUpdate = (checked: any) => {
    const obj = checked[0];
    setCurrentCode(
      <Staff_Discipline_Edit
        code={obj}
        flag="update"
        onSuccess={reloading}
        uuid={uuid()}
      />
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
            title="Staff_Discipline"
            listMore={listMore}
          />
          <Content>
            <TableStandard
              genFilterBlock={genFilterBlock}
              columns={columnList}
              genButtonsWhenChecked={(checked: any[]) => {
                return GenButtonWhenChecked(
                  checked,
                  handleDelete,
                  handleUpdate
                );
              }}
              dataKey="DecisionNumber"
              fetchData={fetchData}
              reloadKey={loading}
              height={windowSize.height - 190}
            />
          </Content>
        </Grid>
        {currentCode}
      </Container>
    </div>
  );
}

export default Staff_Discipline;
