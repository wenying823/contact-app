const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'insert', component: () => import('pages/ContactForm.vue') },
      { path: 'index', component: () => import('pages/ContactListPage.vue') },
      { path: 'edit/:id', component: () => import('pages/EditContact.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
