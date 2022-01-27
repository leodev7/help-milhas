
const routes = [
  {
    path: '',
    component: () => import('layouts/MainMenu.vue'),
    children: [
      { path: '', name: 'r_index', component: () => import('pages/Index.vue') },
      { path: '', name: 'r_calculadoracomprainteligente', component: () => import('pages/CalculadoraCompraInteligente/CalculadoraCompraInteligente.vue') },
      { path: '', name: 'r_calcularvalormilheiro', component: () => import('pages/CalcularValorMilheiro/CalcularValorMilheiro.vue') },
      { path: '', name: 'r_vocabulario', component: () => import('pages/Vocabulario/Vocabulario.vue') },
      { path: '', name: 'r_quemsomos', component: () => import('pages/QuemSomos/QuemSomos.vue') }
    ]
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
