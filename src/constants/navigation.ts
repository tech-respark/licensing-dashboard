import { LuBarChartBig, LuContact, LuLayoutList, LuPieChart, LuServerCog, LuUserCog, LuUsers } from "react-icons/lu";

const NavigationMenus = [
    { active:true,name: "Dashboard", route: "/dashboard", icon: LuPieChart, label: "Dashboard Page" },
    { active:true,name: "Sales Dashboard", route: "/sales", icon: LuLayoutList, label: "Sales Page" },
    { active:true,name: "Clients", route: "/clients", icon: LuContact, label: "Clients Page" },
    { active:true,name: "Reports", route: "/reports", icon: LuBarChartBig, label: "Reports Page" },
    { active:true,name: "Role", route: "/roles", icon: LuUserCog, label: "Plans Page" },
    { active:true,name: "Modules", route: "/modules", icon: LuServerCog, label: "Modules Page" },
    { active:true,name: "Users", route: "/users", icon: LuUsers, label: "Users Page" },
]

export default NavigationMenus;