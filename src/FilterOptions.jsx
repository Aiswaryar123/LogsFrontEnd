import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch } from "react-redux";
import { setFilters } from "./LogSlice";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function CheckboxLabels() {
  const [levels, setLevels] = useState([]);
  console.log("level: ", levels);
  const [components, setComponents] = useState([]);
  console.log("component: ", components);
  const [hosts, setHosts] = useState([]);
  console.log("host: ", hosts);
  const [requestId, setRequestId] = useState("");
  console.log("requestId: ", requestId);
  const [startTime, setStartTime] = useState(null);
  console.log("startTime: ", startTime);
  const [endTime, setEndTime] = useState(null);
  console.log("endTime: ", endTime);
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(100);
  // const [loading, setLoading] = useState(false);
  const filter = {
    levels: levels,
    components: components,
    hosts: hosts,
    requestId: requestId,
    startTime: startTime
      ? dayjs(startTime).format("YYYY-MM-DD HH:mm:ss")
      : null,
    endTime: endTime ? dayjs(endTime).format("YYYY-MM-DD HH:mm:ss") : null,
  };
  console.log("filter: ", filter);

  const dispatch = useDispatch();
  const handleCheckbox = (value, list, setList) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };
  //   const fetchFilterPage = () => {
  //     setLoading(true);
  //     // console.log("Sending to API:", page, pageSize);
  //     // const page = 0
  //     // const pageSize = 100
  //     axios
  //       .post("http://localhost:8080/api/logs",
  //         {
  //           level: levels,
  //           component: components,
  //           host: hosts,
  //           requestId:requestId,
  //           timestamp: timeStamp
  //         },{
  //           params: {page,pageSize}
  //         })
  //       .then((res) => {
  //         console.log("filter side response: ", res);
  //         const data = res.data.entries.map((e, index) => ({
  //           id: page * pageSize + index + 1,
  //           timestamp: e.TimeStamp,
  //           level: e.Level?.Level,
  //           component: e.Component?.Component,
  //           host: e.Host?.Host,
  //           requestid: e.RequestId,
  //           message: e.Message,
  //         }));
  //         console.log("filter side rows: ", data);
  //         // setRows(data);
  //         dispatch(setLogs(data));
  //         dispatch(setTotal(res.data.count));
  //         dispatch(setFilters({
  //   levels,
  //   components,
  //   hosts,
  //   requestId,
  //   timeStamp
  // }));
  //         dispatch(setIsFiltered(true));
  //       }).catch((err) => console.log(err))
  //       .finally(() => setLoading(false));
  //   };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className="mt-10">
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl border">
          <FormGroup className="space-y-5">
            <div>
              <label className="font-semibold">Level:</label>
              <div className="flex gap-4 items-center mt-2">
                {["INFO", "WARN", "ERROR", "DEBUG"].map((lvl) => (
                  <FormControlLabel
                    key={lvl}
                    control={
                      <Checkbox
                        checked={levels.includes(lvl)}
                        onChange={() => handleCheckbox(lvl, levels, setLevels)}
                      />
                    }
                    label={lvl}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="font-semibold">Component:</label>
              <div className="flex gap-4 items-center mt-2">
                {["api-server", "database", "cache", "worker", "auth"].map(
                  (cmp) => (
                    <FormControlLabel
                      key={cmp}
                      control={
                        <Checkbox
                          checked={components.includes(cmp)}
                          onChange={() =>
                            handleCheckbox(cmp, components, setComponents)
                          }
                        />
                      }
                      label={cmp}
                    />
                  )
                )}
              </div>
            </div>
            <div>
              <label className="font-semibold">Host:</label>
              <div className="flex gap-4 items-center mt-2">
                {["web01", "web02", "cache01", "worker01", "db01"].map(
                  (hst) => (
                    <FormControlLabel
                      key={hst}
                      control={
                        <Checkbox
                          checked={hosts.includes(hst)}
                          onChange={() => handleCheckbox(hst, hosts, setHosts)}
                        />
                      }
                      label={hst}
                    />
                  )
                )}
              </div>
            </div>
            <div>
              <label className="font-semibold">Request ID:</label>
              <TextField
                fullWidth
                label="Enter Request ID"
                variant="outlined"
                className="mt-1"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
              />
            </div>
            {/* <div>
              <label className="font-semibold">Timestamp:</label>
              <TextField
                fullWidth
                label=">2025-11-17 10:00:00"
                variant="outlined"
                className="mt-1"
                value={timeStamp}
                onChange={(e) => setTimeStamp(e.target.value)}
              />
            </div> */}
            {/* Date Range */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Time"
                value={startTime}
                ampm={false}
                onChange={(newValue) => setStartTime(newValue)}
              />
              <DateTimePicker
                label="End Time"
                ampm={false}
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </LocalizationProvider>
            <div className="flex justify-center">
              <button
                className="bg-black text-white px-5 py-2 rounded-md shadow"
                onClick={() => dispatch(setFilters(filter))}
              >
                Search
              </button>
            </div>
          </FormGroup>
        </div>
      </Container>
    </>
  );
}
