<template>
  <q-page padding>
    <div class="container">
      <div class="row q-col-gutter-sm">

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" maxlength="10" prefix="R$ " color="black" label-color="black" bg-color="white" v-model.lazy="valorInvestido" v-money="money" class="full-width" label="Valor investido (valor da compra)" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" color="black" label-color="black" bg-color="white" v-model="quantidadeDePontosComprados" class="full-width" label="Quantidade de pontos comprados" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" mask="###" color="black" label-color="black" bg-color="white" v-model="transferenciaBonificada" class="full-width" label="Transferência Bonificada (%)" @update:model-value="calculandoValorFinal()" />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-12 tabela">
          <table style="width:100%">
            <tr>
              <th>Valor Investido:</th>
              <td>R$ {{ valorInvestido }}</td>
            </tr>
            <tr>
              <th>Total de pontos pelo Investimento:</th>
              <td>{{ quantidadeDePontosComprados }}</td>
            </tr>
            <tr>
              <th>Total de pontos após transferência de {{ transferenciaBonificada }} %:</th>
              <td>{{ totalDePontosAposTransferenciaCalculado }}</td>
            </tr>
            <tr>
              <th>Valor milheiro:</th>
              <td>R$ {{ valorDoMilheiro }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="row q-mt-sm">
        <div class="col-12">
          <q-btn outline label="Limpar" class="botaoLimpar full-width" @click="limparCampos()" />
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import {VMoney} from 'v-money'

export default {
  name: 'CalcularValoMilheiro',
  directives: { money: VMoney},

  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
      },

      valorInvestido: null,
      quantidadeDePontosComprados: null,
      transferenciaBonificada: null,

      totalDePontosAposTransferenciaCalculado: null,
      valorDoMilheiro: null
    }
  },

  methods: {
    calculandoValorFinal () {
      this.totalDePontosAposTransferenciaCalculado = this.quantidadeDePontosComprados
      if (this.transferenciaBonificada > 0 && this.transferenciaBonificada < 10){
        this.totalDePontosAposTransferenciaCalculado = this.totalDePontosAposTransferenciaCalculado * ('1.0' + parseInt(this.transferenciaBonificada))
        this.totalDePontosAposTransferenciaCalculado = ~~this.totalDePontosAposTransferenciaCalculado
      } else if (this.transferenciaBonificada >= 10 && this.transferenciaBonificada <= 99) {
        this.totalDePontosAposTransferenciaCalculado = this.totalDePontosAposTransferenciaCalculado * ('1.' + parseInt(this.transferenciaBonificada))
        this.totalDePontosAposTransferenciaCalculado = ~~this.totalDePontosAposTransferenciaCalculado
      } else if (typeof this.transferenciaBonificada === 'string' && this.transferenciaBonificada >= 100) {
        var x = this.transferenciaBonificada.substring(0, 1)
        x = parseInt(x) + 1
        this.totalDePontosAposTransferenciaCalculado = this.totalDePontosAposTransferenciaCalculado * (x + '.' + parseInt(this.transferenciaBonificada.slice(1)))
        this.totalDePontosAposTransferenciaCalculado = ~~this.totalDePontosAposTransferenciaCalculado
      }

      this.valorDoMilheiro = (parseFloat(this.valorInvestido.replace('.','').replace(',', '.')) / this.totalDePontosAposTransferenciaCalculado) * 1000
      this.valorDoMilheiro = this.valorDoMilheiro.toFixed(2).replace('.', ',')

    },

    limparCampos () {
      this.valorInvestido = ''
      this.quantidadeDePontosComprados = ''
      this.transferenciaBonificada = ''
    }
  }

}
</script>

<style>

</style>