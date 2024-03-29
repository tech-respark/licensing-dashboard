import dayjs from "dayjs";

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TODAYS_DATE = dayjs(dayjs()).format(DATE_FORMAT)
export const CUSTOM_PLAN_ID = 'CUSTOM';
export const CEO_ROLE = 'CEO';
export const HOS_ROLE = 'HOS';
export const ADMIN_ROLE = 'ADMIN';
export const SUPPORT_ROLE = 'SUPPORT';
export const SALES_PERSON_ROLE = 'Sales Person';

export const STORAGE_KEY = "relfor";

export const LOGO_IMAGE = "https://static.wixstatic.com/media/79a88b_0f69e92af324428ea374e681bfec0e33~mv2.png/v1/fill/w_318,h_64,al_c,lg_1,q_85,enc_auto/79a88b_0f69e92af324428ea374e681bfec0e33~mv2.png"

export const UPDATE_LOADER_STATUS = 'UPDATE_LOADER_STATUS';

export const UPDATE_SEARCH_STATUS = 'UPDATE_SEARCH_STATUS';

export const UPDATE_ERROR_STATUS = 'UPDATE_ERROR_STATUS';

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const SYNC_COOKIE_USER_DATA = 'SYNC_COOKIE_USER_DATA';

export const BACKGROUND_COLORS = ['#F7DBF07D', '#2196f3307D', '#FFDCDC7D', '#F7E8F67D', '#FAFCC27D', '#F7FBFC7D', '#E8DCD57D', '#F8E1F47D', '#D5D6EA7D', '#D7ECD97D', '#EAE4D27D']

export const DEFAULT_ALERT_TIME = 3000; //alert timeout timing

export const DEFAULT_LIGHT_COLOR = '#002864';
export const DEFAULT_DARK_COLOR = '#00C9A7';

export const PRODUCTS_LIST = [
    {
        "id": 1,
        "productId": 1,
        "productName": "RESPARK",
        "active": true
    },
    {
        "id": 2,
        "productId": 2,
        "productName": "DEVOURIN",
        "active": true
    }
]

export const permissionsList = [
    { key: "masterDashboard", value: true, title: "Dashboard" },
    { key: "salesDashboard", value: false, title: "Sales" },
    { key: "clients", value: false, title: "Clients" },
    { key: "modules", value: true, title: "Modules" },
    { key: "users", value: true, title: "Users" },
    { key: "roles", value: true, title: "Roles" },
]

export const getDurationOptions = () => [
    { label: "One Month", value: "monthlyPrice" },
    { label: "One Quarter", value: "quarterlyPrice" },
    { label: "Half Year", value: "halfYearlyPrice" },
    { label: "One Year", value: "yearlyPrice" },
]

export const REQUEST_STATUSES = {
    "INITIATED": "INITIATED",

    "APPROVED_BY_ADMIN": "APPROVED_BY_ADMIN",
    "REJECTED_BY_ADMIN": "REJECTED_BY_ADMIN",
    "NEGOTIATE_BY_ADMIN": "NEGOTIATE_BY_ADMIN",

    "APPROVED_BY_HOS": "APPROVED_BY_HOS",
    "REJECTED_BY_HOS": "REJECTED_BY_HOS",
    "NEGOTIATE_BY_HOS": "NEGOTIATE_BY_HOS",

    "NEGOTIATE_BY_CEO": "NEGOTIATE_BY_CEO",
    "APPROVED_BY_CEO": "APPROVED_BY_CEO",
    "REJECTED_BY_CEO": "REJECTED_BY_CEO",

    "ONBOARDED": "ONBOARDED"
}

export const REQUEST_STATUS_COLORS_LIST: any = {
    "INITIATED": "lime",
    "APPROVED_BY_ADMIN": "green",
    "REJECTED_BY_ADMIN": "red",
    "NEGOTIATE_BY_ADMIN": "blue",
    "APPROVED_BY_HOS": "green",
    "REJECTED_BY_HOS": "red",
    "NEGOTIATE_BY_HOS": "blue",
    "NEGOTIATE_BY_CEO": "blue",
    "APPROVED_BY_CEO": "green",
    "REJECTED_BY_CEO": "red",
    "ONBOARDED": "purple",
}

//  <Tag color="magenta">magenta</Tag>
//  <Tag color="red">red</Tag>
//  <Tag color="volcano">volcano</Tag>
//  <Tag color="orange">orange</Tag>
//  <Tag color="gold">gold</Tag>
//  <Tag color="lime">lime</Tag>
//  <Tag color="green">green</Tag>
//  <Tag color="cyan">cyan</Tag>
//  <Tag color="blue">blue</Tag>
//  <Tag color="geekblue">geekblue</Tag>
//  <Tag color="purple">purple</Tag>