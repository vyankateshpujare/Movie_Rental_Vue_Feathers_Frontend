<template>
  <div class="overflow-x-auto relative mt-10 sm:rounded-lg flex justify-center">
    <table
      class="text-sm text-left text-gray-500 dark:text-gray-400 w-[60%] shadow-lg border-2"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 pl-10 w-[20%]">Title</th>
          <th scope="col" class="py-3 pl-5 w-[20%]">Genre</th>
          <th scope="col" class="py-3 w-[15%]">Rate</th>
          <th scope="col" class="py-3 w-[15%]">Stock</th>
          <th scope="col" class="w-[15%]">
            <router-link
              to="addmovie"
              class="bg-white shadow-lg border-2 px-2 py-1 rounded-full cursor-pointer border-blue-400 text-blue-700"
              ><font-awesome-icon icon="fa-solid fa-plus"
            /></router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in movies" :key="item._id" class="bg-white border-b">
          <td class="py-4 pl-10">{{ item.title }}</td>
          <td class="py-4 pl-5">{{ item.genre.name }}</td>
          <td class="py-4">{{ item.dailyRentalRate }}</td>
          <td class="py-4">{{ item.numberInStock }}</td>
          <td class="">
            <router-link
              :to="/updatemovie/ + item._id"
              class="bg-gray-200 shadow border-2 px-2 py-1 rounded-full cursor-pointer  text-green-700 font-bold mr-5"
              ><font-awesome-icon icon=" fa-pencil" /></router-link
            >
            <span
              v-on:click="handleDeleteMovie(item._id)"
              class="bg-gray-200 shadow border-2 px-2 py-1 rounded-full cursor-pointer text-red-500 font-bold"
              ><font-awesome-icon icon=" fa-trash" /></span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Movies",
  data() {
    return {
      movies: [],
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

    async handleDeleteMovie(id) {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.delete(
        "http://localhost:3030/movies/" + id,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status == 200) {
        this.getAllMovies();
      }
    },
  },

  mounted() {
    this.getAllMovies();
  },
};
</script>
