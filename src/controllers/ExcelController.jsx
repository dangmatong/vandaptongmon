import axios from "axios";
import * as XLSX from "xlsx";

const API_URL =
  "https://docs.google.com/spreadsheets/d/1CYEqww1_jO_iGf7ke-GfH1L15m3VgR7PX5PBXNapae4/edit?usp=sharing";

export const fetchExcelData = async () => {
  try {
    const response = await axios.get(API_URL, {
      responseType: "arraybuffer",
    });
    const data = new Uint8Array(response.data);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return sheetData;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
