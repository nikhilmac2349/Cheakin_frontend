import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, fetchPlaned, fetchActual } from "../../redux/userReducer";
import * as XLSX from "xlsx";
import "./Dashboard.css";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { professors, students, planned, actual } = useSelector(
    (state) => state.users
  );

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filterSemester, setFilterSemester] = useState("All");
  const [filterFrequency, setFilterFrequency] = useState("All");
  const [sortField, setSortField] = useState("student");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchPlaned());
    dispatch(fetchActual());
  }, [dispatch]);

  useEffect(() => {
    const stored = localStorage.getItem("userlogin");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  if (!user) return null;

  const professorMap = {};
  professors.forEach(p => (professorMap[p.professorId] = p.name));

  const studentMap = {};
  students.forEach(s => (studentMap[s.studentId] = s.name));

  const actualMap = {};
  actual.forEach(a => {
    const key = `${a.professorId}_${a.studentId}`;
    actualMap[key] = (actualMap[key] || 0) + 1;
  });

  const myPlanned = planned.filter(
    p => p.professorId === user.professorId
  );

  let rows = myPlanned.map(p => {
    const key = `${p.professorId}_${p.studentId}`;
    const actualCount = actualMap[key] || 0;

    return {
      professor: professorMap[p.professorId] || "Unknown",
      student: studentMap[p.studentId] || "Unknown",
      studentId: p.studentId,
      semester: p.semester,
      frequency: p.frequency,
      planned: p.plannedCount,
      actual: actualCount,
      diff: actualCount - p.plannedCount,
    };
  });

  if (filterSemester !== "All") {
    rows = rows.filter(r => r.semester === filterSemester);
  }

  if (filterFrequency !== "All") {
    rows = rows.filter(r => r.frequency === filterFrequency);
  }

  if (search.trim() !== "") {
    rows = rows.filter(r =>
      r.student.toLowerCase().includes(search.toLowerCase())
    );
  }

  rows.sort((a, b) => {
    let av = a[sortField];
    let bv = b[sortField];

    if (typeof av === "string") av = av.toLowerCase();
    if (typeof bv === "string") bv = bv.toLowerCase();

    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const semesters = ["All", ...new Set(myPlanned.map(p => p.semester))];
  const frequencies = ["All", ...new Set(myPlanned.map(p => p.frequency))];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const handleExport = () => {
    const data = rows.map(r => ({
      Student: r.student,
      Semester: r.semester,
      Frequency: r.frequency,
      Planned: r.planned,
      Actual: r.actual,
      Difference: r.diff,
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), "Report");
    XLSX.writeFile(wb, "checkin_report.xlsx");
  };

  const Badge = ({ diff }) => {
    if (diff === 0) return <span className="badge">On Track</span>;
    if (diff > 0) return <span className="badge badge--green">+{diff}</span>;
    return <span className="badge badge--red">{diff}</span>;
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Check-In Dashboard</h1>
          <p>{user.name}</p>
        </div>

        <div className="header-actions">
          <button
            className="adding-btn"
            onClick={() => navigate("/add-planned")}
          >
            + Add Planned
          </button>

          <button
            className="adding-btn"
            onClick={() => navigate("/add-actual")}
          >
            + Add Actual
          </button>

          <button onClick={handleExport}>
            Export Excel
          </button>
        </div>
      </div>

      <div className="filters">
        <input
          className="search-input"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterSemester}
          onChange={(e) => setFilterSemester(e.target.value)}
        >
          {semesters.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={filterFrequency}
          onChange={(e) => setFilterFrequency(e.target.value)}
        >
          {frequencies.map(f => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("student")}>Student</th>
            <th onClick={() => handleSort("semester")}>Semester</th>
            <th onClick={() => handleSort("frequency")}>Frequency</th>
            <th onClick={() => handleSort("planned")}>Planned</th>
            <th onClick={() => handleSort("actual")}>Actual</th>
            <th>Diff</th>
            <th>Status</th>
            <th>Profile</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.student}</td>
              <td>{r.semester}</td>
              <td>{r.frequency}</td>
              <td>{r.planned}</td>
              <td>{r.actual}</td>
              <td>{r.diff}</td>
              <td><Badge diff={r.diff} /></td>
              <td>
                <button
                  className="profile-btn"
                  onClick={() => navigate(`/student/${r.studentId}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
