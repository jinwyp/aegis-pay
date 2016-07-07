/**
 * Created by JinWYP on 6/21/16.
 *
 * 生成EXCEL 文件xlsx
 * @param {Object} options - 参数必填
 * @param {string} [options.templatePath] - xlsx模版路径。 可选参数
 * @param {string} options.savePath - 生成文件的路径。 必填参数
 * @param {Array} options.dataList - 数据源。 必填参数
 * @param {Array} [options.propertyList] - 要输出指定字段的列表,如果不提供则输出所有字段。 可选参数
 * @param {Array} [options.titleList] - 第一行表头数组,如果不提供表头默认使用字段名称代替。 可选参数
 *
 * @param {callback} [callback] - 提供处理数据的回调函数, 可以用来生成指定的单元格格式或数据格式。 可选参数
 * @param {string} [key] - 回调函数提供的第一个参数, 该数据的属性字段名
 * @param {string} [value] - 回调函数提供的第二个参数, 该数据的值
 * @returns {string|number|boolean}  回调函数需要返回一个值,用来生成单元格的值
 */



var XLSX = require('xlsx');
var path = require('path');

var config     = require('../config');
var emptyExcelTemplate = path.join(config.viewspdf, '/financialDetails/empty.xlsx');


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

    if (typeof value !== 'undefined' && value !== null) {
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

            if (isFunction(callback)) callback(propertyList[column], currentData);

            cell = generateCell(currentData);
            //console.log(row, column, currentData, cell.v, cell.t)
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
