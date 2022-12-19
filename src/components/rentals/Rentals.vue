<template>
  <div class="overflow-x-auto relative mt-10 sm:rounded-lg flex justify-center">
    <table
      class="text-sm text-left text-gray-500 dark:text-gray-400 w-[70%] shadow-lg border-2"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 pl-10 w-[25%]">Customers</th>
          <th scope="col" class="py-3 w-[15%]">Movies</th>
          <th scope="col" class="py-3 w-[10%]">Fees</th>
          <th scope="col" class="py-3 pl-4 w-[20%]">Date</th>
          <th scope="col" class="py-3 w-[20%]">Return</th>
          <th scope="col" class="w-[10%]">
            <router-link
              to="addrental"
              class="bg-white shadow-lg border-2 px-2 py-1 rounded-full cursor-pointer border-blue-400 text-blue-700"
              ><font-awesome-icon icon="fa-solid fa-plus"
            /></router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in rentals" :key="item._id" class="bg-white border-b">
          <td class="py-4 pl-10 w-[25%]">{{ item.customer.name }}</td>
          <td class="py-4 w-[15%]">{{ item.movie.title }}</td>
          <td class="py-4 w-[10%]">{{ item.rentalFee }}</td>
          <td class="py-4 pl-4 w-[15%]">
            {{ new Date(item.dateOut).toLocaleDateString() }}
          </td>
          <td class="py-4 w-[15%]" v-if="item.dateIn != null">
            {{ new Date(item.dateIn).toLocaleDateString() }}
          </td>
          <td class="py-4 w-[15%]" v-else="item.dateIn == null">
            <button
              v-on:click="handleReturnRental(item._id, item.movie._id)"
              class="bg-white shadow border-2 px-2 rounded-full cursor-pointer border-yellow-400 text-yellow-500 font-bold"
            >
              Return
            </button>
          </td>
          <td class="">
            <span
              v-on:click="handleDeleteRental(item._id)"
              class="bg-gray-200 shadow border-2 px-2 py-1 rounded-full cursor-pointer text-red-500 font-bold"
              ><font-awesome-icon icon=" fa-trash"
            /></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Rentals",
  data() {
    return {
      rentals: [],
    };
  },

  methods: {
    async getAllRentals() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.get("http://localhost:3030/rentals", {
        headers: { Authorization: token },
      });
      this.rentals = response.data.data;
    },

    async handleReturnRental(id, movieId) {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.patch(
        "http://localhost:3030/rentals/" + id,
        { movieId },
        {
          headers: { Authorization: token },
        }
      );
      console.log(response);
      if (response.status == 200) {
        this.getAllRentals();
      }
    },

    async handleDeleteRental(id) {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.delete(
        "http://localhost:3030/rentals/" + id,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status == 200) {
        this.getAllRentals();
      }
    },
  },

  mounted() {
    this.getAllRentals();
  },
};
</script>
