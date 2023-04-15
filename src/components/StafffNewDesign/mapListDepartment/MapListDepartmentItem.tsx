import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListPosition from "hooks/Select/useSelectListPosition";
import useSelectStoreDepartment from "hooks/Select/useSelectStoreDepartment";
import useSelectStorePosition from "hooks/Select/useSelectStorePosition";
import React, { useState, useEffect, FC, memo, useRef } from "react";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { Button, Col, Form, IconButton, Row, SelectPicker } from "rsuite";

interface MapListDepartmentInterface {
  DepartmentCode?: any;
  PositionCode?: any;
  // id: number | string | any;
}

type Props = {
  item?: MapListDepartmentInterface;
  index?: number;
  // handleAdd?: Function;
  // handleRemove?: Function;
  // handleChange?: Function;
  flag?: string;
  showButton?: boolean;
};

const MapListDepartmentItem: FC<Props> = ({
  item,
  index,
  // handleAdd,
  // handleRemove,
  // handleChange,
  flag,
  showButton = true,
}: Props) => {
  const formRef: any = useRef();
  const [formValue, setFormValue] = useState({
    DepartmentCode: item?.DepartmentCode,
    PositionCode: item?.PositionCode,
  } as any);

  const selectListDepartment: any[] = useSelectStoreDepartment();
  const selectListPosition: any[] = useSelectStorePosition();

  const [selectList, setSelectList] = useState([
    { DepartmentCode: "", PositionCode: "" },
  ]);

  const handleAdd = () => {
    setSelectList([...selectList, { DepartmentCode: "", PositionCode: "" }]);
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
  };

  useEffect(() => {
    setFormValue(item);
  }, [item]);

  return (
    <div className="map-department-item">
      {selectList.map((item, index) => (
        <div key={index} className="list-select d-flex">
          <SelectPicker
            data={selectListDepartment}
            value={item.DepartmentCode}
            onChange={(value, event) =>
              handleChangeValue(value, event, index, "DepartmentCode")
            }
            valueKey="DepartmentCode"
            labelKey="DepartmentName"
            style={{ width: "150px" }}
          />
          <span style={{ paddingLeft: 10, paddingRight: 10 }}>-</span>
          <SelectPicker
            data={selectListPosition}
            value={item.PositionCode}
            onChange={(value, event) =>
              handleChangeValue(value, event, index, "PositionCode")
            }
            valueKey="PositionCode"
            labelKey="PositionName"
            style={{ width: "150px" }}
          />
          <IconButton
            icon={index === 0 ? <FiPlus /> : <FiMinus />}
            onClick={() => (index === 0 ? handleAdd() : handleRemove(index))}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(MapListDepartmentItem);
