import { ref } from "vue";
import { defineStore } from "pinia";
// import axios from "axios";

type IMyUser = {
  id: number;
  name: string;
  token?: string;
  refreshToken?: string;
};

export const userUserStore = defineStore("user", () => {
  const user = ref<IMyUser | null>(null);

  // const getUserData = async (): Promise<void> => {
  //   const response = await axios.get("auth");
  //   jsonData.value = JSON.stringify(response.data, null, 2);
  // };

  return { user };
});
