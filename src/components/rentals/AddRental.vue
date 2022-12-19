<template>
  <div class="flex mt-10 w-full justify-center items-center">
    <form
      action=""
      class="border-2 p-10 rounded-3xl border-yellow-300 shadow-lg"
    >
      <h2 class="flex justify-center mb-5 font">ADD RENTAL</h2>

      <div>
        <label for="" class="">Customer : </label>
        <select
          v-model="customerId"
          class="border-2 mb-4 ml-3 w-[65%] pb-1 rounded-lg"
        >
          <option disabled value="">Please select Customer</option>
          <option v-for="item in customers" :value="item._id" :key="item._id">
            {{ item.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="" class="">Movie : </label>
        <select
          v-model="movieId"
          class="border-2 mb-4 ml-9 w-[65%] pb-1 rounded-lg"
        >
          <option disabled value="">Please select Movie</option>
          <option v-for="item in movies" :value="item._id" :key="item._id">
            {{ item.title }}
          </option>
        </select>
      </div>

      <div class="flex justify-end">
        <button
          type="button"
          v-on:click="handleAddRental"
          class="border-2 rounded-full p-1 shadow-lg text-bold w-20 mt-2 text-blue-600 border-blue-400"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddRental",
  data() {
    return {
      movies: [],
      customers: [],
      customerId: "",
      movieId: "",
    };
  },
  methods: {
    async getAllMovies() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.get("http://localhost:3030/movies", {
        headers: { Authorization: token },
      });
      this.movies = response.data.data;
    },

    async getAllCustomers() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.get("http://localhost:3030/customers", {
        headers: { Authorization: token },
      });
      this.customers = response.data.data;
    },

    async handleAddRental() {
      let token = localStorage.getItem("token");

      if (!token) {
        this.$router.push({ name: "Login" });
      }

      const response = await axios.post(
        "http://localhost:3030/rentals",
        { customerId: this.customerId, movieId: this.movieId },
        { headers: { Authorization: token } }
      );
      if (response.status == 201) {
        this.$router.push({ name: "Rentals" });
      }
    },
  },
  mounted() {
    this.getAllMovies();
    this.getAllCustomers();
  },
};
</script>
<style scoped>
.font {
  font-size: 20px;
  font-weight: 500;
  color: slategray;
}
</style>
