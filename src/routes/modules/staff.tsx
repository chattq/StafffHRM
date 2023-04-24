import CourseDetail from "pages/CourseNew/CourseDetail/CourseDetail";
import ManagerCourse from "pages/CourseNew/ManagerCourse/ManagerCourse";
import ReportCourse from "pages/CourseNew/ReportCourse/ReportCourse";
import TestCourse from "pages/CourseNew/TestCourse/TestCourse";
import Staff_Discipline from "pages/Staff/Staff_Discipline/Staff_Discipline";
import Staff_Reward from "pages/Staff/Staff_Reward/staff_reward";
import Staff_Staff_Inactive from "pages/Staff/Staff_Staff_Inactive/Staff_Staff_inactive";
import Staff_Staff_Pause from "pages/Staff/Staff_Staff_Pause/Staff_Staff_Pause";
import StaffInforFull from "pages/StaffNew/StaffInfor/StaffInforFull";
import StaffTable from "pages/StaffNew/StaffTable/StaffTable";
import { RouteItem } from "routes/RouteConfig";

export const staff: RouteItem[] = [
  {
    path: "/Staff",
    pageTitle: "Staff",
    mainMenuKey: "Staff",
    subMenuKey: "",
    mainMenuTitle: "Staff",
    subMenuTitle: "",
    getPageElement: () => <></>,
  },

  {
    path: "/Staff/Staff_Staff_Pause", // Tạm dừng
    mainMenuTitle: "",
    mainMenuKey: "Staff",
    subMenuKey: "Staff_Staff_Pause",
    subMenuTitle: "Staff_Staff_Pause",
    permissions: "",
    getPageElement: () => {
      return <Staff_Staff_Pause />;
    },
  },

  {
    path: "/Staff/Staff_Staff_Inactive", // Nghỉ việc
    mainMenuTitle: "",
    mainMenuKey: "Staff",
    subMenuKey: "Staff_Staff_Inactive",
    subMenuTitle: "Staff_Staff_Inactive",
    permissions: "",
    getPageElement: () => {
      return <Staff_Staff_Inactive />;
    },
  },

  {
    path: "/Staff/Staff_Reward", // khen thưởng
    mainMenuTitle: "",
    mainMenuKey: "Staff",
    subMenuKey: "Staff_Reward",
    subMenuTitle: "Staff_Reward",
    permissions: "",
    getPageElement: () => {
      return <Staff_Reward />;
    },
  },

  {
    path: "/Staff/Staff_Discipline", // kỷ luật
    mainMenuTitle: "",
    mainMenuKey: "Staff",
    subMenuKey: "Staff_Discipline",
    subMenuTitle: "Staff_Discipline",
    permissions: "",
    getPageElement: () => {
      return <Staff_Discipline />; // chưa xong
    },
  },

  // tạo mới dự án
  {
    path: "/StaffNew",
    mainMenuTitle: "Nhân sự",
    mainMenuKey: "StaffNew",
    subMenuKey: "StaffNew",
    subMenuTitle: "",
    permissions: "",
    getPageElement: () => {
      return <StaffTable />; // chưa xong
    },
  },
  {
    path: "/Course",
    mainMenuTitle: "Đào tạo",
    mainMenuKey: "Course",
    subMenuKey: "Course",
    subMenuTitle: "",
    permissions: "",
    getPageElement: () => {
      return <></>; // chưa xong
    },
  },
  {
    path: "/Course/Manager_course", // Tạm dừng
    mainMenuTitle: "",
    mainMenuKey: "Course",
    subMenuKey: "Quản lý khóa đào tạo",
    subMenuTitle: "Quản lý khóa đào tạo",
    permissions: "",
    getPageElement: () => {
      return <ManagerCourse />;
    },
  },
  {
    path: "/Course/Test_course", // Nghỉ việc
    mainMenuTitle: "",
    mainMenuKey: "Course",
    subMenuKey: "Học và kiểm tra",
    subMenuTitle: "Học và kiểm tra",
    permissions: "",
    getPageElement: () => {
      return <TestCourse />;
    },
  },
  {
    path: "/Course/Report_course", // Nghỉ việc
    mainMenuTitle: "",
    mainMenuKey: "Course",
    subMenuKey: "Báo cáo kết quả đào tạo",
    subMenuTitle: "Báo cáo kết quả đào tạo",
    permissions: "",
    getPageElement: () => {
      return <ReportCourse />;
    },
  },
  {
    path: "/Course/:codeCourse", // Nghỉ việc
    mainMenuTitle: "",
    mainMenuKey: "Course",
    subMenuKey: "Quản lý khóa đào tạo",
    subMenuTitle: "",
    permissions: "",
    getPageElement: () => {
      return <CourseDetail />;
    },
  },
];
