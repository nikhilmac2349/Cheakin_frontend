import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createactualplan,
  fetchStudents,
  fetchPlaned
} from "../../redux/userReducer";
import "./AddActual.css";

const AddActual = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { students, planned } = useSelector((state) => state.users);

  const stored = localStorage.getItem("userlogin");
  const user = stored ? JSON.parse(stored) : null;

  const today = new Date().toISOString().split("T")[0];

  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState(today);
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchPlaned());
  }, [dispatch]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const allowedStudentIds = planned
    .filter(p => p.professorId === user.professorId)
    .map(p => p.studentId);

  const filteredStudents = students.filter(s =>
    allowedStudentIds.includes(s.studentId)
  );

  function handleSubmit(e) {
    e.preventDefault();

    const newActual = {
      checkInId: "AC" + Date.now(),
      professorId: user.professorId,
      studentId,
      date,
      durationMinutes: Number(durationMinutes),
      notes,
    };

    dispatch(createactualplan(newActual));
    navigate("/");
  }

  return (
    <div className="add-actual">
      <h2>Add Actual Check-In</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        >
          <option value="">Select Student</option>

          {filteredStudents.map((s) => (
            <option key={s.studentId} value={s.studentId}>
              {s.studentId} - {s.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          placeholder="Duration (minutes)"
          type="number"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          required
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddActual;
