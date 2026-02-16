import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addstudent, addPlanned } from "../../redux/userReducer";
import { useNavigate } from "react-router";
import "./AddPlanned.css";

const AddPlanned = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [plannedCount, setPlannedCount] = useState("");
  const [semester, setSemester] = useState("");

  const user = JSON.parse(localStorage.getItem("userlogin"));

  const generateStudentId = () => {
    return "S" + Date.now().toString().slice(-4);
  };

  const generatePlanId = () => {
    return "PL" + Date.now().toString().slice(-3);
  };

  const handleSubmit = () => {
    if (!name || !email) return;

    let student = students.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    let studentId;

    if (!student) {
      studentId = generateStudentId();

      dispatch(
        addstudent({
          studentId,
          name,
          email,
          program,
          year,
        })
      );
    } else {
      studentId = student.studentId;
    }

    dispatch(
      addPlanned({
        planId: generatePlanId(),
        professorId: user.professorId,
        studentId,
        frequency,
        plannedCount: Number(plannedCount),
        semester,
        id: Date.now().toString().slice(-4),
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="add-planned">
      <h2>Add Planned Check-In</h2>

      <input placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Student Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Program" value={program} onChange={e => setProgram(e.target.value)} />
      <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />

      <select value={frequency} onChange={e => setFrequency(e.target.value)}>
        <option>Weekly</option>
        <option>Bi-Weekly</option>
        <option>Monthly</option>
        
      </select>

      <input placeholder="Planned Count" value={plannedCount} onChange={e => setPlannedCount(e.target.value)} />
      <input placeholder="Semester (e.g. Spring 2026)" value={semester} onChange={e => setSemester(e.target.value)} />

      <button onClick={handleSubmit}>Save Planned</button>
    </div>
  );
};

export default AddPlanned;
