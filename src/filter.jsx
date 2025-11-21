import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function FilterOptions() {
  const [levels, setLevels] = useState([]);
  const [components, setComponents] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [requestId, setRequestId] = useState("");
  const [timeStamp, setTimeStamp] = useState("");

  const handleCheckbox = (value, list, setList) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Level */}
        <div className="rounded-xl border border-gray-300 shadow bg-white p-5">
          <h3 className="font-semibold text-xl mb-3 text-center border-b pb-2">
            Level
          </h3>
          <FormGroup>
            {["INFO", "ERROR", "DEBUG", "WARN"].map((lvl) => (
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
          </FormGroup>
        </div>

        {/* Component */}
        <div className="rounded-xl border border-gray-300 shadow bg-white p-5">
          <h3 className="font-semibold text-xl mb-3 text-center border-b pb-2">
            Component
          </h3>
          <FormGroup>
            {["api-server", "auth", "cache", "database", "worker"].map(
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
          </FormGroup>
        </div>

        {/* Host */}
        <div className="rounded-xl border border-gray-300 shadow bg-white p-5">
          <h3 className="font-semibold text-xl mb-3 text-center border-b pb-2">
            Host
          </h3>
          <FormGroup>
            {["cache01", "db01", "web01", "web02", "worker"].map((hst) => (
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
            ))}
          </FormGroup>
        </div>
      </div>

      {/* Inputs row */}
      <div className="flex gap-6 mt-6">
        <div className="flex-1 border shadow rounded-xl p-5 bg-white">
          <label className="font-semibold block mb-1">Request ID</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="req-445kyu-9812"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
          />
        </div>

        <div className="flex-1 border shadow rounded-xl p-5 bg-white">
          <label className="font-semibold block mb-1">Time Stamp</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="2025-10-23 15:17:42"
            value={timeStamp}
            onChange={(e) => setTimeStamp(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex justify-center mt-8">
        <button className="bg-black text-white font-bold px-10 py-3 rounded-lg shadow hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  );
}
