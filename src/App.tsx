import Main from "modules/main/Main";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from 'modules/login/Login_regular';
import Login from "modules/login/Login_sso";

import { useWindowSize } from "hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { setWindowSize } from "store/reducers/ui";
import { calculateWindowSize } from "utils/common";
import LoginIgoss from "modules/login/Login_igoss";
import PageOutlet from "modules/main/PageOutlet";
import SelectNetwork from "modules/SelectNetwork";
import Page404 from "pages/Page404";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "routes/PublicRoute";
import { RouteList } from "routes/RouteConfig";
import { v4 as uuid } from "uuid";
import StaffInfor from "pages/StaffNew/StaffInfor/StaffInfor";
import StaffInforFull from "pages/StaffNew/StaffInfor/StaffInforFull";
import StaffAppoint from "pages/StaffNew/StaffAppoint/StaffAppoint";
import StaffInforEdit from "pages/StaffNew/StaffInfor/StaffInforEdit";
import StaffLaborContract from "pages/StaffNew/StaffLaborContract/StaffLaborContract";
import StaffExp from "pages/StaffNew/StaffExp/StaffExp";
import StaffTrain from "pages/StaffNew/StaffTrain/StaffTrain";
import StaffAdd from "pages/StaffNew/StaffAdd/StaffAdd";
import CourseDetail from "pages/CourseNew/CourseDetail/CourseDetail";
const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/loginigoss" element={<LoginIgoss />} />
        </Route>

        <Route path="/loginigoss" element={<LoginIgoss />}></Route>

        <Route path="/selectnetwork" element={<SelectNetwork />} />

        <Route path="/notfound" element={<Page404 />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="*" element={<Page404 />} />
            <Route path="/StaffNew/:staffCode" element={<StaffInfor />}>
              <Route
                path="/StaffNew/:staffCode/chitiet"
                element={checkEdit ? <StaffInforEdit /> : <StaffInforFull />}
              />
              <Route
                path="/StaffNew/:staffCode/appoint"
                element={<StaffAppoint />}
              />
              <Route
                path="/StaffNew/:staffCode/labor"
                element={<StaffLaborContract />}
              />
              <Route
                path="/StaffNew/:staffCode/Experience"
                element={<StaffExp />}
              />
              <Route
                path="/StaffNew/:staffCode/Train"
                element={<StaffTrain />}
              />
            </Route>
            <Route path="/addStaff" element={<StaffAdd />} />
            {RouteList.map((item) => {
              let page: any =
                item != null ? (
                  <PageOutlet>{item.getPageElement()}</PageOutlet>
                ) : null;

              return (
                <Route
                  path={`/:networkId${item.path}`}
                  element={page != null ? page : <Page404 />}
                  key={uuid()}
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
