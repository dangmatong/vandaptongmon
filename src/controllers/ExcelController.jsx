import axios from "axios";
import * as XLSX from "xlsx";

const API_URL =
  "https://docs.google.com/spreadsheets/d/1CYEqww1_jO_iGf7ke-GfH1L15m3VgR7PX5PBXNapae4/export?format=xlsx&id=1CYEqww1_jO_iGf7ke-GfH1L15m3VgR7PX5PBXNapae4";

export const fetchExcelData = async () => {
  try {
    const response = await axios.get(API_URL, {
      responseType: "arraybuffer",
    });

    const workbook = XLSX.read(new Uint8Array(response.data), {
      type: "array",
    });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet);

    return sheetData;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
