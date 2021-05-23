import axios from "axios";

const url = "http://localhost:3000/clients/";

export const api = {
  getClients: async () => {
    const res = await axios.get(url);
    return res.data;
  },
  deleteClient: async (id) => {
    const res = await axios.delete(url + id);
    return res.data;
  },
  createClient: async (payload) => {
    const res = await axios.post(url, payload);
    return res.data;
  },
  updateClient: async (payload) => {
    const res = await axios.put(url + payload._id, payload);
    return res.data;
  },
};
