import * as React from "react";
import { styled } from "@mui/material/styles";

import { MoreHorizOutlined, StarHalfOutlined } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  Table,
  TableCell,
  tableCellClasses,
  TableBody,
  TableContainer,
  Checkbox,
  Paper,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { getDate, getImage, getTimeMoment } from "helpers";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  useBanUsersMutation,
  useSendEmailMutation,
} from "redux/slices/adminSlice";
import NotificationModal from "components/modals/NotificationModal";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import Editor from "components/Quil";
import { CustomButton } from "components";
import * as Yup from "yup";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F1F0F0",
    color: "#5F5C5C",
    fontWeight: 600,
    fontSize: { md: "1.8rem", xs: "1.2rem" },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: { md: 14, xs: 12 },
    fontWeight: 400,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  cursor: "pointer",
  //   borderBottom: "1px solid #9B9A9A",
}));

export default function CustomizedTables({ rows }) {
  const [banorUnban, { isLoading }] = useBanUsersMutation();
  const [ids, setIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleBanUser = async (e) => {
    if (ids.length > 0) {
      const { data, error } = await banorUnban({
        users: [...ids],
      });
      if (data) {
        toast.success(data);
        setTimeout(() => handleClose(e), 300);
      }
      if (error) toast.error(error);
    } else {
      toast.error("Add Atleast One User");
      handleClose(e);
    }
  };
  const [state] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const handleCheck = () => {
    if (ids.length > 0) {
      setEmailModal(true);
    } else toast.error("Add atleast one User");
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="left">Join Date</StyledTableCell>
              <StyledTableCell align="left">Email/Phone</StyledTableCell>
              <StyledTableCell align="left">Ban Status</StyledTableCell>
              <StyledTableCell align="left">Post</StyledTableCell>
              <StyledTableCell align="left">Last Activity</StyledTableCell>
              <StyledTableCell align="left">Reputation</StyledTableCell>
              <StyledTableCell align="left">
                <IconButton onClick={handleClick}>
                  <MoreHorizOutlined />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleBanUser}>
                    {isLoading ? "Loading..." : "Ban/Unban User"}
                  </MenuItem>
                  <MenuItem onClick={handleCheck}>Send Mail</MenuItem>
                </Menu>
              </StyledTableCell>
              <StyledTableCell align="left">
                <IconButton edge="start">
                  <MoreHorizOutlined />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {rows?.length > 0 ? (
            <TableBody sx={{ width: "100%" }}>
              {rows.map?.((row, index) => (
                <Rows
                  row={row}
                  key={index}
                  state={state}
                  ids={ids}
                  setIds={setIds}
                />
              ))}
            </TableBody>
          ) : (
            <TableBody sx={{ width: "100%" }}>
              <StyledTableRow>
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: "100%",
                    minHeight: "30vh",
                    width: "100%",
                  }}
                >
                  <Typography variant="h2" textAlign="center">
                    No Data Yet
                  </Typography>
                </Grid>
              </StyledTableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <EmailModal
        open={emailModal}
        id={ids}
        handleClose={() => {
          setEmailModal(false);
          handleClose();
        }}
      />
    </>
  );
}
function Rows({ row, state, ids, setIds }) {
  const {
    full_name,
    last_activity,
    post_count,
    avatar,
    phone,
    id,
    createdAt,
    reputation,
    banned,
    email,
    New,
  } = row;

  const [banorUnban, { isLoading }] = useBanUsersMutation();
  const [, { isLoading: sendingEmail }] = useSendEmailMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleBanUser = async (e) => {
    const { data, error } = await banorUnban({
      users: [id],
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
    setTimeout(() => handleClose(e), 300);
  };
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    const val = e.target.checked;
    setChecked(e.target.checked);
    if (val && !ids.includes(id)) {
      setIds([...ids, id]);
    } else {
      const x = ids.filter((i) => i !== id);
      setIds(x);
    }
  };
  const handleCheck = () => {
    setEmailModal(true);
  };
  const [emailModal, setEmailModal] = useState(false);
  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" sx={{ maxWidth: "20rem" }} scope="row">
          <Grid item container gap={2} width="100%" flexWrap="nowrap">
            <Avatar alt={full_name} src={getImage(avatar)}>
              {row?.full_name.slice(0, 1).toUpperCase()}
            </Avatar>
            <Grid
              item
              container
              flexDirection="column"
              sx={{ overflow: "hidden" }}
            >
              <Typography>{full_name}</Typography>
              {/* <Typography fontSize="inherit">New Member</Typography> */}
            </Grid>
          </Grid>
        </StyledTableCell>
        <StyledTableCell align="left">{getDate(createdAt)}</StyledTableCell>
        <StyledTableCell align="left">{email || phone}</StyledTableCell>
        <StyledTableCell align="left">
          <Typography
            fontSize="inherit"
            sx={{ color: banned ? "red" : "green" }}
          >
            {banned ? "Banned" : "Not Banned"}
          </Typography>
          {/* <VerifiedOutlined /> */}
        </StyledTableCell>
        <StyledTableCell align="left">{post_count}</StyledTableCell>
        <StyledTableCell align="left">
          {last_activity ? getTimeMoment(last_activity) : "No Activity"}
        </StyledTableCell>
        <StyledTableCell align="left">
          <Grid item container alignItems="center">
            <Typography>{reputation}</Typography>
            <IconButton edge="start">
              <StarHalfOutlined />
            </IconButton>
          </Grid>
        </StyledTableCell>
        <StyledTableCell align="left">
          <IconButton edge="start">
            <Checkbox
              color="success"
              checked={checked}
              onChange={handleCheckboxChange}
              sx={{ fontSize: "2rem" }}
            />
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="left">
          <IconButton onClick={handleClick}>
            <MoreHorizOutlined />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleBanUser}>
              {isLoading ? "Loading..." : banned ? "Unban User" : "Ban User"}
            </MenuItem>
            <MenuItem onClick={handleCheck}>
              {sendingEmail ? "Sending" : "Send Mail"}
            </MenuItem>
          </Menu>
        </StyledTableCell>
      </StyledTableRow>

      <EmailModal
        open={emailModal}
        id={id}
        handleClose={() => {
          setEmailModal(false);
          handleClose();
        }}
      />
    </>
  );
}

function EmailModal({ open, handleClose, id }) {
  const [sendEmail, { isLoading: sendingEmail }] = useSendEmailMutation();
  const handleSendEmail = async (values) => {
    const { subject, body } = values;

    // const idx = typeof id ==="string"? id : newIdx
    const { data, error } = await sendEmail({
      users: typeof id === "string" ? [id] : [...id],
      subject,
      body,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => handleClose(), 3000);
    }
    if (error) toast.error(error);
  };
  const validationSchema = Yup.object({
    subject: Yup.string("Enter Subject").required("Required"),
    body: Yup.string().required("Required"),
  });
  return (
    <NotificationModal isOpen={open} handleClose={handleClose}>
      <Grid item container>
        <Formik
          initialValues={{ subject: "", body: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSendEmail}
        >
          <Form>
            <Grid item container gap={2} flexDirection="column">
              <Typography variant="h2" textAlign="center" width="100%">
                Send Mail
              </Typography>
              <Grid item container>
                <FormikControl name="subject" placeholder="Subject" />
              </Grid>
              <Grid item>
                <Editor name="body" placeholder="Enter Email here..." />
              </Grid>
              <Grid item container>
                <CustomButton
                  type="submit"
                  isSubmitting={sendingEmail}
                  title="Send Mail"
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </NotificationModal>
  );
}
