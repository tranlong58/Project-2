import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import './App.css';
import {useState} from 'react';

function App() {
  var [name, setName] = useState('');
  var [MSSV, setMSSV] = useState('');
  var [DOB, setDOB] = useState('');
  var [email, setEmail] = useState('');

  var [list, setList] = useState([]);

  function handleAdd() {
    if(name === '' || MSSV === '' || DOB === '' || email === '') {
      alert("Hãy điền đầy đủ thông tin trươc khi thêm.");
      return;
    } 

    var tmp=[];

    var i=0;
    for(; i<list.length; i++) {
      tmp[i]={
        stt: i+1,
        name: list[i]["name"],
        MSSV: list[i]["MSSV"],
        DOB: list[i]["DOB"],
        email: list[i]["email"]
      };
    };

    tmp[i]={
      stt: i+1,
      name: name,
      MSSV: MSSV,
      DOB: DOB,
      email: email
    };
    
    document.querySelector(".input1").value = "";
    document.querySelector(".input2").value = "";
    document.querySelector(".input3").value = "";
    document.querySelector(".input4").value = "";

    setName('');
    setMSSV('');
    setDOB('');
    setEmail('');

    setList(tmp);
  }

  function handleDelete(e) {
    var index=e.target.id-1;
    var tmp=[], i=0;

    list.splice(index, 1);

    for(i; i<list.length; i++) {
      tmp[i]={
        stt: i+1,
        name: list[i]["name"],
        MSSV: list[i]["MSSV"],
        DOB: list[i]["DOB"],
        email: list[i]["email"]
      };
    }

    setList(tmp);
  }

  return (
    <div className="App">
      <div className="Input">
        <label>Tên: </label> 
        <input type="text" placeholder="Nhập tên" onChange={e => setName(e.target.value)} className="input1"></input>

        <label>Email: </label> 
        <input type="text" placeholder="Nhập email" onChange={e => setEmail(e.target.value)} className="input2"></input>
        <br></br>

        <label>MSSV: </label> 
        <input type="text" placeholder="Nhập MSSV" onChange={e => setMSSV(e.target.value)} className="input3"></input>
  
        <label>Ngày sinh: </label> 
        <input type="text" placeholder="Nhập ngày sinh" onChange={e => setDOB(e.target.value)} className="input4"></input>
        <br></br>

        <button onClick={handleAdd}>Thêm</button>
      </div>

      <div className="Table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize: "30px", fontWeight: "bold", textAlign: "center", border: "1px solid black", width: "94px", height: "60px"}}>STT</TableCell>
            <TableCell style={{fontSize: "30px", fontWeight: "bold", textAlign: "center", border: "1px solid black", width: "280px", height: "60px"}}>Họ tên</TableCell>
            <TableCell style={{fontSize: "30px", fontWeight: "bold", textAlign: "center", border: "1px solid black", width: "160px", height: "60px"}}>MSSV</TableCell>
            <TableCell style={{fontSize: "30px", fontWeight: "bold", textAlign: "center", border: "1px solid black", width: "220px", height: "60px"}}>Ngày sinh</TableCell>
            <TableCell style={{fontSize: "30px", fontWeight: "bold", textAlign: "center", border: "1px solid black", width: "340px", height: "60px"}}>Email</TableCell>
            <TableCell style={{fontSize: "30px", fontWeight: "bold", textAlign: "center", border: "1px solid black", width: "auto" , height: "60px"}}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            list.map(item => (
              <TableRow>
                <TableCell style={{fontSize: "20px", border: "1px solid black", textAlign: "center"}}>{item.stt}</TableCell>
                <TableCell style={{fontSize: "20px", border: "1px solid black"}}>{item.name}</TableCell>
                <TableCell style={{fontSize: "20px", border: "1px solid black", textAlign: "center"}}>{item.MSSV}</TableCell>
                <TableCell style={{fontSize: "20px", border: "1px solid black", textAlign: "center"}}>{item.DOB}</TableCell>
                <TableCell style={{fontSize: "20px", border: "1px solid black"}}>{item.email}</TableCell>
                <TableCell style={{border: "1px solid black", textAlign: "center"}}>
                  <button className="Delete-btn" id={item.stt} onClick={handleDelete}>Xóa</button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      </div>
    </div>
  );
}

export default App;
