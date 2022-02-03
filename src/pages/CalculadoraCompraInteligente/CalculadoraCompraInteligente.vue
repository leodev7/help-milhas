<template>
  <q-page padding>
    <div class="container">
      <div class="row q-col-gutter-sm">

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" maxlength="9" prefix="R$ " color="black" label-color="black" bg-color="white" v-model.lazy="precoDeCompraDoProduto" v-money="money" class="full-width" label="Preço de compra do Produto" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" mask="##" color="black" label-color="black" bg-color="white" v-model="quantidadeDePontosPorReal" class="full-width" label="Quantidade de pontos por real (do produto)" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-xs-12 col-md-6">
          <p class="q-mb-none" style="display:flex">Pontos por:<q-select borderless dense color="black" style="margin-top: -9px" class="q-pl-md" v-model="moeda" :options="tiposDeMoedas" option-value="id" option-label="name" emit-value map-options @update:model-value="valorDaMoeda()" /></p>
          <p>R$ {{ valorCambio }}</p>
        </div>

        <div class="col-xs-12 col-md-6">
          <q-input outlined dense inputmode="numeric" mask="#.##" color="black" label-color="black" bg-color="white" v-model="quantidadeDePontosPorRealNoCartao" class="full-width" label="Quantidade de pontos por real no cartão" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" mask="###" color="black" label-color="black" bg-color="white" v-model="transferenciaBonificada" class="full-width" label="Transferência Bonificada (%)" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12">
          <q-input outlined dense inputmode="numeric" maxlength="5" prefix="R$ " color="black" label-color="black" bg-color="white" v-model.lazy="valorDoMilheiro" v-money="money" class="full-width" label="Valor do Milheiro" @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12" style="display: flex; justify-content: space-between;">
          <p>Vai tentar o Seguro Proteção de Preço?</p>
          <q-checkbox flat round color="green" v-model="usaraSpp" size="xs" class="text-capitalize q-ml-sm" :label="usaraSpp ? 'SIM' : 'NÃO'" left-label @update:model-value="calculandoValorFinal()" />
        </div>

        <div class="col-12 q-pb-md" v-if="usaraSpp">
          <q-input outlined dense inputmode="numeric" maxlength="7" prefix="R$ " color="black" label-color="black" bg-color="white" v-model.lazy="valorDoSeguroProtecaoDePreco" v-money="money" class="full-width" label="Valor do Seguro Proteção de Preço" @update:model-value="calculandoValorFinal()" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 tabela">
          <table style="width:100%">
            <tr>
              <th>Preço do Produto:</th>
              <td>R$ {{ precoDeCompraDoProduto }}</td>
            </tr>
            <tr>
              <th>Total de pontos pelo Produto:</th>
              <td>{{ totalDePontosPeloProduto }}</td>
            </tr>
            <tr>
              <th>Total de pontos pelo Cartão:</th>
              <td>{{ totalDePontosPeloCartao }}</td>
            </tr>
            <tr>
              <th>Total de pontos Produto + Cartão:</th>
              <td>{{ totalDePontosProdutosECartao }}</td>
            </tr>
            <tr>
              <th>Total de pontos após transferência de {{ transferenciaBonificada }} %:</th>
              <td>{{ totalDePontosAposTransferenciaCalculado }}</td>
            </tr>
            <tr>
              <th>Valor recuperado com pontos:</th>
              <td>R$ {{ valorRecuperadoComPontos }}</td>
            </tr>
            <tr v-if="usaraSpp">
              <th>Valor do Seguro Proteção de Preço:</th>
              <td>R$ {{ valorDoSeguroProtecaoDePreco }} </td>
            </tr>
            <tr>
              <th>Valor final do produto:</th>
              <td>R$ {{ valorFinalDoProduto }}</td>
            </tr>
            <tr>
              <th>Desconto em porcentagem:</th>
              <td>{{ descontoEmPorcentagem }}%</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="row q-mt-sm">
        <div class="col-12">
          <q-btn outline label="Limpar" class="botaoLimpar full-width" @click="limparCampos()" />
        </div>
      </div>

      <div class="row q-pt-md">
        <div class="col-12 footer">
          <p>Desenvolvido por <a href="https://programadorzao.com.br/" target="_blank">Joabson (Programadorzão)</a> para <a href="https://apps.apple.com/ga/app/help-milhas/id1600378714" target="_blank">iOS</a> e <a href="https://play.google.com/store/apps/details?id=com.helpmilhas" target="_blank">Android</a>.</p>
          <p>E por <a href="https://leodev7.github.io/portfolio/" target="_blank">Leonardo (leop7)</a> para web.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {VMoney} from 'v-money'

export default {
  name: 'CalculadoraCompraInteligente',
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

      usaraSpp: false,

      precoDeCompraDoProduto: null,
      quantidadeDePontosPorReal: null,
      quantidadeDePontosPorRealNoCartao: null,
      transferenciaBonificada: null,
      valorDoMilheiro: '',
      valorDoSeguroProtecaoDePreco: '',

      totalDePontosPeloProduto: null,
      totalDePontosPeloCartao: null,
      totalDePontosProdutosECartao: null,
      totalDePontosAposTransferenciaCalculado: null,

      valorRecuperadoComPontos: null,
      valorFinalDoProduto: null,
      descontoEmPorcentagem: null
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
      this.totalDePontosPeloProduto = (parseFloat(this.precoDeCompraDoProduto.replace('.','').replace(',', '.')) * this.quantidadeDePontosPorReal)
      this.totalDePontosPeloProduto = ~~this.totalDePontosPeloProduto

      this.totalDePontosPeloCartao = (parseFloat(this.precoDeCompraDoProduto.replace('.','').replace(',', '.')) / this.valorCambio) * this.quantidadeDePontosPorRealNoCartao
      this.totalDePontosPeloCartao = ~~this.totalDePontosPeloCartao

      this.totalDePontosProdutosECartao = this.totalDePontosPeloProduto + this.totalDePontosPeloCartao

      this.totalDePontosAposTransferenciaCalculado = this.totalDePontosProdutosECartao
      if (this.transferenciaBonificada > 0 && this.transferenciaBonificada < 10){
        this.totalDePontosAposTransferenciaCalculado = this.totalDePontosProdutosECartao * ('1.0' + parseInt(this.transferenciaBonificada))
        this.totalDePontosAposTransferenciaCalculado = ~~this.totalDePontosAposTransferenciaCalculado
      } else if (this.transferenciaBonificada >= 10 && this.transferenciaBonificada <= 99) {
        this.totalDePontosAposTransferenciaCalculado = this.totalDePontosProdutosECartao * ('1.' + parseInt(this.transferenciaBonificada))
        this.totalDePontosAposTransferenciaCalculado = ~~this.totalDePontosAposTransferenciaCalculado
      } else if (typeof this.transferenciaBonificada === 'string' && this.transferenciaBonificada >= 100) {
        var x = this.transferenciaBonificada.substring(0, 1)
        x = parseInt(x) + 1
        this.totalDePontosAposTransferenciaCalculado = this.totalDePontosProdutosECartao * (x + '.' + parseInt(this.transferenciaBonificada.slice(1)))
        this.totalDePontosAposTransferenciaCalculado = ~~this.totalDePontosAposTransferenciaCalculado
      }

      this.valorRecuperadoComPontos = (parseFloat(this.valorDoMilheiro.replace('.','').replace(',', '.')) / 100) * this.totalDePontosAposTransferenciaCalculado
      this.valorRecuperadoComPontos = ~~this.valorRecuperadoComPontos / 10

      this.valorFinalDoProduto = parseFloat(this.precoDeCompraDoProduto.replace('.','').replace(',', '.')) - this.valorRecuperadoComPontos
      if (this.usaraSpp && this.valorDoSeguroProtecaoDePreco) {
        this.valorFinalDoProduto -= parseFloat(this.valorDoSeguroProtecaoDePreco.replace('.','').replace(',', '.'))
      } else if (!this.usaraSpp && this.valorDoSeguroProtecaoDePreco) {
        this.valorDoSeguroProtecaoDePreco = ''
      }

      this.descontoEmPorcentagem = ((~~this.valorFinalDoProduto * 100) / parseFloat(this.precoDeCompraDoProduto.replace('.','').replace(',', '.'))) - 100
      this.descontoEmPorcentagem = ~~Math.abs(this.descontoEmPorcentagem)

      this.valorFinalDoProduto = this.valorFinalDoProduto.toFixed(2).replace('.', ',')

    },

    limparCampos () {
      this.usaraSpp = false
      this.precoDeCompraDoProduto = ''
      this.quantidadeDePontosPorReal = ''
      this.quantidadeDePontosPorRealNoCartao = ''
      this.transferenciaBonificada = ''
      this.valorDoMilheiro = ''
      this.valorDoSeguroProtecaoDePreco = ''
    }
  }

}
</script>

<style>

</style>
