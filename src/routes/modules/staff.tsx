import Staff_Discipline from "pages/Staff/Staff_Discipline/Staff_Discipline";
import Staff_Reward from "pages/Staff/Staff_Reward/staff_reward";
import Staff_Staff_Inactive from "pages/Staff/Staff_Staff_Inactive/Staff_Staff_inactive";
import Staff_Staff_Pause from "pages/Staff/Staff_Staff_Pause/Staff_Staff_Pause";
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
  // Thiếp lập
];
