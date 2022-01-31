<template>
  <q-page padding>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <q-input clearable outlined dense color="white" label-color="white" class="filtrarCartao full-width" label="Pesquisar cartão" v-model="filter" />
        </div>

        <q-card flat bordered class="my-card my-card-filter" v-for="(cartao, index) in cartoes.filter(element => filter ? element.nome.toLowerCase().includes(filter.toLowerCase()) : element)" :key="`cartao.${index}`">
          <q-card-section class="headerCardCartao">
            <img :src="cartao.icone" alt="Imagem do cartão de crédito" style="max-width: 100%">
            <p>Posição: {{ index + 1 }}°</p>
          </q-card-section>

          <q-card-section>
            <p class="tituloCartoes">Nome:</p><p class="descricaoCartoes">{{ cartao.nome }}</p>
            <p class="tituloCartoes">Acúmulo de pontos:</p><p class="descricaoCartoes">{{ cartao.pontos }}</p>
            <p class="tituloCartoes">Salas vip's:</p><p class="descricaoCartoes">{{ cartao.salas }}</p>
            <p class="tituloCartoes">Anuidade:</p><p class="descricaoCartoes">R$ {{ cartao.anuidade }}</p>
            <p class="tituloCartoes">Observação:</p><p class="descricaoCartoes">{{ cartao.obs }}</p>
          </q-card-section>
        </q-card>

        <div class="col-12">
          <p><strong>FONTE DOS DADOS:</strong><br /><a href="https://www.melhoresdestinos.com.br/cartoes-de-credito" target="_blank">https://www.melhoresdestinos.com.br/cartoes-de-credito</a></p>
        </div>
      </div>

      <q-page-scroller position="bottom-right" :scroll-offset="225" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" style="background-color: #FF522F" />
      </q-page-scroller>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'RankingMelhoresCartoes',

  data () {
    return {
      cartoes: [],
      filter: ''
    }
  },

  mounted () {
    this.pegarListaDeCartoes()
  },

  methods: {

    pegarListaDeCartoes () {
      this.$axios({ method: 'get', url: 'https://cartoes.melhoresdestinos.com.br/cartoes.json_=1643313496330' })
        .then((response) => {
          this.cartoes = response.data.cartoes
          this.removerHtmlErrado()
        })
        .catch(() => {
          this.$q.notify({ message: 'Falha na API, favor contatar clicando <b>aqui: <a href="https://t.me/leop7" target="_blank">@leop7</a></b>', html: true })
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },

    removerHtmlErrado () {
      for (let i = 0; i < this.cartoes.length; i++) {
        if (this.cartoes[i].nome && this.cartoes[i].nome.toLowerCase().includes('<br>')) {
          this.cartoes[i].nome = this.cartoes[i].nome.split('<br>')
          this.cartoes[i].nome = this.cartoes[i].nome.join('\n')
        } else if (this.cartoes[i].nome === null) {
          this.cartoes[i].nome = 'Não há ou não informado'
        }

        if (this.cartoes[i].pontos && this.cartoes[i].pontos.toLowerCase().includes('<br>')) {
          this.cartoes[i].pontos = this.cartoes[i].pontos.split('<br>')
          this.cartoes[i].pontos = this.cartoes[i].pontos.join('\n')
        } else if (this.cartoes[i].pontos === null) {
          this.cartoes[i].pontos = 'Não há ou não informado'
        }

        if (this.cartoes[i].pontos && this.cartoes[i].pontos.toLowerCase().includes('<strong>')) {
          this.cartoes[i].pontos = this.cartoes[i].pontos.replace('<strong>', '')
          this.cartoes[i].pontos = this.cartoes[i].pontos.replace('</strong>', '')
        }

        if (this.cartoes[i].salas && this.cartoes[i].salas.toLowerCase().includes('<br>')) {
          this.cartoes[i].salas = this.cartoes[i].salas.split('<br>')
          this.cartoes[i].salas = this.cartoes[i].salas.join('\n')
        } else if (this.cartoes[i].salas === null) {
          this.cartoes[i].salas = 'Não há ou não informado'
        }

        if (this.cartoes[i].anuidade && this.cartoes[i].anuidade.toLowerCase().includes('<br>')) {
          this.cartoes[i].anuidade = this.cartoes[i].anuidade.split('<br>')
          this.cartoes[i].anuidade = this.cartoes[i].anuidade.join('\n')
        } else if (this.cartoes[i].anuidade === null) {
          this.cartoes[i].anuidade = 'Não há ou não informado'
        }

        if (this.cartoes[i].obs && this.cartoes[i].obs.toLowerCase().includes('<br>')) {
          this.cartoes[i].obs = this.cartoes[i].obs.split('<br>')
          this.cartoes[i].obs = this.cartoes[i].obs.join('\n')
        } else if (this.cartoes[i].obs === null) {
          this.cartoes[i].obs = 'Não há ou não informado'
        }

        if (this.cartoes[i].obs && this.cartoes[i].obs.toLowerCase().includes('<strong>')) {
          this.cartoes[i].obs = this.cartoes[i].obs.replace('<strong>', '')
          this.cartoes[i].obs = this.cartoes[i].obs.replace('</strong>', '')
        }
      }
    }
  }
}
</script>

<style>

</style>