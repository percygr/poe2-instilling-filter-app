const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

// Resolve the path to the Excel file
const filePath = path.join(__dirname, "instilling.xlsx");

// Read the Excel file
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0]; // Get the first sheet
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });

// Process the data
const processedData = jsonData.map((row, rowIndex) => {
    const processedRow = {};

    // Extract the first column (Name and URL)
    const firstColumnKey = Object.keys(row)[0];
    const firstColumnValue = row[firstColumnKey];

    // Check for hyperlink property in the first column
    const cellAddress = `${String.fromCharCode(65 + 0)}${rowIndex + 2}`; // Assuming the first column is "A" (column 0), adjust rowIndex for header
    const hyperlink = sheet[cellAddress]?.l?.Target;

    processedRow.Name = firstColumnValue || null;
    processedRow.URL = hyperlink || null;

    // Process the "Description" column (replace with the correct key for the description)
    const descriptionKey = "Gain Ailment Threshold equal to the lowest of Evasion and Armour on your Boots"; // Update to match your Excel header
    processedRow.Description = row[descriptionKey] || null;

    // Process the "Emotions" column (replace with the correct key)
    const emotionsColumnKey = "Ire, Ire, Ire"; // Update to match your Excel header
    if (row[emotionsColumnKey]) {
        const splitValues = row[emotionsColumnKey].split(", ").map(item => item.trim());
        processedRow.Item1 = splitValues[0] || null;
        processedRow.Item2 = splitValues[1] || null;
        processedRow.Item3 = splitValues[2] || null;
    }

    // Filter out decimal keys and include other relevant fields
    Object.keys(row).forEach(key => {
        if (!key.match(/^\d+\.\d+$/) && key !== descriptionKey && key !== emotionsColumnKey && key !== firstColumnKey) {
            processedRow[key] = row[key];
        }
    });

    return processedRow;
});

// Save the processed data to a JSON file
fs.writeFileSync(path.join(__dirname, "output.json"), JSON.stringify(processedData, null, 2));
console.log("Data converted to JSON successfully!");
