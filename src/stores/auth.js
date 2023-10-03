import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);

  const errors = ref({})

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      user.value = data;
    }catch(error){
      user.value = null
    }
  };

  const handleLogin = async (credentials) => {
    await csrfCookie();
    try {
      await login(credentials);
      await fetchUser();
      errors.value = {}
    }catch(error){
      if(error.response && error.response.status === 422){
        errors.value = error.response.data.errors
      }
    }
    
  };

  const handleRegister = async (newUser) => {
    await register(newUser);
    await handleLogin({
      email: newUser.email,
      password: newUser.password,
    });
  };

  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  return {
    user,
    errors,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
});