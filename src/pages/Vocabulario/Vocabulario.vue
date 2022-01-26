<template>
  <q-page padding>
    <div class="container">
      <div class="row q-col-gutter-sm">
        <q-card flat bordered class="my-card" v-for="vocabulario in vocabularios" :key="vocabulario.id">
          <q-card-section>
            <div class="text-h6">{{ vocabulario.title }}</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            {{ vocabulario.text }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Vocabulario',

  data () {
    return {
      vocabularios: [
        { id: 1, title: 'BF - Black Friday', text: 'Black Friday é o dia que inaugura a temporada de compras natalícias com significativas promoções em muitas lojas retalhistas e grandes armazéns. É um dia depois do Dia de Ação de Graças nos Estados Unidos, ou seja, celebra-se no dia seguinte à quarta.' },
        { id: 2, title: 'HM - HotMilhas', text: 'A HotMilhas é a forma mais simples e segura de vender as suas milhas TAM (Fidelidade), GOL (Smiles), Azul (Tudo Azul) e Avianca (Amigo) na internet.' },
        { id: 3, title: 'Livelo', text: 'A Livelo é o programa de recompensas criado pelo Bradesco e o Banco do Brasil, que permite trocar pontos por diversos produtos ou serviços. Uma das principais formas para acumular pontos é utilizar os cartões Banco do Brasil e Bradesco na função crédito.' },
        { id: 4, title: 'Milheiro - Mil Milhas', text: 'Milhas aéreas são os pontos acumulados em programas de fidelização de companhias aéreas. Foi uma maneira encontrada por essas companhias para manter seus passageiros fiéis 03através de recompensas que são chamadas de milhas ou pontos.' },
        { id: 5, title: 'PDA - Pão de Açucar', text: 'Cartão de crédito do itau.' },
        { id: 6, title: 'SPP - Seguro de proteção de preço', text: 'Ao comprar um produto com seu cartão Visa, você recebe sem nenhum custo adicional, uma proteção para o caso de encontrar o mesmo produto por um preço menor em até 30 dias depois da compra. A cobertura vale para compras feitas no Brasil e em outros países, mas o valor considerado é o do país onde o produto foi adquirido.' },
        { id: 7, title: 'TAP - TAP Miles&Go', text: 'É o programa de fidelidade da companhia portuguesa TAP que era conhecido anteriormente como Vitória. Entretanto, nos últimos anos o Miles&Go passou por um diversas mudanças que melhoraram o sistema de resgate de passagens com milhas, reduzindo assim o valor das tarifas.' },
        { id: 8, title: 'TPC - The Platinum Card', text: 'Cartão de crédito da American Express.' },
        { id: 9, title: 'TDA - Tudo Azul', text: 'O TudoAzul é o programa de fidelidade oficial da Azul (companhia aerea) que te faz viajar mais.' }
      ]
    }
  }

}
</script>

<style>

</style>