// import StaffDetail from "pages/Staff/StaffDetail";

import { staff } from "./modules/staff";

export interface RouteItem {
  path: string;
  pageTitle?: string;
  mainMenuTitle?: string;
  subMenuTitle?: string;
  mainMenuKey: string;
  subMenuKey?: string;
  permissions?: string;
  getPageElement: Function;
  childrenOf?: string;
}

export const RouteList: RouteItem[] = [
  {
    path: "/",
    mainMenuTitle: "",
    mainMenuKey: "",
    subMenuKey: "",
    subMenuTitle: "",
    permissions: "",
    getPageElement: () => {
      return <></>;
    },
  },

  ...staff,
];
