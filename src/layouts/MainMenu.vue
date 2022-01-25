<template>
  <q-layout view="lhh lpR lFf">

    <q-header>
      <div>
        <q-btn dense flat round class="menu" icon="menu_open" @click="left = !left" />
      </div>
      <div>
        <p>Compra inteligente</p>
      </div>
      <div></div>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <q-scroll-area class="fit q-py-sm">
        <q-list>
          <q-item-label class="logo text-center">
            <img src="/icons/434x0w.png" alt="Ícone help milhas" class="q-py-lg">
            <span class="text-body1">Help Milhas</span>
            <br /><br />
          </q-item-label>

          <!-- DP menu start -->

          <q-item clickable :to="{ name: 'r_calculadoracomprainteligente' }">
            <q-item-section avatar>
              <q-icon name="widgets" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Calculadora compra inteligente</q-item-label>
            </q-item-section>
          </q-item>

          <q-item disable clickable :to="{ name: '#' }">
            <q-item-section avatar>
              <q-icon name="calculate" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Calculadora Gasto Mensais</q-item-label>
            </q-item-section>
          </q-item>

          <q-item disable clickable :to="{ name: '#' }">
            <q-item-section avatar>
              <q-icon name="business" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Calculadora Valor do Milheiro</q-item-label>
            </q-item-section>
          </q-item>

          <q-item disable clickable :to="{ name: '#' }">
            <q-item-section avatar>
              <q-icon name="explore" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Central de Notificações</q-item-label>
            </q-item-section>
          </q-item>

          <q-item disable clickable :to="{ name: '#' }">
            <q-item-section avatar>
              <q-icon name="credit_card" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Ranking dos Melhores Cartões</q-item-label>
            </q-item-section>
          </q-item>

          <q-item disable clickable :to="{ name: '#' }">
            <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Vocabulário</q-item-label>
            </q-item-section>
          </q-item>

          <q-item disable clickable :to="{ name: '#' }">
            <q-item-section avatar>
              <q-icon name="help_outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Quem Somos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item disable clickable :to="{ name: '#' }">
            <q-item-section avatar>
              <q-icon name="share" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Compartilhar o App</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainMenu',

  data () {
    return {
      left: false
    }
  }
}
</script>
