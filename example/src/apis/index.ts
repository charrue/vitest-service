import axios from "axios";

const service = axios.create({
  baseURL: "http://150.158.181.150/api/mock-api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async () => {
  const res = await service.post("/login");

  return res.data;
};
