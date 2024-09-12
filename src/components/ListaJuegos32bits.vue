<template>
  <div>
    <h1>Tienda de videojuegos 32 Bits</h1>
    <p>Lista de juegos</p>
    <table v-if="juegos.length > 0">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Color</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="juego in juegos" :key="juego.codigo">
          <td>{{ juego.codigo }}</td>
          <td>{{ juego.nombre }}</td>
          <td>{{ juego.stock }}</td>
          <td>{{ formatoPrecio(juego.precio) }}</td>
          <td :style="{ color: juego.color }">{{ juego.color }}</td>
          <td>
            <button @click="accionIncrementar(juego.codigo)">+</button>
            <button
              @click="accionDecrementar(juego.codigo)"
              :disabled="juego.stock <= 0"
            >
              -
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["juegos"]),
  },
  methods: {
    accionIncrementar(codigo) {
      this.$store.dispatch("stockJuego", { codigo, stock: "sumar" });
    },
    accionDecrementar(codigo) {
      this.$store.dispatch("stockJuego", { codigo, stock: "restar" });
    },
    formatoPrecio(precio) {
      const precioNumero = Number(precio);
      return `$${precioNumero.toLocaleString()}`;
    },
  },
  mounted() {
    this.$store.dispatch("fetchJuegos");
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

h1,
p {
  text-align: center;
  margin-top: 50px;
}
table {
  margin: 50px auto;
  border: 1px solid #ccc;
  border-collapse: collapse;
  width: 80%;
}
thead {
  background-color: #342727;
  color: #f2f2f2;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
