import Doc from "../../../public/format-icon/docx.png";
import Gif from "../../../public/format-icon/gif.png";
import Jpg from "../../../public/format-icon/jpg.png";
import Png from "../../../public/format-icon/png.png";
import Pdf from "../../../public/format-icon/pdf.png";
import Rar from "../../../public/format-icon/rar.png";
import Xlss from "../../../public/format-icon/xlsx.png";
import Txt from "../../../public/format-icon/txt.png";
import Xml from "../../../public/format-icon/xml.png";
import Zip from "../../../public/format-icon/zip.png";
export const getNameFile = (nameFile: any) => {
  let getLast = nameFile?.split(".").slice(-1)[0];
  switch (getLast?.toLowerCase()) {
    case "docx":
      let doc = Doc;
      return doc;
    case "pdf":
      let pdf = Pdf;
      return pdf;
    case "xlsx":
      let xlsx = Xlss;
      return xlsx;
    case "png":
      let png = Png;
      return png;
    case "zip":
      let zip = Zip;
      return zip;
    case "jpg":
      let jpg = Jpg;
      return jpg;
    case "rar":
      let rar = Rar;
      return rar;
    case "txt":
      let txt = Txt;
      return txt;
    case "xml":
      let xml = Xml;
      return xml;
    case "gif":
      let gif = Gif;
      return gif;
    default:
      let abc = "";
      return abc;
  }
};
