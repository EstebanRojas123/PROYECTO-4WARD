import axiosInstance from "../api/axiosInstance";

// Registrar usuario
export const registerUser = async ({ username, email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error.response?.data || error.message);
    throw error;
  }
};

// Iniciar sesión
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error;
  }
};
