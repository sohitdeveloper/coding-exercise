import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import Paper from "@material-ui/core/Paper";
import { toast, ToastContainer } from "react-toastify";
import { isBlank, isEmail } from "../utils";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
}));
const Home = () => {
  const classes = useStyles();
  const [users, setUsers] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowError(false);
    setFirstName("");
    setLastName("");
    setEmail("");
  };
  const handleSubmit = () => {
    if (
      !isBlank(firstName) &&
      !isBlank(lastName) &&
      !isBlank(email) &&
      isEmail(email)
    ) {
      let obj = {
        first_name: firstName,
        last_name: lastName,
        email: email,
      };
      axios
        .post("https://reqres.in/api/users", obj)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
      toast.success("Candidate added successfully.", {
        autoClose: 500,
      });
      setOpen(false);
      setShowError(false);
      setFirstName("");
      setLastName("");
      setEmail("");
    } else {
      setShowError(true);
      toast.error("Please enter the details properly.", {
        autoClose: 500,
      });
    }
  };

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((resp) => setUsers(resp?.data?.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ margin: "100px 50px 20px 50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Candidates</h2>
        <Button
          variant="contained"
          color="secondary"
          style={{ height: "46px" }}
          onClick={handleOpen}
        >
          Add Candidate
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <img src={row.avatar} width="50px" height="50px" />
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
                  {row.first_name + " " + row.last_name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Add Candidate</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ margin: "18px" }}>
                <TextField
                  error={showError && isBlank(firstName)}
                  label="First Name"
                  variant="outlined"
                  helperText={
                    showError && isBlank(firstName)
                      ? "Please Enter first name."
                      : ""
                  }
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div style={{ margin: "18px" }}>
                <TextField
                  error={showError && isBlank(lastName)}
                  label="Last Name"
                  variant="outlined"
                  helperText={
                    showError && isBlank(lastName)
                      ? "Please Enter last name."
                      : ""
                  }
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div style={{ margin: "18px" }}>
                <TextField
                  error={showError && (isBlank(email) || !isEmail(email))}
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  helperText={
                    showError && (isBlank(email) || !isEmail(email))
                      ? "Please Enter valid email."
                      : ""
                  }
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  // disabled={
                  //   isBlank(firstName) || isBlank(lastName) || isBlank(email)
                  // }
                  variant="contained"
                  color="secondary"
                  style={{ height: "46px" }}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Home;
