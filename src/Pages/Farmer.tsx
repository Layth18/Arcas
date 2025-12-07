import React, { useState } from "react";

type FormDataKeys = "location" | "trees_0_7" | "trees_7_20" | "trees_20_50" | "trees_50_90" | "trees_90_plus";
type FormDataType = Record<FormDataKeys, string>;

export default function FarmerDashboard() {
  const [view, setView] = useState("dashboard");
  const [selectedField, setSelectedField] = useState("Field 1");
  const [formData, setFormData] = useState<FormDataType>({
    location: "",
    trees_0_7: "",
    trees_7_20: "",
    trees_20_50: "",
    trees_50_90: "",
    trees_90_plus: ""
  });

  const [previousYields, setPreviousYields] = useState([{ year: "", yield: "" }]);

  const fields = ["Field 1", "Field 2", "Field 3"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleYieldChange = (index: number, field: string, value: string) => {
    const newYields = [...previousYields];
    newYields[index][field as keyof typeof newYields[0]] = value;
    setPreviousYields(newYields);
  };

  const addYieldEntry = () => {
    setPreviousYields([...previousYields, { year: "", yield: "" }]);
  };

  const removeYieldEntry = (index: number) => {
    if (previousYields.length > 1) {
      setPreviousYields(previousYields.filter((_, i) => i !== index));
    }
  };

  const handleCreateField = () => {
    console.log("Creating field:", { ...formData, previousYields });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3e8] via-white to-[#f0efd9]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#858643] to-[#a0a052] bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">Manage your olive fields</p>
            </div>

            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <svg className="w-5 h-5 text-[#858643]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">{fields.length} Fields</span>
            </div>
          </div>

          {/* TABS */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 p-2 shadow-lg inline-flex gap-2">
            <button
              onClick={() => setView("dashboard")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                view === "dashboard"
                  ? "bg-gradient-to-r from-[#858643] to-[#a0a052] text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14" />
                </svg>
                Overview
              </div>
            </button>

            <button
              onClick={() => setView("create")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                view === "create"
                  ? "bg-gradient-to-r from-[#858643] to-[#a0a052] text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Create Field
              </div>
            </button>
          </div>
        </div>

        {/* DASHBOARD VIEW */}
        {view === "dashboard" && (
          <div className="space-y-6">
            {/* FIELD SELECT */}
            <div className="relative">
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full sm:w-auto px-6 py-3 bg-white/70 border-2 border-gray-100 rounded-xl pr-12 focus:outline-none focus:border-[#858643] transition-all"
              >
                {fields.map((field) => (
                  <option key={field}>{field}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* YIELD CARD */}
            <div className="relative bg-gradient-to-br from-[#858643] to-[#a0a052] rounded-2xl p-10 text-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              <div className="relative z-10">
                <div className="text-white/90 text-sm font-semibold mb-3 uppercase tracking-wide">
                  Estimated Yearly Yield
                </div>
                <div className="text-white text-6xl font-bold mb-2">12,400 kg</div>
                <div className="text-white/80 text-sm">Based on current conditions</div>
              </div>
            </div>

            {/* WEATHER CARDS */}
            <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[#858643] to-[#a0a052] rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Weather Forecast</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Temperature */}
                <div className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#7a6040] hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-[#7a6040]/10 to-[#8b7050]/10 rounded-lg border border-[#7a6040]/20">
                      <svg className="w-5 h-5 text-[#7a6040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-gray-500 text-sm font-semibold">Temperature</div>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#7a6040] to-[#8b7050] bg-clip-text text-transparent">28°C</div>
                </div>

                {/* Rainfall */}
                <div className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#858643] hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-[#858643]/10 to-[#a0a052]/10 rounded-lg border border-[#858643]/20">
                      <svg className="w-5 h-5 text-[#858643]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <div className="text-gray-500 text-sm font-semibold">Rainfall</div>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#858643] to-[#a0a052] bg-clip-text text-transparent">45 mm</div>
                </div>

                {/* Humidity */}
                <div className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#9ca855] hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-[#9ca855]/10 to-[#b5c066]/10 rounded-lg border border-[#9ca855]/20">
                      <svg className="w-5 h-5 text-[#9ca855]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="text-gray-500 text-sm font-semibold">Humidity</div>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#9ca855] to-[#b5c066] bg-clip-text text-transparent">72%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATE FIELD VIEW */}
        {view === "create" && (
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl">

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#858643] to-[#a0a052] rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">New Field</h2>
            </div>

            {/* LOCATION */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter field location"
                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#858643] transition-all"
              />
            </div>

            {/* YIELDS */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Previous Yields</h3>
                <button
                  onClick={addYieldEntry}
                  className="px-4 py-2 bg-gradient-to-r from-[#858643] to-[#a0a052] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  + Add Year
                </button>
              </div>

              {previousYields.map((entry, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="number"
                    value={entry.year}
                    onChange={(e) => handleYieldChange(index, "year", e.target.value)}
                    placeholder="Year"
                    className="w-32 px-4 py-3 bg-white border-2 border-gray-100 rounded-lg focus:outline-none focus:border-[#858643] transition-all"
                  />

                  <input
                    type="number"
                    value={entry.yield}
                    onChange={(e) => handleYieldChange(index, "yield", e.target.value)}
                    placeholder="Yield (kg)"
                    className="flex-1 px-4 py-3 bg-white border-2 border-gray-100 rounded-lg focus:outline-none focus:border-[#858643] transition-all"
                  />

                  <button
                    onClick={() => removeYieldEntry(index)}
                    className="px-4 py-3 text-[#7a6040] hover:bg-[#7a6040]/10 rounded-lg font-bold transition-all"
                    disabled={previousYields.length === 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* TREE AGE GROUPS */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tree Age Distribution</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: "trees_0_7", label: "0–7 years 🌱" },
                  { name: "trees_7_20", label: "7–20 years 🌿" },
                  { name: "trees_20_50", label: "20–50 years 🌳" },
                  { name: "trees_50_90", label: "50–90 years 🌲" },
                  { name: "trees_90_plus", label: "90+ years 🏛️" }
                ].map((f) => (
                  <input
                    key={f.name}
                    type="number"
                    name={f.name}
                    value={formData[f.name as FormDataKeys]}
                    onChange={handleInputChange}
                    placeholder={f.label}
                    className="w-full px-5 py-3 bg-white border-2 border-gray-100 rounded-lg focus:outline-none focus:border-[#858643] transition-all"
                  />
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleCreateField}
              className="w-full bg-gradient-to-r from-[#858643] to-[#a0a052] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Create Field
            </button>
          </div>
        )}

      </div>
    </div>
  );
}