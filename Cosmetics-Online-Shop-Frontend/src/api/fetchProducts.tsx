import axios from "axios";

export const fetchProducts = async (page: number) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:8000/api/products?page=${page}&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`,
    config
  );
  return response.data;
};
