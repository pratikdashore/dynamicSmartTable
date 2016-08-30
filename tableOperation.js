/**
 * Created by pratik.dashore on 8/12/2016.
 */

(function () {
    'use strict';


    //should be use as callback function on server response
    function onAPISuccessResponse(data) {

        var tableInfo = {};

        if (data && data.books && data.books.length > 0) {
            tableInfo.headers = getTableHeading(data.books[0]);
            tableInfo.body = data.books;
            createTable(tableInfo);
        }


    }

    function getTableHeading(row) {

        var properties = [];
        for (var i in row) {
            if (row.hasOwnProperty(i) && i !== 'id') {
                properties.push(i);
            }
        }
        return properties;
    }

    function createTable(tableInfo) {
        //Create Table
        var newTable = document.createElement('table');
        newTable.setAttribute('id', 'dynamicTable');

        //Create first row with header
        var tableHeader = document.createElement('thead');

        var tableHeaderRow = document.createElement('tr');

        for (var i = 0; i < tableInfo.headers.length; i++) {
            //create new heading
            var columnHeading = document.createElement('th');
            columnHeading.order = -1;
            columnHeading.idx = i;
            columnHeading.addEventListener('click', sortTableData);

            // append Heading to table
            tableHeaderRow.appendChild(columnHeading);

            //set new heading text content to json information
            columnHeading.textContent = tableInfo.headers[i];
        }


        //create table body

        var tableBody = document.createElement('tbody');


        for (var j = 0; j < tableInfo.body.length; j++) {

            var rowData = tableInfo.body[j];

            var tableRow = document.createElement('tr');

            for (var col in rowData) {

                if (rowData.hasOwnProperty(col) && col !== 'id') {
                    var column = document.createElement('td');

                    tableRow.appendChild(column);

                    column.textContent = rowData[col];
                }
            }
            tableBody.appendChild(tableRow);
        }

        // Add classes to elements
        newTable.classList.add('jsTable');
        tableHeaderRow.classList.add('jsTableHead');
        tableHeader.appendChild(tableHeaderRow);

        //Append table to DOM
        document.body.appendChild(newTable);

        //Append rows to new table
        newTable.appendChild(tableHeader);
        newTable.appendChild(tableBody);

    }

    function sortTableData(evt) {

        var asc = evt.target.order;
        var idx = evt.target.idx;
        var tableData = document.getElementById('dynamicTable').getElementsByTagName('tbody').item(0);
        var rowData = tableData.getElementsByTagName('tr');

        var rows = rowData, rlen = rows.length, arr = [],
            i, j, cells, clen;

        for (var i = 0; i < rlen; i++) {
            cells = rows[i].cells;
            clen = cells.length;
            arr[i] = [];
            for (j = 0; j < clen; j++) {
                arr[i][j] = cells[j].innerHTML;
            }
        }
        // sort the array by the specified column number (col) and order (asc)
        arr.sort(function (a, b) {
            return (a[idx] == b[idx]) ? 0 : ((a[idx] > b[idx]) ? asc : -1 * asc);
        });
        // replace existing rows with new rows created from the sorted array
        for (i = 0; i < rlen; i++) {
            rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
        }

        evt.target.order = -(asc);
    }

    function filterTableData(evt){


    };

    var data = {
        'books': [
            {
                'id': 1,
                'name': 'Da Vinci Code',
                'author': 'Dan Brown',
                'published_year': 2003
            },
            {
                'id': 2,
                'name': 'Digital Fortress',
                'author': 'Dan Brown',
                'published_year': 1998
            },
            {
                'id': 3,
                'name': 'Catcher in the Rye',
                'author': 'J D Salinger',
                'published_year': 1951
            }
        ]
    };

    onAPISuccessResponse(data);

}());