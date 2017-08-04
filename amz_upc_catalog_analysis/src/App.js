import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import XLSX from 'xlsx';

class App extends Component {
    // getFile = () => {
    //     const x = document.getElementById('my-csv-upload');
    // }

    handleFiles = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i += 1) {
            const f = files[i];
            const reader = new FileReader();
            const name = f.name;
            reader.onload = (e) => {
                const data = e.target.result;
                const result = {};
                const workbook = XLSX.read(data, {type: 'binary'});
                workbook.SheetNames.forEach(sheetName => {
                    const rObjArr = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    rObjArr.forEach(rObj => {
                        Object.keys(rObj).forEach(key => {
                            if (typeof key === 'string' && key.toLowerCase() === 'upc') {
                                const upcVal = rObj[key];
                                result[upcVal] = rObj;
                            }
                        });
                    });
                });
            }
        }
        reader.readAsBinaryString(f);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <input type="file" id="my-csv-upload" accept=".xlsx" onChange={this.handleFiles}/>
                <button type="button" onClick={this.getFile}>Submit CSV For Analysis</button>
            </div>
        );
    }
}

export default App;
