import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaned, fetchActual } from "../../redux/userReducer";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { planned, actual } = useSelector((state) => state.users);

  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    dispatch(fetchPlaned());
    dispatch(fetchActual());
  }, [dispatch]);

  useEffect(() => {
    const stored = localStorage.getItem("userlogin");

    if (!stored) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, [navigate]);

  if (!user) return null;

  const myPlanned = planned.filter(
    (p) => p.professorId === user.professorId
  );

  const totalPlanned = myPlanned.reduce(
    (sum, p) => sum + p.plannedCount,
    0
  );

  const totalActual = actual.filter(
    (a) => a.professorId === user.professorId
  ).length;

  return (
    <div className="home">
      <div className="top-actions">
        <button
          className="add-btn"
          onClick={() => navigate("/add-planned")}
        >
          + Add Planned
        </button>

        <button
          className="add-btn"
          onClick={() => navigate("/add-actual")}
        >
          + Add Actual
        </button>
      </div>

      <h1>
        {greeting}, <span>{user.name}</span>
      </h1>

      <div className="home-cards">
        <div className="home-card">
          <p>Total Planned</p>
          <h2>{totalPlanned}</h2>
        </div>

        <div className="home-card">
          <p>Total Actual</p>
          <h2>{totalActual}</h2>
        </div>
      </div>

      <div className="home-actions">
        <button onClick={() => navigate("/dashboard")}>
          Go To Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
