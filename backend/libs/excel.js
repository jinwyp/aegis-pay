/**
 * Created by tttt on 6/21/16.
 */

var XLSX = require('xlsx');
var path = require('path');

var config     = require('../config');
var emptyExcelTemplate = path.join(config.download, '/financialDetails/empty.xlsx');


function isFunction(fn) {
    return Object.prototype.toString.call(fn)=== '[object Function]';
}


function datenum(value, date1904){
    if (date1904) value+=1462;
    var epoch = Date.parse(value);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 *1000)
}




function getWorkSheet(workbook){

    var sheetNameList = workbook.SheetNames;
    var sheet = {};

    sheetNameList.forEach(function(sheetName, index){
        sheet[sheetName] = workbook.Sheets[sheetName];
        sheet['s' + (index + 1)] = workbook.Sheets[sheetName];
    });
    return sheet

}



function generateCell(value, type){
    var cellClone = {v : '', t : 's'};

    if (value) {
        cellClone.v = value;

        if (typeof cellClone.v === 'number') {
            cellClone.t = 'n';
        }else if (typeof cellClone.v === 'boolean') {
            cellClone.t = 'b'
        }else if (cellClone.v instanceof Date){
            cellClone.t = n;
            cellClone.z = XLSX.SSF._table[14];
            cellClone.v = datenum(cellClone.v)
        }
    }
    return cellClone
}


function generateSheet(worksheet, sourceDataList, titleLabelList, propertyList, callback ){
    // 如果没有传入propertyList 则用所有的sourceDataList的属性代替。即使用所有的字段

    if (!propertyList || !Array.isArray(propertyList) || propertyList.length === 0 ){
        propertyList = [];
        if (Array.isArray(sourceDataList) && sourceDataList.length > 0){
            for (var prop in sourceDataList[0]){
                propertyList.push(prop);
            }
        }
    }


    var total = {
        row : sourceDataList.length,
        column : propertyList.length
    };

    var range = {
        s:{ c:0, r:0},
        e:{ c:30, r:1000}
    };

    if (total.column > range.e.c  ) range.e.c = total.column + 10;
    if (total.row > range.e.r  ) range.e.r = total.row + 10;


    var cell;

    // 写入表头
    for (var column = 0; column < total.column; column++){

        if (titleLabelList[column]) {
            cell = generateCell(titleLabelList[column])
        }else{
            cell = generateCell(propertyList[column])
        }

        worksheet[XLSX.utils.encode_cell({c:column, r:0})] = cell;
    }

    // 从第二行写入内容
    for (var row = 0; row < total.row; row++){
        for (var column = 0; column < total.column; column++){

            var currentData = sourceDataList[row][propertyList[column]];

            if (isFunction(callback)) callback(currentData);

            if (currentData) {
                cell = generateCell(currentData)
            }
            worksheet[XLSX.utils.encode_cell({c:column, r : row + 1})] = cell;
        }
    }

    worksheet['!ref'] = XLSX.utils.encode_range(range);
    return worksheet;
}







function excelExport (options, callback){
    options.templatePath = options.templatePath || emptyExcelTemplate;
    options.savePath = options.savePath || '';
    options.titleList = options.titleList || [];
    options.propertyList = options.propertyList || [];
    options.dataList = options.dataList || [];

    var workbook = XLSX.readFile(options.templatePath);
    var sheetNameList = workbook.SheetNames;

    var sheetFirst = workbook.Sheets[sheetNameList[0]];

    var newSheet = generateSheet(sheetFirst, options.dataList, options.titleList, options.propertyList);

    workbook.Sheets[sheetNameList[0]] = newSheet;

    XLSX.writeFile(workbook, path.resolve(options.savePath) );

}


module.exports = excelExport;

