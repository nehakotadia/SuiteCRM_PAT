// ExcelReader utility
// Responsible for reading test data from .xlsx files

const XLSX = require('xlsx');
const path = require('path');

function readExcel(sheetName) {

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

    return XLSX.utils.sheet_to_json(worksheet, {
        defval: ''
    });
}

module.exports = {
    readExcel
};