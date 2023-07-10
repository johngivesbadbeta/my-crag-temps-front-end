import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import Contact from "../pages/Contact"

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string
}

const routes: RouteType[] = [
    {
        path: '',
        component: Home,
        name: "Home",
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: "Dashboard",
    },
    {
        path: '/contact',
        component: Contact,
        name: 'Contact',
    },
]

export default routes