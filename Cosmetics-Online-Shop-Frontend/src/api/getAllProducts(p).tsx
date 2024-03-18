// import axios from "axios";

// export const GetAllProductsP = async (page: number) => {
//   const token = localStorage.getItem("accessToken");
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(
//     `http://localhost:8000/api/products?page=${page}&limit=9&fields=-rating,-createdAt,-updatedAt,-__v&sort=price`,
//     config
//   );
//   return response.data;
// };