// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import Papa from "papaparse";

// const ImportExportComponent = () => {
//     const [data, setData] = useState([]); // Здесь будут храниться данные сотрудников

//     // Функция для экспорта данных в Excel
//     const exportToExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(data);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Сотрудники");
//         XLSX.writeFile(wb, "employees.xlsx");
//     };

//     // Функция для экспорта данных в CSV
//     const exportToCSV = () => {
//         const csv = Papa.unparse(data);
//         const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = "employees.csv";
//         link.click();
//     };

//     // Функция для импорта данных из Excel
//     const handleExcelImport = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const abuf = event.target.result;
//             const wb = XLSX.read(abuf, { type: "array" });
//             const ws = wb.Sheets[wb.SheetNames[0]];
//             const importedData = XLSX.utils.sheet_to_json(ws);
//             setData(importedData);
//         };
//         reader.readAsArrayBuffer(file);
//     };

//     // Функция для импорта данных из CSV
//     const handleCSVImport = (e) => {
//         const file = e.target.files[0];
//         Papa.parse(file, {
//             complete: (result) => {
//                 setData(result.data);
//             },
//             header: true,
//         });
//     };

//     return (
//         <div>
//             <h2>Импорт/Экспорт данных сотрудников</h2>

//             {/* Экспорт в Excel */}
//             <button onClick={exportToExcel}>Экспорт в Excel</button>

//             {/* Экспорт в CSV */}
//             <button onClick={exportToCSV}>Экспорт в CSV</button>

//             {/* Импорт из Excel */}
//             <input
//                 type="file"
//                 accept=".xlsx,.xls"
//                 onChange={handleExcelImport}
//                 style={{ margin: "10px 0" }}
//             />

//             {/* Импорт из CSV */}
//             <input
//                 type="file"
//                 accept=".csv"
//                 onChange={handleCSVImport}
//                 style={{ margin: "10px 0" }}
//             />

//             <div>
//                 <h3>Данные сотрудников</h3>
//                 <table border="1">
//                     <thead>
//                         <tr>
//                             <th>Имя</th>
//                             <th>Зарплата</th>
//                             <th>Описание</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{item.name}</td>
//                                 <td>{item.salary}</td>
//                                 <td>{item.description}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ImportExportComponent;
