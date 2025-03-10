// Importamos la interfaz CartProducts y la función create de Zustand
import { CartProducts } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Definimos la interfaz del estado global del carrito
interface State {
  cart: CartProducts[]; // Array que almacena los productos en el carrito
  addProductToCart: (product: CartProducts) => void;
  // Función para agregar productos
  getTotalItem: () => number;
  updateProductQuantity: (product: CartProducts, quantity: number) => void;
  deleteProduct: (product: CartProducts) => void;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemInCart: number;
  };
}

// Creamos el store de Zustand para el carrito
export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [], // Estado inicial: carrito vacío

      getTotalItem: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        // Obtener el carrito actual del estado
        const { cart } = get();

        // Calcular el subtotal sumando el precio de cada producto multiplicado por su cantidad
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        // Calcular el impuesto sobre el subtotal (15%)
        const tax = subTotal * 0.15;
        // Calcular el total sumando el subtotal y el impuesto
        const total = subTotal + tax;
        // Calcular el total de items en el carrito sumando las cantidades de cada producto
        const itemInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemInCart,
        };
      },
      // Función para agregar productos al carrito
      addProductToCart: (product: CartProducts) => {
        // Obtenemos el carrito actual del estado
        const { cart } = get();

        // Verificamos si el producto YA EXISTE en el carrito
        // Comparando tanto el ID como la talla para evitar duplicados
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        // CASO 1: Producto NO existe en el carrito
        if (!productInCart) {
          // Creamos un NUEVO array con todos los productos actuales + el nuevo
          set({ cart: [...cart, product] });
          return; // Salimos de la función
        }

        // CASO 2: Producto YA EXISTE - Actualizamos cantidad
        // Creamos un NUEVO array de productos (inmutabilidad)
        const updatedCartProduct = cart.map((item) => {
          // Buscamos el producto específico con misma ID y talla
          if (item.id === product.id && item.size === product.size) {
            // Creamos un NUEVO objeto producto sumando las cantidades
            return { ...item, quantity: item.quantity + product.quantity };
          }

          // Si no es el producto buscado, lo devolvemos sin cambios
          return item;
        });

        // Actualizamos el estado con el NUEVO array de productos
        set({ cart: updatedCartProduct });
      },
      updateProductQuantity: (product: CartProducts, quantity: number) => {
        const { cart } = get();

        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && quantity >= 1) {
            return { ...item, quantity: quantity };
          }

          return item;
        });

        set({ cart: updatedCartProduct });
      },
      deleteProduct: (product: CartProducts) => {
        const { cart } = get();

        const deleCartProduct = cart.filter((item) => {
          // Devolvemos true si el producto NO coincide, para mantenerlo en el carrito
          return item.id !== product.id || item.size !== product.size;
        });

        set({ cart: deleCartProduct });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
