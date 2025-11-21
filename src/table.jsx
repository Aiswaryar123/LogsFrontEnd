import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function createData(time, level, component, host, requestid, message) {
  return { time, level, component, host, requestid, message };
}
const rows = [
  createData(
    "2025-11-11T18:11:50.23+05:30",
    "INFO",
    "api-server",
    "web01",
    "req-20wps8-6107",
    " Memory usage at 742%"
  ),
  createData(
    "2025-11-11T18:11:44.084+05:30",
    "WARN",
    "database",
    "web02",
    "req-1rphnt-5268",
    "2FA verification completed"
  ),
  createData(
    "2025-11-11T18:11:49.091+05:30",
    "ERROR",
    "cache",
    "cache01",
    "req-g81idm-2461",
    "Cache hit for key product:xyz"
  ),
  createData(
    "2025-11-11T18:11:46.772+05:30",
    "DEBUG",
    "worker",
    "worker01",
    "req-g81idm-2461",
    "Token expired"
  ),
  createData(
    "2025-11-11T18:11:44.504+05:30",
    "ERROR",
    "auth",
    "db01",
    "req-3saxta-5125",
    "Cache miss for key product:xyz"
  ),
];
export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Level</TableCell>
            <TableCell align="right">Component</TableCell>
            <TableCell align="right">Host</TableCell>
            <TableCell align="right">Request ID</TableCell>
            <TableCell align="right">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.level}</TableCell>
              <TableCell align="right">{row.component}</TableCell>
              <TableCell align="right">{row.host}</TableCell>
              <TableCell align="right">{row.requestid}</TableCell>
              <TableCell align="right">{row.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
