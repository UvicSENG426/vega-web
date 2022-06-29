import SimplePageLayout from "../templates/SimplePageLayout.js";
import {
  fetchuser,
  enableAccount,
  changeAccountRole,
} from "../../service/AdminPanel/AdminPanel.js";
import { UserContext } from "../../auth/UserProvider.js";
import { useState, useContext, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
//THIS IS WHERE I AM CREATING DUMMY DATA
let DummyData = [
  {
    secret: "0",
    value: "VALUE_STR",
    username: "ADMIN_STR",
    date: "Wed Jun 29 00:31:32 UTC 2022",
  },
  {
    secret: "1",
    value: "VALUE_STR",
    username: "ADMIN_STR",
    date: "Wed Jun 29 00:31:53 UTC 2022",
  },
  {
    secret: "2",
    value: "VALUE_STR",
    username: "ADMIN_STR",
    date: "Wed Jun 29 00:31:54 UTC 2022",
  },
  {
    secret: "3",
    value: "VALUE_STR",
    username: "ADMIN_STR",
    date: "Wed Jun 29 00:31:54 UTC 2022",
  },
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
      let submitObject = {
        secret: inputName,
        value: "",
        username: "",
        date: "",
      };
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
            console.log(Secret.secret);

            const handleDelete = (index, e) => {
              setData(data.filter((v, i) => i !== index));
            };

            const handleEdit = (index, e) => {
              setData(data.filter((v, i) => i !== index));

              setShowAdd(1);
            };

            return (
              <tr>
                <td>{Secret.secret}</td>
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
