import styled from "styled-components";
export const MapListDepartMentWrapper = styled.div`
  margin-bottom: 10px;
  height: auto;
  width: 100%;
  flex-wrap: wrap;

  & .list-select {
    display: flex;
    width: 100%;
    align-items: center;
    & .rs-picker-select {
      width: 40%;
      display: inline-block;
    }

    & .form-item__icon {
      width: 40px;
      height: 100%;
      border: none;
    }
  }
`;
