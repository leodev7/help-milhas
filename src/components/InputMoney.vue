<template>
  <div>
    <q-field filled v-model="price" label="Price with v-money directive" hint="Mask: $ #,###.00 #">
      <template v-slot:control="{ id, floatingLabel, value, emitValue }">
        <input :id="id" class="q-field__input text-right" :model-value="value" @change="e => emitValue(e.target.value)" v-money="moneyFormatForDirective" v-show="floatingLabel" @keyup="onLocalKeyUp(e)">
      </template>
    </q-field>
  </div>
</template>

<script>
import { VMoney } from 'v-money'

export default {
  name: 'InputMoney',
  props: [
    'combination', 'product'
  ],

  directives: { money: VMoney },

  data () {
    return {
      modalEditar: false,
      price: null,
      moneyFormatForDirective: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: true
      }
    }
  },

  methods: {

    onLocalKeyUp (value) {
      this.$emit('onEmitOnCardSimulateProducts', value)
    }

  }

}
</script>
