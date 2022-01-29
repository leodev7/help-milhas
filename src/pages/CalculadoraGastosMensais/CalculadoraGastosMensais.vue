<template>
  <q-page padding>
    <div class="container">
      <div class="row q-col-gutter-sm">

        <div class="col-12 q-mb-md text-center">
          <h6>Vale a pena esse cartão?</h6>
        </div>

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" maxlength="9" prefix="R$ " color="black" label-color="black" bg-color="white" v-model.lazy="valorDosGastosDaFaturaMensalmente" v-money="money" class="full-width" label="Valor dos gastos da fatura mensalmente" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-xs-12 col-md-6">
          <p class="q-mb-none" style="display:flex">Pontos por:<q-select borderless dense color="black" style="margin-top: -9px" class="q-pl-md" v-model="moeda" :options="tiposDeMoedas" option-value="id" option-label="name" emit-value map-options @update:model-value="valorDaMoeda()" /></p>
          <p>R$ {{ valorCambio }}</p>
        </div>

        <div class="col-xs-12 col-md-6">
          <q-input outlined dense inputmode="numeric" mask="#.##" color="black" label-color="black" bg-color="white" v-model="pontosPorCompra" class="full-width" :label="`Pontos por compra (${this.moeda})`" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" maxlength="5" prefix="R$ " color="black" label-color="black" bg-color="white" v-model.lazy="valorPorMilheiro" v-money="money" class="full-width" label="Valor por milheiro" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" mask="###" color="black" label-color="black" bg-color="white" v-model="transferenciaBonificada" class="full-width" label="Transferência Bonificada (%)" @update:model-value="calculandoValorFinal()" />
        </div>
        
        <div class="col-12">
          <q-input outlined dense inputmode="numeric" maxlength="7" prefix="R$ " color="black" label-color="black" bg-color="white" v-model.lazy="valorDaAnuidade" v-money="money" class="full-width" label="Valor da Anuidade (Mensal)" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12">
          <p class="q-mb-none" style="display:flex">Quantidade de meses:<q-select borderless dense color="black" style="margin-top: -9px" class="q-pl-md" v-model="mes" :options="meses" option-value="id" option-label="name" emit-value map-options @update:model-value="calculandoValorFinal()" /></p>
        </div>
      </div>

      <div class="row">
        <div class="col-12" style="border: 1px solid rgba(255, 255, 255, 0.659); border-radius: 5px; padding: 12px">
          <table style="width:100%">
            <tr>
              <th>Gastos em {{ mes }} meses:</th>
              <td>R$ {{ gastosEmMeses }}</td>
            </tr>
            <tr>
              <th>Valor da anuidade em {{ mes }} meses:</th>
              <td>R$ {{ valorDaAnuidadeEmMeses }}</td>
            </tr>
            <tr>
              <th>Pontos acumulados em {{ mes }} meses:</th>
              <td>{{ pontosAcumuladosEmMeses }}</td>
            </tr>
            <tr>
              <th>Pontos acumulados após transferência bonificada:</th>
              <td>{{ pontosAcumuladosAposTransferenciaBonificada }}</td>
            </tr>
            <tr>
              <th>Valor em real dos pontos:</th>
              <td>R$ {{ valorEmRealDosPontos }}</td>
            </tr>
            <tr>
              <th v-if="this.lucroOuPrejuizo >= 0">Lucro de:</th>
              <th v-else>Prejuizo de:</th>
              <td :style="this.lucroOuPrejuizo >= 0 ? 'color: green' : 'color: red'">R$ {{ lucroOuPrejuizo }}</td>
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
  name: 'CalculadoraGastosMensais',
  directives: { money: VMoney },

  data () {
    return {
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
      },
      valorCambio: '1.00',
      moeda: 'REAL',
      tiposDeMoedas: [
        { id: 'REAL', name: 'Real' },
        { id: 'DOLAR', name: 'Dolar' }
      ],
      mes: '12',
      meses: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ],

      valorDosGastosDaFaturaMensalmente: null,
      pontosPorCompra: null,
      valorPorMilheiro: '',
      transferenciaBonificada: null,
      valorDaAnuidade: '',

      gastosEmMeses: null,
      valorDaAnuidadeEmMeses: null,
      pontosAcumuladosEmMeses: null,
      pontosAcumuladosAposTransferenciaBonificada: null,
      valorEmRealDosPontos: null,
      lucroOuPrejuizo: null
    }
  },

  mounted () {
    this.valorDaMoeda()
  },

  methods: {

    valorDaMoeda () {
      if (this.moeda === 'REAL') {
        this.valorCambio = '1.00'
        this.calculandoValorFinal()
        return
      }
      this.$q.loading.show()

      this.$axios({ method: 'get', url: 'https://economia.awesomeapi.com.br/last/USD-BRL' })
        .then((response) => {
          this.valorCambio = response.data.USDBRL.bid.substring(0, 4)
          this.calculandoValorFinal()
        })
        .catch(() => {
          this.$q.notify({ message: 'Falha na API, favor contatar clicando <b>aqui: <a href="https://t.me/leop7" target="_blank">@leop7</a></b>', html: true })
          this.moeda = 'REAL'
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    calculandoValorFinal () {
      this.gastosEmMeses = (parseFloat(this.valorDosGastosDaFaturaMensalmente.replace('.','').replace(',', '.')) * this.mes)
      this.gastosEmMeses = this.gastosEmMeses.toFixed(2).replace('.', ',')

      this.valorDaAnuidadeEmMeses = (parseFloat(this.valorDaAnuidade.replace('.','').replace(',', '.')) * this.mes)
      this.valorDaAnuidadeEmMeses = ~~this.valorDaAnuidadeEmMeses

      this.pontosAcumuladosEmMeses = this.pontosPorCompra * this.mes * parseFloat(this.valorDosGastosDaFaturaMensalmente.replace('.','').replace(',', '.')) / this.valorCambio
      this.pontosAcumuladosEmMeses = ~~this.pontosAcumuladosEmMeses

      this.pontosAcumuladosAposTransferenciaBonificada = this.pontosAcumuladosEmMeses
      if (this.transferenciaBonificada > 0 && this.transferenciaBonificada < 10){
        this.pontosAcumuladosAposTransferenciaBonificada = this.pontosAcumuladosEmMeses * ('1.0' + parseInt(this.transferenciaBonificada))
        this.pontosAcumuladosAposTransferenciaBonificada = ~~this.pontosAcumuladosAposTransferenciaBonificada
      } else if (this.transferenciaBonificada >= 10 && this.transferenciaBonificada <= 99) {
        this.pontosAcumuladosAposTransferenciaBonificada = this.pontosAcumuladosEmMeses * ('1.' + parseInt(this.transferenciaBonificada))
        this.pontosAcumuladosAposTransferenciaBonificada = ~~this.pontosAcumuladosAposTransferenciaBonificada
      } else if (typeof this.transferenciaBonificada === 'string' && this.transferenciaBonificada >= 100) {
        var x = this.transferenciaBonificada.substring(0, 1)
        x = parseInt(x) + 1
        this.pontosAcumuladosAposTransferenciaBonificada = this.pontosAcumuladosEmMeses * (x + '.' + parseInt(this.transferenciaBonificada.slice(1)))
        this.pontosAcumuladosAposTransferenciaBonificada = ~~this.pontosAcumuladosAposTransferenciaBonificada
      }

      this.valorEmRealDosPontos = (parseFloat(this.valorPorMilheiro.replace('.','').replace(',', '.')) / 100) * this.pontosAcumuladosAposTransferenciaBonificada
      this.valorEmRealDosPontos = ~~this.valorEmRealDosPontos / 10

      this.lucroOuPrejuizo = this.valorEmRealDosPontos - this.valorDaAnuidadeEmMeses
      this.lucroOuPrejuizo = ~~this.lucroOuPrejuizo

    },

    limparCampos () {
      this.valorDosGastosDaFaturaMensalmente = ''
      this.pontosPorCompra = ''
      this.valorPorMilheiro = ''
      this.transferenciaBonificada = ''
      this.valorDaAnuidade = ''
    }
  }

}
</script>

<style>

</style>
