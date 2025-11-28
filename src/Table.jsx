import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogs, setTotal } from "./LogSlice";
export default function DataTable() {
  // const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const rows = useSelector((state) => state?.logBag?.logs);
  const total = useSelector((state) => state?.logBag?.total);
  const isFiltered = useSelector((state) => state?.logBag?.isFiltered);
  const storeFilters = useSelector((state) => state?.logBag?.filters);
  const [page, setPage] = useState(0);
  console.log("Page: ", page);

  const [pageSize, setPageSize] = useState(100);
  console.log("pageSize: ", pageSize);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPage();
  }, [page, pageSize, storeFilters]);
  const fetchPage = () => {
    setLoading(true);
    console.log("Sending to API:", page, pageSize);
    axios
      .post("http://localhost:8080/filter", storeFilters, {
        params: { page: page, pageSize: pageSize },
      })
      .then((res) => {
        console.log("response: ", res);
        const data = res.data.entries.map((e, index) => ({
          id: page * pageSize + index + 1,
          timestamp: e.TimeStamp,
          level: e.Level?.Level,
          component: e.Component?.Component,
          host: e.Host?.Host,
          requestid: e.RequestId,
          message: e.Message,
        }));
        console.log("rows: ", data);
        // setRows(data);
        dispatch(setLogs(data));
        dispatch(setTotal(res.data.total));
      })
      .finally(() => setLoading(false));
  };
  return (
    <div
      style={{
        height: "600px",
        width: "100%",
        overflow: "auto",
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
          if (isFiltered) {
            // fetch filtered page
            fetchFilterPage(model.page, model.pageSize);
          } else {
            // fetch normal page
            fetchPage();
          }
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        columns={[
          { field: "id", headerName: "SL NO.", width: 80 },
          { field: "timestamp", headerName: "TIMESTAMP", width: 180 },
          { field: "level", headerName: "LEVEL", width: 120 },
          { field: "component", headerName: "COMPONENT", width: 150 },
          { field: "host", headerName: "HOST", width: 150 },
          { field: "requestid", headerName: "REQUEST ID", width: 150 },
          { field: "message", headerName: "MESSAGE", width: 300 },
        ]}
      />
    </div>
  );
}
