Vue.config.devtools = true

const app = new Vue({
  el:  '#app',
  data: {
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
  },

  computed: {
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
    almostGone() {
      return this.stock > 0 && this.stock < 3
    },
    oneLeftInStock() {
      return this.stock == 1
    },
    gone() {
      return this.stock == 0
    },

    stockStatusText() {
      if (this.inStock) {
        return 'In Stock'
      } else if (this.almostGone) {
        return 'Almost gone!'
      } else if (this.gone) {
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
