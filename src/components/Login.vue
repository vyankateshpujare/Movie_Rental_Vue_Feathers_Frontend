<template>
  <div class="flex h-screen w-full justify-center items-center bg-gray-50">
    <form
      action=""
      class="border-2 p-10 rounded-3xl bg-white border-yellow-300 hover:shadow-[0_15px_100px_-15px_rgba(0,0,0,0.3)]"
    >
      <span class="flex justify-center mb-3 text-gray-400 login">LogIn</span>
      <div>
        <label for="">Email : </label>
        <input
          type="text"
          v-model="email"
          class="border-2 mb-4 ml-8 rounded-lg pl-3"
        />
      </div>

      <div>
        <label for="">Password : </label>
        <input
          type="password"
          v-model="password"
          class="border-2 mb-4 ml-1 rounded-lg pl-3"
        />
      </div>
      <div class="flex justify-center">
        <button
          type="button"
          v-on:click="logIn"
          class="border-2 rounded-full p-1 shadow-lg text-bold w-20 mt-2 text-blue-600 border-blue-400"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async logIn() {
      const response = await axios.post(
        "http://localhost:3030/Authentication",
        { email: this.email, password: this.password, strategy: "local" }
      );
      if (response.status == 201) {
        localStorage.setItem("token", response.data.accessToken);
        this.$router.push({ name: "Home" });
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("token");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
<style scoped>
.login {
  font-size: 20px;
  font-weight: bold;
}
</style>
