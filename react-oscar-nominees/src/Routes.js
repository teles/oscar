import Nominees from "./pages/Nominees";
import Favorites from "./pages/Favorites";
import WatchList from "./pages/WatchList";

const Routes = {
    home: {
        title: "🏠 Nominees",
        path: "/",
        exact: true,
        component: Nominees
    },
    favorites: {
        title: "⭐ My favorites",
        path: "/favorites",
        exact: true,
        component: Favorites
    },
    watchList: {
        title: "☑️ My watch list",
        path: "/watch-list",
        exact: true,
        component: WatchList
    }
};

export default Routes;
