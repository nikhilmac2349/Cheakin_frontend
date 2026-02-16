// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchdata } from "./userReducer";

// const JustShow = () => {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector((state) => state.users);


//   console.log(`data is : ${data}`)

//   useEffect(() => {
//     dispatch(fetchdata());
//   }, [dispatch]);

//   if (loading) return <h2>Loading...</h2>;
//   if (error) return <h2>{error}</h2>;

//   return (
//     <div>
//       <h2>Students List</h2>
//       <ul>
//         {data.map((student) => (
//           <li key={student.email}>
//             {student.name} — {student.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default JustShow;
