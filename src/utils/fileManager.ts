import * as fs from "fs";

export const deleteFile = async (path): Promise<void> => {
  try {
    fs.unlinkSync(`${path}`);
  } catch (err) {
    console.log(err);
  }
};
