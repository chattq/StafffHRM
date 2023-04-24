import * as api from "./../../helper";
import { UpdateInterface } from "components/interface";

const update = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Train_CourseChapter/Add", {
      strJson: str,
    });
  } else {
    return await api.post("Train_CourseChapter/Update", {
      strJson: str,
    });
  }
};

const remove = async (ChapterCodeSys: string) => {
  return await api.post("Train_CourseChapter/Delete", {
    ChapterCodeSys: ChapterCodeSys,
  });
};

const removeMultiple = async (data: any[]) => {
  const str = JSON.stringify(data);

  return await api.post("", {
    strJson: str,
  });
};

const getAllActive = async () => {
  return await api.post("Train_CourseChapter/GetAllActive", {});
};

const updateDetails = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Train_CourseChapter/Add", {
      strJson: str,
    });
  } else {
    return await api.post("Train_CourseChapter/UpdateAllDetail", {
      strJson: str,
    });
  }
};

const getByTrCsCodeSys = async (TrCsCodeSys: string) => {
  return await api.post("Train_CourseChapter/GetByTrCsCodeSys", {
    TrCsCodeSys,
  });
};

const getByChapterCode = async (ChapterCodeSys: string) => {
  return await api.post("Train_CourseChapter/GetByChapterCodeSys", {
    ChapterCodeSys,
  });
};
const GetByChapterCodeSys = async (ChapterCodeSys: string) => {
  return await api.post("Train_CourseChapterInst/GetByChapterCodeSys", {
    ChapterCodeSys,
  });
};
const updateSilde = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Train_CourseChapter/Add", {
      strJson: str,
    });
  } else {
    return await api.post("Train_CourseChapter/UpdateAllDetail", {
      strJson: str,
    });
  }
};

export default {
  update,
  remove,
  getAllActive,
  updateDetails,
  getByTrCsCodeSys,
  getByChapterCode,
  removeMultiple,
  GetByChapterCodeSys,
  updateSilde,
};
