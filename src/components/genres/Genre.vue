<template>
  <div class="overflow-x-auto relative mt-10 sm:rounded-lg flex justify-center">
    <table
      class="text-sm text-left text-gray-500 dark:text-gray-400 w-[40%] shadow-lg border-2"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 pl-10 w-[70%]">Genres</th>
          <th scope="col" class="">
            <router-link
              to="addgenre"
              class="bg-white shadow-lg border-2 px-2 py-1 rounded-full cursor-pointer border-blue-400 text-blue-700"
              ><font-awesome-icon icon="fa-solid fa-plus" /></router-link
            >
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in genres" :key="item._id" class="bg-white border-b">
          <td class="py-4 pl-10">{{ item.name }}</td>
          <td class="">
            <router-link
              :to="'/updategenre/' + item._id"
              class="bg-gray-200 shadow py-1 px-2 rounded-full cursor-pointer text-green-700 font-bold mr-5"
              ><font-awesome-icon icon=" fa-pencil" /></router-link
            >
            <span
              v-on:click="handleDeleteGenre(item._id)"
              class="bg-gray-200 shadow px-2 py-1 rounded-full cursor-pointer text-red-500 font-bold"
              ><font-awesome-icon icon=" fa-trash" />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { ChevronDoubleRightIcon } from "@vue-hero-icons/solid";
export default {
  name: "Genre",
  data() {
    return {
      genres: [],
      updateId: "",
    };
  },

  methods: {
    async getAllGenre() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.get("http://localhost:3030/genre", {
        headers: { Authorization: token },
      });
      this.genres = response.data.data;
    },

    async handleDeleteGenre(id) {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.delete("http://localhost:3030/genre/" + id, {
        headers: { Authorization: token },
      });
      if (response.status == 200) {
        this.getAllGenre();
      }
    },
  },

  mounted() {
    this.getAllGenre();
  },
};
</script>
