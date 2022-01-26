<template>
  <q-layout view="lhh lpR lFf">

    <q-header>
      <div>
        <q-btn dense flat round class="menu" icon="menu_open" @click="left = !left" />
      </div>
      <div>
        <p>{{ titulo }}</p>
      </div>
      <div style="width: 33.59px;"></div>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit q-py-sm">
        <q-list>
          <q-item-label class="logo text-center">
            <img src="/icons/434x0w.png" alt="Ícone help milhas" class="q-py-lg">
            <span class="text-body1">Help Milhas</span>
          </q-item-label>

          <!-- DP menu start -->

          <q-item clickable :to="{ name: 'r_calculadoracomprainteligente' }" @click="titulo = 'Compra inteligente'">
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

          <q-item clickable :to="{ name: 'r_vocabulario' }" @click="titulo = 'Vocabulário'">
            <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Vocabulário</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable :to="{ name: 'r_quemsomos' }" @click="titulo = 'Quem somos'">
            <q-item-section avatar>
              <q-icon name="help_outline" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Quem Somos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="show(true)">
            <q-item-section avatar>
              <q-icon name="share" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Compartilhar site</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
        <div class="lojasDeAplicativos q-pt-xl">
          <a href="https://apps.apple.com/ga/app/help-milhas/id1600378714" target="_blank"><img src="/img/appStore.jpg" alt="Loja de aplicativos apple" style="width: 150px" /></a>
          <a href="https://play.google.com/store/apps/details?id=com.helpmilhas" target="_blank"><img src="/img/googlePlay.png" alt="Loja de aplicativos google" style="width: 150px" /></a>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { useQuasar, copyToClipboard } from 'quasar'

export default {
  name: 'MainMenu',

  setup () {
    const $q = useQuasar()

    function show (grid) {
      $q.bottomSheet({
        dark: true,
        message: 'Compartilhar site no',
        grid,
        actions: [
          {
            label: 'Whatsapp',
            img: '/logo/whatsapp_logo_icon_134602.png',
            id: 'whatsapp',
            url: 'https://api.whatsapp.com/send?text=Olá, dê uma olhada neste site que estou usando para me auxiliar em compras inteligentes para ganhar pontos e transformar em milhas (dinheiro 💰🤑💰). https://helpmilhas.netlify.app/#/'
          },
          {
            label: 'Twitter',
            img: '/logo/twitter_logo_icon_134613.png',
            id: 'twitter',
            url: 'https://twitter.com/intent/tweet?text=Estou%20usando%20este%20site%20para%20calcular%20compras%20inteligentes%2C%20ganhar%20pontos%20e%20transformar%20em%20milhas%20(dinheiro%20%F0%9F%92%B0%F0%9F%A4%91%F0%9F%92%B0)&url=https%3A%2F%2Fhelpmilhas.netlify.app%2F%23%2F'
          },
          {
            label: 'Linkedin',
            img: '/logo/linkedin_logo_icon_134604.png',
            id: 'linkedin',
            url: 'https://www.linkedin.com/sharing/share-offsite/?url=https://helpmilhas.netlify.app'
          },
          {
            label: 'Telegram',
            img: '/logo/telegram_logo_icon_134592.png',
            id: 'telegram',
            url: 'https://t.me/share/url?url=https://helpmilhas.netlify.app/&text=Olá, dê uma olhada neste site que estou usando para me auxiliar em compras inteligentes para ganhar pontos e transformar em milhas (dinheiro 💰🤑💰).'
          },
          {
            label: 'Copiar link',
            img: '/logo/copy-content_icon-icons.com_40923.png',
            id: 'copyUrl',
            url: 'https://helpmilhas.netlify.app'
          }
        ]
      }).onOk(action => {
        if (action.id === 'copyUrl') {
          copyToClipboard(action.url)
            .then(() => {
              $q.notify({ message: 'Url copiada!' })
            })
            .catch(() => {
              $q.notify({ message: 'Não foi possível copiar a url'})
            })
          return
        }
        window.open(action.url, '_blank')
      })
    }

    return { show }
  },

  data () {
    return {
      left: false,
      titulo: 'Compra inteligente'
    }
  }
}
</script>
