import SideMenuGeneral from "components/SideMenu/SideMenuGeneral";

export default function PageOutlet({ children }: any) {
  return (
    <>
      {children.type.name === "StaffTable" ? null : <SideMenuGeneral />}
      {children}
    </>
  );
}
