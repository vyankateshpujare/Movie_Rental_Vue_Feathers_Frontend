<template>
  <div class="flex mt-10 w-full justify-center items-center">
    <form
      action=""
      class="border-2 p-10 rounded-3xl border-yellow-300 shadow-[0_15px_100px_-60px_rgba(0,0,0,0.3)]"
    >
      <h2
        class="flex justify-center mb-5 text- font"
        v-if="this.$route.params.id"
      >
        UPDATE MOVIE
      </h2>
      <h2 class="flex justify-center mb-5 text-bold font" v-else>ADD MOVIE</h2>
      <div>
        <label for="">Name : </label>
        <input
          type="text"
          v-model="movie.title"
          class="border-2 mb-4 ml-20 rounded-lg pl-3"
        />
      </div>
      <div>
        <label for="" class="w-[20px]">Genre : </label>
        <select
          v-model="movie.genre"
          class="border-2 mb-4 ml-20 w-[57%] pb-1 rounded-lg"
        >
          <option disabled value="">Please select genre</option>
          <option v-for="item in genres" :value="item._id" :key="item._id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="">dailyRentalRate : </label>
        <input
          type="text"
          v-model="movie.dailyRentalRate"
          class="border-2 mb-4 ml-3 rounded-lg pl-3"
        />
      </div>
      <div>
        <label for="">numberInStock : </label>
        <input
          type="text"
          v-model="movie.numberInStock"
          class="border-2 mb-4 ml-4 rounded-lg pl-3"
        />
      </div>

      <div class="flex justify-end">
        <button
          type="button"
          v-on:click="handleAddUpdateMovie"
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
  name: "AddUpdateMovie",
  data() {
    return {
      genres: [],
      movie: {
        title: "",
        genre: "",
        dailyRentalRate: "",
        numberInStock: "",
      },
    };
  },
  methods: {
    async getAllGenre() {
      let token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3030/genre", {
        headers: { Authorization: token },
      });
      this.genres = response.data.data;
    },

    async getCurrentMovie(id) {
      let token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3030/movies/" + id, {
        headers: { Authorization: token },
      });
      this.movie = response.data;
      this.movie.genre = response.data.genre._id;
    },

    async handleAddUpdateMovie() {
      let token = localStorage.getItem("token");

      if (this.$route.params.id) {
        const response = await axios.put(
          "http://localhost:3030/movies/" + this.$route.params.id,
          {
            title: this.movie.title,
            genreId: this.movie.genre,
            dailyRentalRate: this.movie.dailyRentalRate,
            numberInStock: this.movie.numberInStock,
          },
          { headers: { Authorization: token } }
        );
        if (response.status == 200) {
          this.$router.push({ name: "Movies" });
        }
      } else {
        const response = await axios.post(
          "http://localhost:3030/movies",
          {
            title: this.movie.title,
            genreId: this.movie.genre,
            dailyRentalRate: this.movie.dailyRentalRate,
            numberInStock: this.movie.numberInStock,
          },
          { headers: { Authorization: token } }
        );
        if (response.status == 201) {
          this.$router.push({ name: "Movies" });
        }
      }
    },
  },
  mounted() {
    this.getAllGenre();
    if (this.$route.params.id) {
      this.getCurrentMovie(this.$route.params.id);
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
