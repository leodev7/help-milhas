
const routes = [
  {
    path: '',
    component: () => import('layouts/MainMenu.vue'),
    children: [
      { path: '', name: 'r_index', component: () => import('pages/Index.vue') },
      { path: '', name: 'r_calculadoracomprainteligente', component: () => import('pages/CalculadoraCompraInteligente/CalculadoraCompraInteligente.vue') }
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
