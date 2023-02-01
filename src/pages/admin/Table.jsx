import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  MoreHorizOutlined,
  StarHalfOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
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
import { getDate, getImage } from "helpers";
import { toast } from "react-toastify";
import { useState } from "react";
import { useBanUsersMutation } from "redux/slices/adminSlice";

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
  const overflow = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
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
  const [state, setState] = useState(false);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="left">Join Date</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
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
                  <MenuItem onClick={handleClose}>Send Mail</MenuItem>
                </Menu>
              </StyledTableCell>
              <StyledTableCell align="left">
                <IconButton edge="start">
                  <MoreHorizOutlined />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map?.((row, index) => (
              <Rows
                row={row}
                key={index}
                state={state}
                ids={ids}
                setIds={setIds}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
function Rows({ row, state, ids, setIds }) {
  const {
    full_name,
    last_activity,
    post_count,
    avatar,
    id,
    createdAt,
    reputation,
    banned,
    email,
  } = row;
  const [banorUnban, { isLoading }] = useBanUsersMutation();

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
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "95%",
                  overflow: "hidden",
                }}
              >
                {full_name}
              </Typography>
              <Typography fontSize="inherit">New Member</Typography>
            </Grid>
          </Grid>
        </StyledTableCell>
        <StyledTableCell align="left">{getDate(createdAt)}</StyledTableCell>
        <StyledTableCell align="left">{email}</StyledTableCell>
        <StyledTableCell align="left">
          <Typography fontSize="inherit">
            {banned ? "Banned" : "Not Banned"}
          </Typography>
          {/* <VerifiedOutlined /> */}
        </StyledTableCell>
        <StyledTableCell align="left">{post_count}</StyledTableCell>
        <StyledTableCell align="left">
          {last_activity ? getDate(last_activity) : "No Activity"}
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
            <MenuItem onClick={handleClose}>Send Mail</MenuItem>
          </Menu>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}
