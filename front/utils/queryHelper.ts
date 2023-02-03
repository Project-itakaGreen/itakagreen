import axios from "axios";
import router from "next/router";

export async function requestApiData(url: any, token: any) {
  const backUrl = process.env.BACK_URL;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (token) {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    router.push(backUrl + "/api/auth/google/login");
  }
}
