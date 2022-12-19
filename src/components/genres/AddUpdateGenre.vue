<template>
  <div class="flex mt-10 w-full justify-center items-center">
    <form
      action=""
      class="border-2 p-10 rounded-3xl border-yellow-300 shadow-lg"
    >
      <h2
        class="flex justify-center mb-5 font"
        v-if="this.$route.params.id"
      >
        UPDATE GENRE
      </h2>
      <h2 class="flex justify-center mb-5 font" v-else>ADD GENRE</h2>
      <div>
        <label for="">Name : </label>
        <input
          type="text"
          v-model="genres.name"
          class="border-2 mb-4 ml-8 rounded-lg pl-3"
        />
      </div>

      <div class="flex justify-end">
        <button
          type="button"
          v-on:click="handleAddUpdateGenre"
          class="border-2 rounded-full p-1 shadow-lg text-bold w-20 mt-2 text-blue-600 border-blue-400"
        >
          SUBMIT
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddUpdateGenre",
  data() {
    return {
      genres: {
        name: "",
      },
    };
  },
  methods: {
    async getCurrentGenre(id) {
      let token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3030/genre/" + id, {
        headers: { Authorization: token },
      });
      this.genres = response.data;
    },

    async handleAddUpdateGenre() {
      let token = localStorage.getItem("token");

      if (this.$route.params.id) {
        const response = await axios.put(
          "http://localhost:3030/genre/" + this.$route.params.id,
          { name: this.genres.name },
          { headers: { Authorization: token } }
        );
        if (response.status == 200) {
          this.$router.push({ name: "Genre" });
        }
      } else {
        const response = await axios.post(
          "http://localhost:3030/genre",
          { name: this.genres.name },
          { headers: { Authorization: token } }
        );
        if (response.status == 201) {
          this.$router.push({ name: "Genre" });
        }
      }
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      this.getCurrentGenre(this.$route.params.id);
    }
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
