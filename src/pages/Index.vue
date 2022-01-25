<template>
  <q-page padding>
    <p>Index</p>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',

  mounted () {
    this.toCalculadoraCompraInteligente()
  },

  methods: {

    toCalculadoraCompraInteligente () {
      this.$router.push({ name: 'r_calculadoracomprainteligente' })
    }
  }
}
</script>
