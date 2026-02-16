import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./ProfProfile.css";
import { useDispatch } from "react-redux";
import { updataprofessure } from "../../redux/userReducer";

const ProfProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stored = localStorage.getItem("userlogin");

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
  });

  useEffect(() => {
    if (!stored) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);

    setForm({
      name: parsed.name || "",
      email: parsed.email || "",
      department: parsed.department || "",
      password: "",
    });
  }, [stored, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
      department: form.department,
      ...(form.password ? { password: form.password } : {}),
    };

    dispatch(updataprofessure(updatedUser));
    localStorage.setItem("userlogin", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setEditing(false);
    setForm({ ...form, password: "" });
  };

  if (!user) return null;

  return (
    <div className="prof-profile">
      <div className="prof-profile-container">
        <h1>Professor Profile</h1>

        <div className="profile-section">
          <label>Name</label>
          {editing ? (
            <input name="name" value={form.name} onChange={handleChange} />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        <div className="profile-section">
          <label>Email</label>
          {editing ? (
            <input name="email" value={form.email} onChange={handleChange} />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        <div className="profile-section">
          <label>Department</label>
          {editing ? (
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          ) : (
            <p>{user.department}</p>
          )}
        </div>

        {editing && (
          <div className="profile-section">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>
        )}

        <div className="profile-actions">
          {editing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button
                className="secondary"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfProfile;
