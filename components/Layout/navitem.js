export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'fa fa-tachometer-alt'
  }, {
    name: 'Users',
    icon: 'fa fa-users',
    tree: [
      {
        path: '/dashboard/admin/users/active',
        name: 'Active Users',
        icon: 'far fa-circle'
      }, {
        path: '/dashboard/admin/users/blocked',
        name: 'Blocked Users',
        icon: 'far fa-circle'
      }
    ]
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
  }
]
