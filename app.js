Vue.config.devtools = true

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details"> {{ detail }} </li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img v-bind:src="image" alt="">
      </div>

      <div class="product-info">
        <h1>{{ product }}</h1>

        <p :class="{ outOfStock: stockEmpty }">{{ stockStatusText }}</p>
        <p>{{ capitalizedProductUnitLabel }} {{ productLabel }} left: {{ stock }}</p>

        <p>Shipping: {{ shipping }}</p>

        <product-details :details="details"></product-details>

        <div class="flex-container">
          <div
            class="color-box"
            :data-variant-id="variant.id"
            v-for="variant in variants"
            @mouseover="displayVariantImage(variant.image)" :style="variant.style">
          </div>
        </div>

        <div class="mt30 flex-container flex-start flex-align-center">
          <button @click="addToCart" :disabled="stockEmpty" :class="{ disabledButton: stockEmpty }">+</button>
          <div class="cart">
            Cart {{cart}}
          </div>
          <button @click="removeFromCart" :disabled="cartEmpty" :class="{ disabledButton: cartEmpty }">-</button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      productLabel: 'socks',
      description: 'Amazing beautiful socks',
      image: './images/green.jpg',
      stock: 12,
      details: ["80% coton", "20% polyester", "Gender-neutral "],
      variants: [
        {
          id: 2234,
          color: 'green',
          image: './images/green.jpg',
          style: {
            backgroundColor: '#379C69',
            color: '#FFFFFF',
            display: 'inline-block',
            padding: '10px',
            marginRight: '2px'
          }
        },
        {
          id: 2235,
          color: 'blue',
          image: './images/blue.jpg',
          style: {
            backgroundColor: '#435972',
            color: '#FFFFFF',
            display: 'inline-block',
            padding: '10px',
            marginRight: '2px'
          }
        }
      ],
      cart: 0,
    }
  },

  computed: {
    shipping() {
      if (this.premium) {
        return 'Free'
      } else {
        return '2.99$'
      }
    },
    productUnitLabel() {
      if (this.oneLeftInStock) {
        return 'pair of'
      } else {
        return 'pairs of'
      }
    },

    capitalizedProductUnitLabel() {
      return this.productUnitLabel[0].toUpperCase() + this.productUnitLabel.substring(1)
    },

    inStock() {
      return this.stock >= 3
    },
    stockAlmostEmpty() {
      return this.stock > 0 && this.stock < 3
    },
    oneLeftInStock() {
      return this.stock == 1
    },
    stockEmpty() {
      return this.stock == 0
    },
    stockFull() {
      return this.stock == 12
    },

    cartEmpty() {
      return this.cart == 0
    },

    stockStatusText() {
      if (this.inStock) {
        return 'In Stock'
      } else if (this.stockAlmostEmpty) {
        return 'Almost gone!'
      } else if (this.stockEmpty) {
        return 'Not available anymore'
      }
    }
  },

  methods: {
    addToCart() {
      if (this.stock == 0) {
        this.displayNoStockLeftWarning()
      } else {
        this.cart += 1
        this.stock -= 1
      }
    },

    removeFromCart() {
      if (this.cart >0 ) {
        this.cart -= 1
        this.stock += 1
      } else {
        this.displayCartReachedZeroWarning()
      }
    },

    displayVariantImage(variantImage) {
      this.image = variantImage
    },

    displayCartReachedZeroWarning() {
      alert('No more socks in cart!')
    },

    displayNoStockLeftWarning() {
      alert('No more socks in stock!')
    }
  }
})

const app = new Vue({
  el:  '#app',
  data: {
    premium: true
  }
})
