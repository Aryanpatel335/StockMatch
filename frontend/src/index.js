import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENTID}>
			<Provider store={store}>
				<App />
			</Provider>
		</GoogleOAuthProvider>
	</React.StrictMode>
);
