//Read data from Excel file
const xlsx = require('xlsx');

function read2(){
    try{
        const workbook = xlsx.readFile('C:/Users/Abdo/Downloads/employee_dta_.xlsx');

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        return jsonData;
    }catch(e) {
        console.log(` problem in ${e.message}`)
    };

}

//Calculating Bonuses and Writing to Excel File

const calculatingBonuses= async ()=>{
    try{
        const workbook = xlsx.readFile('C:/Users/Abdo/Downloads/employee_data_.xlsx');
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        let myData = xlsx.utils.sheet_to_json(worksheet);

        myData.forEach(emp => {
            if (emp.AnnualSalary < 50000) {
                emp.BonusPercentage = '5%';
                emp.BonusAmount =  emp.AnnualSalary*5/100
            }else if(emp.AnnualSalary >= 50000 && emp.AnnualSalary < 100000 ){
                emp.BonusPercentage = '7%';
                emp.BonusAmount =  emp.AnnualSalary*7/100
            }else{
                emp.BonusPercentage = '10%';
                emp.BonusAmount =  emp.AnnualSalary*10/100
            } 
        });
        const newWorksheet = xlsx.utils.json_to_sheet(myData);
            workbook.Sheets[firstSheetName] = newWorksheet;
            xlsx.writeFile(workbook, 'updated_example.xlsx');
            console.log('Excel file updated successfully.');
    }catch(e){
        console.log("error in",e.message)
    }
} 

console.log(calculatingBonuses());