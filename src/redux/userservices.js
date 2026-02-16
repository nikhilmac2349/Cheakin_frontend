import axios from "axios";

const BASE_URL = "http://localhost:5244";

// ____________________________________

const fetchProfessure = async () => {
    const res = await axios.get(`${BASE_URL}/professure`);
    return res.data;
};

const addprofessure = async (data1) => {
    const res = await axios.post(`${BASE_URL}/professure`, data1);
    return res.data;
};

const updateprofdetails = async (data) => {
    const res = await axios.put(
        `${BASE_URL}/professure/${data._id}`,
        {
            name: data.name,
            email: data.email,
            department: data.department,
            password: data.password,
            professorId: data.professorId
        }
    );
    return res.data;
};


// ___________________________________

const fetchstudent = async () => {
    const res = await axios.get(`${BASE_URL}/student`);
    return res.data;
};

const fetchstudentbyid = async (id) => {
    const res = await axios.get(`${BASE_URL}/student/${id}`);
    return res.data;
};

const addstudent = async (data) => {
    const res = await axios.post(`${BASE_URL}/student`, data);
    return res.data;
};

// ____________________________________

const fetchplaned = async () => {
    const res = await axios.get(`${BASE_URL}/plannedcheakin`);
    return res.data;
};

const addplanned = async (data) => {
    const res = await axios.post(`${BASE_URL}/plannedcheakin`, data);
    return res.data;
};

// ____________________________________

const fetchactual = async () => {
    const res = await axios.get(`${BASE_URL}/actualcheakin`);
    return res.data;
};

const updateactual = async (data) => {
    const res = await axios.post(`${BASE_URL}/actualcheakin`, data);
    return res.data;
};

export default {
    fetchProfessure,
    fetchactual,
    fetchstudent,
    fetchplaned,
    updateprofdetails,
    fetchstudentbyid,
    updateactual,
    addstudent,
    addplanned,
    addprofessure,
};
