 var apiUrl = "/engine-rest/engine/default/variable-instance";

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                var variableList = data;
                console.log("Process Variable fetch Successfully");
                var tableBody = document.querySelector('#smartFieldTable');
                var fieldHeaders = [];

                var options = ["String", "Email", "Float", "Byte", "Match", "No Match"];

                for(var i = 0; i < variableList.length; i++) {
                    if(variableList[i].name == "responseData") {
						var str = variableList[i].value;
						console.log("Inside the parsing API response data");
						str = str.replace('/\\/g', '');
						str = str.replace(/\\r\\n/g, '');
						var rs = JSON.parse(str);
							
						console.log("Response data parsing successfully");

                        if(rs.length > 0) {
							console.log("Get Header value from parse Response data");
							var strHeader = rs[0].Headers;
							var hdr = JSON.parse(strHeader);
							console.log(hdr);
                        	fieldHeaders = hdr.Headers;
                        	console.log("successfully Header value from parse Response data");
                        }
                    }
                    if(variableList[i].name == "data") {
						console.log("Parsing the process input data");
                        var inputData = JSON.parse(variableList[i].value);
                        console.log("Successfully Parsing the process input data");
                        if(inputData != null
                        && inputData.fieldTypes != null
                        && inputData.fieldTypes.length > 0) {
                            options = inputData.fieldTypes;
                            console.log("Option Value Set Successfully");
                        }
                    }
                }

                var fieldMapping = [];

                fieldHeaders.forEach(function(fd) {
                    // Create a new table row
                    var newRow = document.createElement('tr');

                    var labelCell = document.createElement('td');
                    labelCell.textContent = fd;
                    newRow.appendChild(labelCell);

                    var selectCell = document.createElement('td');

                    var selectDivCell = document.createElement('div');
                    selectDivCell.className = "select-control";

                    var selectElement = document.createElement('select');

                    selectElement.setAttribute('cam-variable-name', fd);
                    selectElement.setAttribute('cam-variable-type', 'String');
                    selectElement.setAttribute('id', fd);

                    fieldMapping.push({
                        "fmpmoduleid": fd,
                        "ExcelModule": options[0]
                    });

                    var fieldMappingHiddenInput = document.getElementById('fieldMapping');

                    fieldMappingHiddenInput.value = JSON.stringify(fieldMapping);

                    options.forEach(function(optionValue) {
                        var optionElement = document.createElement('option');
                        optionElement.value = optionValue;
                        optionElement.text = optionValue;
                        selectElement.appendChild(optionElement);
                    });

                    selectDivCell.appendChild(selectElement);
                    selectCell.appendChild(selectDivCell);
                    newRow.appendChild(selectCell);

                    // Append the new row to the table body
                    tableBody.appendChild(newRow);

                    selectElement.addEventListener('change', function () {
                        var selectedValue = selectElement.value;

                        var id = selectElement.getAttribute('id');

                        var mappingTempList = fieldMapping.filter(x=> x.fmpmoduleid == id);
                        if(mappingTempList.length > 0) {
                            mappingTempList[0].ExcelModule = selectedValue;
                            fieldMappingHiddenInput.value = JSON.stringify(fieldMapping);
                        }
                        console.log("selectedValue:  "+selectedValue);
                        console.log(fieldMapping);
                        
                    });
                });
             

            })
            .catch(error => console.error('Error:', error));