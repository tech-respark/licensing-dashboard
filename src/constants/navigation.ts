import { LuBarChartBig, LuContact, LuLayoutList, LuPieChart, LuServerCog, LuUserCog, LuUsers } from "react-icons/lu";

const NavigationMenus = [
    { name: "Dashboard", route: "/dashboard", icon: LuPieChart, label: "Dashboard Page" },
    { name: "Sales Dashboard", route: "/sales", icon: LuLayoutList, label: "Sales Page" },
    { name: "Clients", route: "/clients", icon: LuContact, label: "Clients Page" },
    { name: "Reports", route: "/reports", icon: LuBarChartBig, label: "Reports Page" },
    { name: "Role", route: "/roles", icon: LuUserCog, label: "Plans Page" },
    { name: "Modules", route: "/modules", icon: LuServerCog, label: "Modules Page" },
    { name: "Users", route: "/users", icon: LuUsers, label: "Users Page" },
]

export default NavigationMenus;