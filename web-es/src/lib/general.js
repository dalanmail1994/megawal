
const menuList = [
    {
        name: 'Dashboard',
        icon: "/flags/ic-analytics.svg",
        link:  "/"
    },
    {
        name: 'Wallets',
        icon: "/flags/ic-banking.svg",
        link:  "/wallets"
    },
    {
        name: 'Buy/Sell',
        icon: "/flags/ic-money.svg",
        link:  "/payments",
        space: 'space-x-0'
    },
    {
        name: 'Swap',
        icon: "/flags/ic-swap.svg",
        link:  "/swap"
    },
    {
        name: 'Stake',
        icon: "/flags/ic-savings.svg",
        link:  "/stake"
    },
    {
        name: 'Support Tickets',
        icon: "/flags/ic-support.svg",
        link:  "/support"
    }
]


const menuListAdmin = [
    {
        name: 'Users List',
        icon: "/flags/ic-users.svg",
        link: "/admin/users"
    },
    {
        name: 'Support Tickets',
        icon: "/flags/ic-support.svg",
        link: "/admin/tickets"
    },
    // {
    //     name: 'Payments Management',
    //     icon: "/flags/ic-money.svg",
    //     link: "/admin/payments"
    // },
    {
        name: 'Transactions Management',
        icon: "/flags/ic-swap.svg",
        link: "/admin/transactions"
    },
    // {
    //     name: 'Stacks Management',
    //     icon: "/flags/ic-savings.svg",
    //     link: "/admin/stacks"
    // },
    // {
    //     name: 'Agency Management',
    //     icon: "/flags/ic-office.svg",
    //     link: "/admin/agency"
    // },
    {
        name: 'Go',
        icon: "/flags/ic-back.svg",
        link: "/"
    }
]

export { menuList, menuListAdmin }