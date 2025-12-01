import { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch } from "react-redux";
import { setFilters } from "./LogSlice";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

  const pillClasses = (selected) =>
    `px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition
    ${
      selected
        ? "bg-indigo-600 text-white border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        : "bg-[#262626] text-gray-300 border-[#333] hover:bg-[#333]"
    }`;

  const toUpper = (text) => text.toUpperCase();

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

      <div className=" bg-[#0f0f0f] py-14">
        <Container maxWidth="xl">
          <div className="bg-[#121212] shadow-[0_0_20px_rgba(255,255,255,0.07)] rounded-3xl p-12 border border-gray-800">
            {/* Heading */}
            <h1 className="text-4xl font-extrabold text-center mb-12 text-white tracking-wide">
              LOG SEARCH FILTERS
            </h1>

            {/* INPUTS */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <TextField
                label="Request ID"
                value={requestId}
                variant="outlined"
                fullWidth
                onChange={(e) => setRequestId(e.target.value)}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
              </LocalizationProvider>
            </div>

            {/* FILTER GROUPS */}
            <div className="grid grid-cols-3 gap-6">
              {/* LEVEL */}
              <div className="p-6 border border-gray-700 rounded-xl bg-[#1a1a1a] shadow-[0_0_10px_rgba(255,255,255,0.03)]">
                <h2 className="text-lg font-semibold mb-4 text-gray-200 text-center">
                  LEVEL
                </h2>
                <div className="flex gap-3 justify-center flex-wrap">
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

              {/* COMPONENT */}
              <div className="p-6 border border-gray-700 rounded-xl bg-[#1a1a1a] shadow-[0_0_10px_rgba(255,255,255,0.03)]">
                <h2 className="text-lg font-semibold mb-4 text-gray-200 text-center">
                  COMPONENT
                </h2>
                <div className="flex gap-3 justify-center flex-wrap">
                  {["api-server", "database", "cache", "worker", "auth"].map(
                    (cmp) => (
                      <span
                        key={cmp}
                        className={pillClasses(components.includes(cmp))}
                        onClick={() =>
                          togglePill(cmp, components, setComponents)
                        }
                      >
                        {toUpper(cmp)}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* HOST */}
              <div className="p-6 border border-gray-700 rounded-xl bg-[#1a1a1a] shadow-[0_0_10px_rgba(255,255,255,0.03)]">
                <h2 className="text-lg font-semibold mb-4 text-gray-200 text-center">
                  HOST
                </h2>
                <div className="flex gap-3 justify-center flex-wrap">
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

            {/* BUTTON */}
            <div className="flex justify-center mt-10">
              <button
                className="bg-indigo-600 text-white px-14 py-4 rounded-2xl 
                  shadow-[0_0_20px_rgba(255,255,255,0.07)] 
                  font-semibold text-xl hover:bg-indigo-500 transition"
                onClick={() => dispatch(setFilters(filter))}
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}
