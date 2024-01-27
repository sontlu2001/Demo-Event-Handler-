import Applayout from "@/layout/Applayout";

const routes = [
  {
    path: "/account",
    component: Applayout,
    name: "account",
    meta: {
      title: "Account",
      icon: "user",
    },
    children: [
      {
        path: "profile",
        component: () => import("./Profile/index.vue"),
        name: "profile",
        meta: {
          title: "Profile",
          icon: "user",
        },
      },
    ],
  },
  // {
  //     path: '/shop',
  //     component: () => import('./List'),
  //     name: 'shop',
  //     meta: {
  //         title: 'Shop',
  //         icon: 'shopping'
  //     }
  // }
];

export default routes;
