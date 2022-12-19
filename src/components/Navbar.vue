<template>
  <nav class="bg-white dark:bg-gray-900 border-b-2 border-yellow-300 shadow-lg">
    <div
      class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5"
    >
      <a href="https://flowbite.com" class="flex items-center">
        <!-- <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-6 mr-3 sm:h-9"
          alt="Flowbite Logo"
        /> -->
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white border-2 border-yellow-400 px-5 pb-1 rounded-b-full shadow-inner bg-gray-50"
          ><font-awesome-icon icon="fa-solid fa-video" /> Movie-Rental</span
        >
      </a>
      <div class="flex items-center">
        <button
          class="text-sm font-medium text-blue-600 dark:text-blue-500 border-2 rounded-full px-2 py-1 shadow-lg border-blue-400 hover:shadow-[0_15px_100px_-60px_rgba(0,0,0,0.3)]"
          v-on:click="logOut"
        >
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        </button>
      </div>
    </div>
  </nav>
  <nav class="bg-gray-50 dark:bg-gray-700 shadow-md">
    <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
      <div class="flex items-center justify-end">
        <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
          <li>
            <router-link
              to="/"
              class="text-gray-900 dark:text-white hover:underline"
              aria-current="page"
              >Home
            </router-link>
          </li>
          <li>
            <router-link
              to="/customers"
              class="text-gray-900 dark:text-white hover:underline"
              >Customers</router-link
            >
          </li>
          <li>
            <router-link
              to="/genres"
              class="text-gray-900 dark:text-white hover:underline"
              >Genres</router-link
            >
          </li>
          <li>
            <router-link
              to="/movies"
              class="text-gray-900 dark:text-white hover:underline"
              >Movies</router-link
            >
          </li>
          <li>
            <router-link
              to="/rentals"
              class="text-gray-900 dark:text-white hover:underline"
              >Rentals</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  methods: {
    logOut() {
      localStorage.clear(), this.$router.push("Login");
    },
  },
};
</script>
<style></style>
