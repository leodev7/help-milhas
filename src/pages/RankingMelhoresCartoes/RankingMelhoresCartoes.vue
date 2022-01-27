<template>
  <q-page padding>
    <div class="container">
      <div class="row">
        <q-card flat bordered class="my-card" v-for="cartao in cartoes" :key="cartao.id">
          <q-card-section class="headerCardCartao">
            <img :src="cartao.icone" alt="Imagem do cartão de crédito" style="max-width: 100%">
            <p>Posição: {{ cartao.id }}</p>
          </q-card-section>

          <q-card-section>
            <p class="tituloCartoes">Nome:</p><p class="descricaoCartoes">{{ cartao.nome }}</p>
            <p class="tituloCartoes">Acúmulo de pontos:</p><p class="descricaoCartoes">{{ cartao.pontos }}</p>
            <p class="tituloCartoes">Salas vip's:</p><p class="descricaoCartoes">{{ cartao.salas }}</p>
            <p class="tituloCartoes">Anuidade:</p><p class="descricaoCartoes">R$ {{ cartao.anuidade }}</p>
            <p class="tituloCartoes">Observação:</p><p class="descricaoCartoes">{{ cartao.obs }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'RankingMelhoresCartoes',

  data () {
    return {
      cartoes: []
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
      }
    }
  }
}
</script>

<style>

</style>