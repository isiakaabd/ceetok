import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  CheckBox,
  StarHalfOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { getDate, getImage } from "helpers";

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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="left">Join Date</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Verification</StyledTableCell>
            <StyledTableCell align="left">Post</StyledTableCell>
            <StyledTableCell align="left">Last Activity</StyledTableCell>
            <StyledTableCell align="left">Reputation</StyledTableCell>
            <StyledTableCell align="left">
              <CheckBox />
            </StyledTableCell>
            <StyledTableCell align="left">...</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map?.((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell
                component="th"
                sx={{ maxWidth: "20rem" }}
                scope="row"
              >
                <Grid item container gap={2} width="100%" flexWrap="nowrap">
                  <Avatar alt={row.full_name} src={getImage(row.avatar)}>
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
                      {row.full_name}
                    </Typography>
                    <Typography fontSize="inherit">New Member</Typography>
                  </Grid>
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="left">
                {getDate(row.createdAt)}
              </StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">
                {row.verification === "Verified" ? (
                  <Grid item container alignItems="center">
                    <Typography fontSize="inherit">Verified</Typography>
                    <VerifiedOutlined />
                  </Grid>
                ) : (
                  <Typography>unVerified</Typography>
                )}
              </StyledTableCell>
              <StyledTableCell align="left">{row.post_count}</StyledTableCell>
              <StyledTableCell align="left">{row.lastActivity}</StyledTableCell>
              <StyledTableCell align="left">
                <Grid item container alignItems="center">
                  <Typography>{row.reputation}</Typography>
                  <IconButton edge="start">
                    <StarHalfOutlined />
                  </IconButton>
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="left">
                <IconButton edge="start">
                  <CheckBox color="success" />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
