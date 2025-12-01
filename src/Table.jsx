import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogs, setTotal } from "./LogSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function DataTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state?.logBag?.logs);
  const total = useSelector((state) => state?.logBag?.total);
  const isFiltered = useSelector((state) => state?.logBag?.isFiltered);
  const storeFilters = useSelector((state) => state?.logBag?.filters);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPage();
  }, [page, pageSize, storeFilters]);

  const fetchPage = () => {
    setLoading(true);
    axios
      .post("http://localhost:8080/filter", storeFilters, {
        params: { page: page, pageSize: pageSize },
      })
      .then((res) => {
        const data = res.data.entries.map((e, index) => ({
          id: page * pageSize + index + 1,
          timestamp: e.TimeStamp,
          level: e.Level?.Level,
          component: e.Component?.Component,
          host: e.Host?.Host,
          requestid: e.RequestId,
          message: e.Message,
        }));
        dispatch(setLogs(data));
        dispatch(setTotal(res.data.total));
      })
      .finally(() => setLoading(false));
  };

  // Dark theme for DataGrid
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#0f0f0f",
        paper: "#1a1a1a",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div
        style={{
          height: "600px",
          width: "100%",
          background: "#121212",
          // padding: "10px",
          borderRadius: "10px",
        }}
      >
        <DataGrid
          rows={rows}
          rowCount={total}
          loading={loading}
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
            fetchPage();
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          sx={{
            border: "1px solid #333",
            color: "#fff",
            backgroundColor: "#1c1c1c",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#222",
              color: "#fff",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              borderColor: "#333",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#222",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#2b2b2b",
            },
          }}
          columns={[
            { field: "id", headerName: "SL NO.", width: 80 },
            { field: "timestamp", headerName: "TIMESTAMP", width: 250 },
            { field: "level", headerName: "LEVEL", width: 120 },
            { field: "component", headerName: "COMPONENT", width: 150 },
            { field: "host", headerName: "HOST", width: 150 },
            { field: "requestid", headerName: "REQUEST ID", width: 150 },
            { field: "message", headerName: "MESSAGE", width: 300 },
          ]}
        />
      </div>
    </ThemeProvider>
  );
}
