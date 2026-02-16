import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "./Student.css";

const Student = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const { students, planned, actual, professors } = useSelector(
    state => state.users
  );

  const stored = localStorage.getItem("userlogin");
  const user = stored ? JSON.parse(stored) : null;

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const student = useMemo(
    () => students.find(s => s.studentId === studentId),
    [students, studentId]
  );

  const plannedRows = useMemo(
    () =>
      planned.filter(
        p =>
          p.studentId === studentId &&
          (!user || p.professorId === user.professorId)
      ),
    [planned, studentId, user]
  );

  const actualRows = useMemo(
    () =>
      actual.filter(
        a =>
          a.studentId === studentId &&
          (!user || a.professorId === user.professorId)
      ),
    [actual, studentId, user]
  );

  if (!student) return <div>Student not found</div>;

  return (
    <div className="student-page">
      <div className="student-header">
        <h2>{student.name}</h2>
        <p>ID: {student.studentId}</p>
        <p>Program: {student.program}</p>
        <p>Year: {student.year}</p>
        <p>Email: {student.email}</p>
      </div>

      <div className="student-columns">
        <div className="column">
          <h3>Planned Check-Ins</h3>
          {plannedRows.map(p => (
            <div key={p.planId} className="card">
              <p>Semester: {p.semester}</p>
              <p>Frequency: {p.frequency}</p>
              <p>Planned: {p.plannedCount}</p>
            </div>
          ))}
        </div>

        <div className="column">
          <h3>Actual Check-Ins</h3>
          {actualRows.map(a => (
            <div key={a.checkInId} className="card">
              <p>Date: {a.date}</p>
              <p>Duration: {a.durationMinutes} mins</p>
              <p>Notes: {a.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Student;
