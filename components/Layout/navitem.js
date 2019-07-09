export default [
  {
    path: '/dashboard/admin',
    name: 'Dashboard',
    icon: 'fa fa-tachometer-alt'
  }, {
    path: '/dashboard/admin/users/active',
    name: 'Users',
    icon: 'fa fa-users'
  }, {
    name: 'Food',
    icon: 'fas fa-utensils',
    tree: [
      {
        path: '/dashboard/admin/food/categories',
        name: 'Categories',
        icon: 'far fa-circle'
      }, {
        path: '/dashboard/admin/food/lists',
        name: 'Lists',
        icon: 'far fa-circle'
      }
    ]
  }, {
    path: '/dashboard/admin/activities',
    name: 'Activities',
    icon: 'fas fa-running'
  }, {
    name: 'Newsfeed',
    icon: 'fas fa-newspaper',
    tree: [
      {
        path: '/dashboard/admin/newsfeed/articles',
        name: 'Articles',
        icon: 'far fa-circle'
      }, {
        path: '/dashboard/admin/newsfeed/quotes',
        name: 'Quotes',
        icon: 'far fa-circle'
      }
    ]
  }, {
    path: '/dashboard/admin/comparison',
    name: 'Comparison',
    icon: 'fas fa-chart-bar'
  }
]
