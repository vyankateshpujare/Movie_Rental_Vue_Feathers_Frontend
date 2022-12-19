<template>
  <div class="overflow-x-auto relative mt-10 sm:rounded-lg flex justify-center">
    <table
      class="text-sm text-left text-gray-500 dark:text-gray-400 w-[50%] shadow-lg border-2"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 pl-10 w-[20%]">Name</th>
          <th scope="col" class="py-3 w-[20%]">Phone</th>
          <th scope="col" class="w-[10%]">
            <router-link
              to="/addcustomer"
              class="bg-white shadow-lg border-2 px-2 py-1 rounded-full cursor-pointer border-blue-400 text-blue-700"
              ><font-awesome-icon icon="fa-solid fa-plus"
            /></router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in customers" :key="item._id" class="bg-white border-b">
          <td class="py-4 pl-10">{{ item.name }}</td>
          <td class="py-4">{{ item.phone }}</td>
          <td class="">
            <router-link
              :to="/updatecustomer/ + item._id"
              class="bg-gray-200 shadow border-2 px-2 py-1 rounded-full cursor-pointer text-green-700 font-bold mr-5"
              ><font-awesome-icon icon=" fa-pencil"
            /></router-link>
            <span
              v-on:click="handleDeleteCustomers(item._id)"
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
  name: "Customers",
  data() {
    return {
      customers: [],
    };
  },

  methods: {
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

    async handleDeleteCustomers(id) {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ name: "Login" });
      }
      const response = await axios.delete(
        "http://localhost:3030/customers/" + id,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status == 200) {
        this.getAllCustomers();
      }
    },
  },

  mounted() {
    this.getAllCustomers();
  },
};
</script>
