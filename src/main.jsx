import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CateringPage from "./CateringPage.jsx";
import SplashPage from "./SplashPage.jsx";
import OrderPage from "./OrderPage.jsx";
import MenuPage from "./MenuPage.jsx";
import AboutPage from "./AboutPage.jsx";
import LocationPage from "./LocationPage.jsx";
import "./index.css";

const LOCATIONS = {
  williamsburg: {
    city: "Williamsburg",
    label: "The Original · Est. 1980",
    address: "627 Merrimac Trail",
    cityState: "Williamsburg, VA 23185",
    phone: "(757) 253-1080",
    toastUrl: "https://order.toasttab.com/online/shortys-diner-627-merrimac-trl",
  },
  yorktown: {
    city: "Yorktown",
    label: "Now Open",
    address: "6500 George Washington Memorial Hwy A",
    cityState: "Yorktown, VA 23692",
    phone: "(757) 867-8777",
    toastUrl: "https://order.toasttab.com/online/shortys-diner-yorktown-6500-george-washington-memorial-highway",
  },
  richmond: {
    city: "Richmond",
    label: "Now Open",
    address: "5625 W Broad St",
    cityState: "Richmond, VA 23230",
    phone: "(804) 308-2070",
    toastUrl: "https://shortysdinerbroad.toast.site/order/shortys-diner-rva-5625-west-broad-street",
  },
  stlouis: {
    city: "St. Louis",
    label: "Now Open",
    address: "12004 Lackland Rd",
    cityState: "St. Louis, MO 63146",
    phone: "",
    toastUrl: "https://shortysdinerbroad.toast.site/order/shortys-diner-st-louis?diningOption=takeout&rwg_token=AFd1xnFisDU7hGTPKU1JOBxczrdpXqv5NZSUCNZxRydiZ5bpj9kM7VwwHXtznY1xeyWckJbPQwVNePgMEIeOoj4k16OZnX49Ew%3D%3D",
  },
};

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {path === "/catering" ? <CateringPage /> : path === "/" ? <SplashPage /> : path === "/order" ? <OrderPage /> : path === "/menu" ? <MenuPage /> : path === "/about" ? <AboutPage /> : path === "/yorktown" ? <LocationPage location={LOCATIONS.yorktown} /> : path === "/richmond" ? <LocationPage location={LOCATIONS.richmond} /> : path === "/stlouis" ? <LocationPage location={LOCATIONS.stlouis} /> : path === "/williamsburg" ? <LocationPage location={LOCATIONS.williamsburg} /> : path === "/williamsburg-full" ? <App /> : <App />}
  </React.StrictMode>
);
