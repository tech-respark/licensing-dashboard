import { LuBarChartBig, LuContact, LuLayoutList, LuPackageOpen, LuPieChart, LuServerCog, LuUserCog } from "react-icons/lu";

const NavigationMenus = [
    { name: "Dashboard", route: "/dashboard", icon: LuPieChart, label: "Dashboard Page" },
    { name: "Sales", route: "/sales", icon: LuLayoutList, label: "Sales Page" },
    { name: "Clients", route: "/clients", icon: LuContact, label: "Clients Page" },
    { name: "Reports", route: "/reports", icon: LuBarChartBig, label: "Reports Page" },
    { name: "Plans", route: "/plans", icon: LuPackageOpen, label: "Plans Page" },
    { name: "Modules", route: "/modules", icon: LuServerCog, label: "Modules Page" },
    { name: "Users", route: "/users", icon: LuUserCog, label: "Users Page" },
]

export default NavigationMenus;