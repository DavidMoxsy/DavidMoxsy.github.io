export const menuItems = [
  {
    title: "Inicio",
    url: "/",
  },
  {
    title: "Cuentas",
    url: "/cuentas",
    submenu: [
      {
        title: "Banco Nacional",
        url: "/banco-nacional",
        submenu: [
          {
            title: "Colones",
            url: "/banco-nacional-colones",
          },
          {
            title: "Dólares",
            url: "banco-nacional-dolares",
          },
        ],
      },
      {
        title: "Banco Popular",
        url: "banco-popular",
        submenu: [
          {
            title: "Colones",
            url: "banco-popular-colones",
          },
          {
            title: "Dólares",
            url: "banco-popular-dolares",
          },
        ],
      },
      {
        title: "Banco Promerica",
        url: "/banco-promerica",
        submenu: [
          {
            title: "Colones",
            url: "banco-promerica-colones",
          },
          {
            title: "Dólares",
            url: "banco-promerica-dolares",
          },
        ],
      },
    ],
  },
  {
    title: "Notas",
    url: "/notas",
  },
];
