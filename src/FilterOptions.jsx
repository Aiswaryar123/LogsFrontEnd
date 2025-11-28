import { useState } from "react";
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
  const [components, setComponents] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [requestId, setRequestId] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const dispatch = useDispatch();

  const filter = {
    levels,
    components,
    hosts,
    requestId,
    startTime: startTime
      ? dayjs(startTime).format("YYYY-MM-DD HH:mm:ss")
      : null,
    endTime: endTime ? dayjs(endTime).format("YYYY-MM-DD HH:mm:ss") : null,
  };

  const togglePill = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  // Uniform pill style for all boxes, auto width
  const pillClasses = (selected) =>
    `px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition
    ${
      selected
        ? "bg-black text-white border-black"
        : "bg-gray-100 text-gray-700 border-gray-300"
    }
    hover:bg-black hover:text-white`;

  const toUpper = (text) => text.toUpperCase();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className="mt-12 mb-12">
        <div className="bg-white shadow-xl rounded-3xl p-12 border border-gray-200">
          <h1 className="text-3xl font-bold text-center mb-12 text-slate-900 tracking-wide">
            LOG FILTERS
          </h1>

          {/* TOP ROW - REQUEST ID & DATE PICKERS */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <TextField
              label="Request ID"
              value={requestId}
              variant="outlined"
              onChange={(e) => setRequestId(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </LocalizationProvider>
          </div>

          {/* BOTTOM ROW - LEVEL, COMPONENT, HOST BOXES */}
          <div className="grid grid-cols-3 gap-4">
            {/* LEVEL BOX */}
            <div className="p-4 border border-gray-300 rounded-xl bg-gray-50">
              <h2 className="text-lg font-semibold mb-2 text-slate-800 text-center">
                LEVEL
              </h2>
              <div className="flex gap-2 justify-center flex-wrap">
                {["INFO", "WARN", "ERROR", "DEBUG"].map((lvl) => (
                  <span
                    key={lvl}
                    className={pillClasses(levels.includes(lvl))}
                    onClick={() => togglePill(lvl, levels, setLevels)}
                  >
                    {toUpper(lvl)}
                  </span>
                ))}
              </div>
            </div>

            {/* COMPONENT BOX */}
            <div className="p-4 border border-gray-300 rounded-xl bg-gray-50">
              <h2 className="text-lg font-semibold mb-2 text-slate-800 text-center">
                COMPONENT
              </h2>
              <div className="flex gap-2 justify-center flex-wrap">
                {["api-server", "database", "cache", "worker", "auth"].map(
                  (cmp) => (
                    <span
                      key={cmp}
                      className={pillClasses(components.includes(cmp))}
                      onClick={() => togglePill(cmp, components, setComponents)}
                    >
                      {toUpper(cmp)}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* HOST BOX */}
            <div className="p-4 border border-gray-300 rounded-xl bg-gray-50">
              <h2 className="text-lg font-semibold mb-2 text-slate-800 text-center">
                HOST
              </h2>
              <div className="flex gap-2 justify-center flex-wrap">
                {["web01", "web02", "cache01", "worker01", "db01"].map(
                  (hst) => (
                    <span
                      key={hst}
                      className={pillClasses(hosts.includes(hst))}
                      onClick={() => togglePill(hst, hosts, setHosts)}
                    >
                      {toUpper(hst)}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* APPLY BUTTON */}
          <div className="flex justify-center mt-8">
            <button
              className="bg-black text-white px-12 py-4 rounded-2xl shadow-lg font-semibold text-lg hover:bg-gray-900 transition"
              onClick={() => dispatch(setFilters(filter))}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}
