import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListPosition from "hooks/Select/useSelectListPosition";
import React, { useState, useEffect, FC, memo, useRef } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Button, Col, Form, IconButton, Row, SelectPicker } from "rsuite";
import { MapListDepartMentWrapper } from "./MapListDepartmentStyled";

interface MapListDepartmentInterface {
  DepartmentCode: string;
  PositionCode: string;
  id: number | string;
}

type Props = {
  item: MapListDepartmentInterface;
  index: number;
  handleAdd: Function;
  handleRemove: Function;
  handleChange: Function;
  flag: string;
  showButton?: boolean;
};

const MapListDepartmentItem: FC<Props> = ({
  item,
  index,
  handleAdd,
  handleRemove,
  handleChange,
  flag,
  showButton = true,
}: Props) => {
  const formRef: any = useRef();
  const [formValue, setFormValue] = useState({
    DepartmentCode: item.DepartmentCode,
    PositionCode: item.PositionCode,
    id: item.id,
  } as any);

  const selectListDepartment: any[] = useSelectListDepartment();
  const selectListPosition: any[] = useSelectListPosition();

  useEffect(() => {
    setFormValue(item);
  }, [item]);

  const handleChangeValue = (
    value: string | number | null,
    event: React.SyntheticEvent,
    name: string
  ) => {
    handleChange({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <MapListDepartMentWrapper ref={formRef} className="map-department-item">
      <div className="list-select">
        <SelectPicker
          plaintext={flag === "detail" ? true : false}
          data={selectListDepartment}
          value={formValue.DepartmentCode}
          onChange={(
            value: string | number | null,
            event: React.SyntheticEvent
          ) => handleChangeValue(value, event, "DepartmentCode")}
          valueKey="DepartmentCode"
          labelKey="DepartmentName"
        />
        <span style={{ paddingLeft: 10, paddingRight: 10 }}>-</span>
        <SelectPicker
          plaintext={flag === "detail" ? true : false}
          value={formValue.PositionCode}
          onChange={(
            value: string | number | null,
            event: React.SyntheticEvent
          ) => handleChangeValue(value, event, "PositionCode")}
          data={selectListPosition}
          valueKey="PositionCode"
          labelKey="PositionName"
        />
        {showButton && (
          <IconButton
            className={`form-item__icon ${
              index === 0 ? "form-item__icon--add" : "form-item__icon--delete"
            } ${flag === "detail" ? "hide" : ""}`}
            onClick={
              index === 0 ? () => handleAdd() : () => handleRemove(item, index)
            }
            icon={index === 0 ? <FiPlus /> : <FiTrash />}></IconButton>
        )}
      </div>
    </MapListDepartMentWrapper>
  );
};

export default memo(MapListDepartmentItem);
