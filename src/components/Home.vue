<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  name: "Home",
  components: {
    Navbar,
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
