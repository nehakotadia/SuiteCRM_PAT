// ExcelReader utility
// Responsible for reading test data from .xlsx files (e.g. using the "xlsx" or "exceljs" npm package)
// Add methods here such as: readSheet(filePath, sheetName), getRowByKey(...), etc.
import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readExcel(sheetName) {
    const filePath = path.join(
        __dirname,
        '..',
        'test-data',
        'TestData.xlsx'
    );

    const workbook = XLSX.readFile(filePath);

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        throw new Error(`Sheet "${sheetName}" not found`);
    }

    return XLSX.utils.sheet_to_json(worksheet);
}