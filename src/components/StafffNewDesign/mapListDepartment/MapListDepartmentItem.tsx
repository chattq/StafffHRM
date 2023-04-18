import useSelectStoreDepartment from "hooks/Select/useSelectStoreDepartment";
import useSelectStorePosition from "hooks/Select/useSelectStorePosition";
import React, { useState, useEffect, FC, memo, useRef } from "react";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Button, Col, Form, IconButton, Row, SelectPicker } from "rsuite";

type Props = {
  item?: any;
  index?: number;
  flag?: string;
  showButton?: boolean;
  setDepartmentList?: any;
};

const MapListDepartmentItem: FC<Props> = ({
  item,
  index,
  flag,
  setDepartmentList,
}: Props) => {
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const selectListDepartment: any[] = useSelectStoreDepartment();
  const selectListPosition: any[] = useSelectStorePosition();
  const formValue = {
    DepartmentCode: "",
    PositionCode: "",
  };
  const [selectList, setSelectList] = useState([formValue]);
  const handleAdd = () => {
    setSelectList([formValue, ...selectList]);
  };
  const handleRemove = (index: number) => {
    const list = [...selectList];
    list.splice(index, 1);
    setDepartmentList(list);
    setSelectList(list);
  };

  const handleChangeValue = (
    value: any,
    event: React.SyntheticEvent,
    index: any,
    type: any
  ) => {
    const list: any = [...selectList];
    list[index][type] = value;
    setDepartmentList(list);
    setSelectList(list);
  };
  useEffect(() => {
    if (flag === "update" && item) {
      setSelectList(item);
    } else {
      setSelectList([
        {
          DepartmentCode: "",
          PositionCode: "",
        },
      ]);
    }
  }, [item]);
  return (
    <div>
      {selectList.map((item, index) => (
        <div key={index} className="list-select d-flex py-1">
          <SelectPicker
            data={selectListDepartment}
            value={item.DepartmentCode}
            onChange={(value, event) =>
              handleChangeValue(value, event, index, "DepartmentCode")
            }
            valueKey="DepartmentCode"
            labelKey="DepartmentName"
            style={{ width: checkEdit ? "130px" : "145px" }}
          />
          <span style={{ paddingLeft: 11, paddingRight: 11, paddingTop: 6 }}>
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
            style={{ width: checkEdit ? "130px" : "145px" }}
          />
          <IconButton
            style={{ marginLeft: 20 }}
            icon={
              index === 0 ? (
                <FiPlus style={{ color: "green", fontSize: "20px" }} />
              ) : (
                <FiTrash style={{ color: "red", fontSize: "20px" }} />
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
