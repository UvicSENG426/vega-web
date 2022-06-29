import SimplePageLayout from "../templates/SimplePageLayout.js";
import {
  fetchuser,
  enableAccount,
  changeAccountRole,
} from "../../service/AdminPanel/AdminPanel.js";
import { UserContext } from "../../auth/UserProvider.js";
import { useState, useContext, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

let DummyData = [
  { fileName: "test", file: "test.pdf" },
  { fileName: "test2", file: "test2.pdf" },
];

const ManageSecrets = (props) => {
  const [selectFile, setSelectFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [inputName, setInputName] = useState("");

  const changeHandler = (event) => {
    setSelectFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const [showAdd, setShowAdd] = useState(0);
  const [data, setData] = useState(DummyData);
  const [editDisplay, setEditDisplay] = useState(<div></div>);

  const handleClick = () => {
    setShowAdd(1);
  };
  const handleClickSubmit = () => {
    if (inputName != "") {
      let submitObject = { fileName: inputName };
      data.unshift(submitObject);
      setShowAdd(0);
    }
  };

  const handleChangeName = (event) => {
    setInputName(event.target.value);
    console.log(event.target.value);
  };
  const handleChangeSecret = (event) => {
    console.log(event.target.value);
  };

  return (
    <SimplePageLayout>
      <Table>
        <thead>
          <tr>
            <td>
              <h3>Secret List</h3>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button onClick={handleClick}>+ Add Secret</button>
            </td>
          </tr>
          {(() => {
            if (showAdd != 0) {
              var submitVal = { fileName: "", file: "" };

              return (
                <tr>
                  <td>Secret: </td>
                  <td>
                    <input
                      type="text"
                      id="message"
                      name="message"
                      onChange={handleChangeName}
                      autoComplete="off"
                    ></input>
                  </td>
                  <td></td>
                  <td></td>

                  <td>
                    <button onClick={handleClickSubmit}>*SUBMIT*</button>
                  </td>
                </tr>
              );
            } else {
              return <div></div>;
            }
          })()}

          {data.map(function (Secret, index) {
            console.log(Secret.fileName);

            const handleDelete = (index, e) => {
              setData(data.filter((v, i) => i !== index));
            };

            const handleEdit = (index, e) => {
              setData(data.filter((v, i) => i !== index));

              setShowAdd(1);
            };

            return (
              <tr>
                <td>{Secret.fileName}</td>
                <td></td>
                <td></td>
                <td>
                  {" "}
                  <button onClick={(e) => handleEdit(index, e)}>Edit</button>
                </td>
                <td>
                  <button onClick={(e) => handleDelete(index, e)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </thead>
      </Table>
    </SimplePageLayout>
  );
};
export default ManageSecrets;
