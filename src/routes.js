import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Customers from "./components/customers/Customers.vue";
import AddUpdateCustomer from "./components/customers/AddUpdateCustomer.vue";
import Genre from "./components/genres/Genre.vue";
import AddUpdateGenre from "./components/genres/AddUpdateGenre.vue";
import Movies from "./components/movies/Movies.vue";
import AddUpdateMovie from "./components/movies/AddUpdateMovie.vue";
import Rentals from "./components/rentals/Rentals.vue";
import AddRental from "./components/rentals/AddRental.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
    children: [
      {
        name: "Customers",
        component: Customers,
        path: "/customers",
      },
      {
        name: "AddCustomer",
        path: "/addcustomer",
        component: AddUpdateCustomer,
      },
      {
        path: "/updatecustomer/:id",
        component: AddUpdateCustomer,
      },
      {
        name: "Genre",
        path: "/genres",
        component: Genre,
      },
      {
        name: "AddUpdateGenre",
        path: "/addgenre",
        component: AddUpdateGenre,
      },
      {
        path: "/updategenre/:id",
        component: AddUpdateGenre,
      },
      {
        name: "Movies",
        path: "/movies",
        component: Movies,
      },
      {
        name: "AddUpdateMovies",
        path: "addmovie",
        component: AddUpdateMovie,
      },
      {
        path: "/updatemovie/:id",
        component: AddUpdateMovie,
      },
      {
        name: "Rentals",
        path: "rentals",
        component: Rentals,
      },
      {
        name: "AddRental",
        path: "addrental",
        component: AddRental,
      },
    ],
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
