import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListPosition from "hooks/Select/useSelectListPosition";
import useSelectStoreDepartment from "hooks/Select/useSelectStoreDepartment";
import useSelectStorePosition from "hooks/Select/useSelectStorePosition";
import React, { useState, useEffect, FC, memo, useRef } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Button, Col, Form, IconButton, Row, SelectPicker } from "rsuite";

interface MapListDepartmentInterface {
  DepartmentCode?: any;
  PositionCode?: any;
  // id: number | string | any;
}

type Props = {
  item?: any;
  index?: number;
  // handleAdd?: Function;
  // handleRemove?: Function;
  // handleChange?: Function;
  flag?: string;
  showButton?: boolean;
  setDP: any;
  itemUpdate?: any;
  id?: any;
};

const MapListDepartmentItem: FC<Props> = ({
  item,
  index,
  // handleAdd,
  // handleRemove,
  // handleChange,
  flag,
  showButton = true,
  itemUpdate,
  setDP,
  id,
}: Props) => {
  const selectListDepartment: any[] = useSelectStoreDepartment();
  const selectListPosition: any[] = useSelectStorePosition();
  const formValue = {
    DepartmentCode: "",
    FlagHeadDPM: null,
    LogLUBy: "",
    LogLUDTimeUTC: "",
    NetworkID: "",
    OrgID: "",
    PositionCode: "",
    StaffCode: "",
    StaffRole: "",
    md_DepartmentName: "",
    mp_PositionName: "",
    ss_StaffCodeUser: null,
    ss_StaffName: null,
  };
  const [selectList, setSelectList] = useState([formValue]);

  useEffect(() => {
    if (itemUpdate) {
      setSelectList(itemUpdate);
    }
  }, [itemUpdate]);

  const handleAdd = () => {
    setSelectList([formValue, ...selectList]);
  };

  const handleRemove = (index: number) => {
    const list = [...selectList];
    list.splice(index, 1);
    setSelectList(list);
  };

  const handleChangeValue = (
    value: string | number | null,
    event: React.SyntheticEvent,
    index: any,
    type: any
  ) => {
    const list: any = [...selectList];
    list[index][type] = value;
    setSelectList(list);
    setDP(list);
  };

  return (
    <div className="map-department-item">
      {selectList.map((item: any, index: any) => (
        <div key={index} className="list-select d-flex">
          <SelectPicker
            data={selectListDepartment}
            value={item.DepartmentCode}
            onChange={(value, event) =>
              handleChangeValue(value, event, index, "DepartmentCode")
            }
            valueKey="DepartmentCode"
            labelKey="DepartmentName"
            style={{ width: "135px", marginTop: "10px" }}
          />
          <span style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 17 }}>
            -
          </span>
          <SelectPicker
            data={selectListPosition}
            value={item.PositionCode}
            onChange={(value, event) =>
              handleChangeValue(value, event, index, "PositionCode")
            }
            valueKey="PositionCode"
            labelKey="PositionName"
            style={{ width: "135px", marginTop: "10px" }}
          />
          <IconButton
            style={{
              border: "none",
              background: "transparent",
              marginTop: "10px",
            }}
            icon={
              index === 0 ? (
                <FiPlus style={{ color: "green", fontSize: "20px" }} />
              ) : (
                <FiTrash style={{ color: "red", fontSize: "18px" }} />
              )
            }
            onClick={() => (index === 0 ? handleAdd() : handleRemove(index))}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(MapListDepartmentItem);
