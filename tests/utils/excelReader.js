// ExcelReader utility
// Responsible for reading test data from .xlsx files

const XLSX = require('xlsx');
const path = require('path');
const logger = require('./logger.js');

function readExcel(sheetName) {
    const filePath = path.join(
        __dirname,
        '..',
        'test-data',
        'TestData.xlsx'
    );

    logger.info(`Loading Excel sheet: ${sheetName} from ${filePath}`);
    const workbook = XLSX.readFile(filePath);

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        logger.error(`Sheet "${sheetName}" not found in Excel file`);
        throw new Error(`Sheet "${sheetName}" not found`);
    }

    return XLSX.utils.sheet_to_json(worksheet, {
        defval: ''
    });
}

module.exports = {
    readExcel
};