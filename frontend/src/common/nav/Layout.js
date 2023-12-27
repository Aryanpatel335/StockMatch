import { Routes, Route } from "react-router-dom";
import Landing from "../../landing/Landing";
import Preferences from "../../preferences/Preferences";
import Watchlist from "../../watchlist/Watchlist";
import Main from "../../main/Main";
import Logout from "../../auth/Logout";

const Layout = () => {
	return (
		<Routes>
			<Route path="/" element={<Landing />}></Route>
			<Route path="/preferences" element={<Preferences />}></Route>
			<Route path="/main" element={<Main />}></Route>
			<Route path="/watchlist" element={<Watchlist />}></Route>
			<Route path="/logout" element={<Logout />}></Route>
		</Routes>
	);
};

export default Layout;
