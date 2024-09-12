import { createStore } from "vuex";
import ListaJuegos from "@/data/juegos.json"; 

export default createStore({
  state: {
    juegos: [], 
  },
  mutations: {
    setJuegos(state, juegos) {
      state.juegos = juegos;
    },
    stockJuego(state, payload) {
      state.juegos.forEach(juego => {
        if (juego.codigo === payload.codigo) {
          if (payload.stock === "sumar") {
            juego.stock++;
          } else if (payload.stock === "restar") {
            juego.stock--;
          }
        }
      });
    },
  },
  actions: {
    async fetchJuegos(context) { 
      try {
        context.commit("setJuegos", ListaJuegos);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    },
    stockJuego(context, payload) { 
      context.commit("stockJuego", payload);
    },
  },
  getters: {},
});
