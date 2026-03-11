import "./assets/main.css";
import { mount } from "./utils/view/mount";

const run = async () => {
    const $app = document.querySelector("#app");
    if ($app instanceof HTMLDivElement) {
        const pathname = window.location.pathname;
        await mount($app, pathname);
    }
};

run().catch(console.error);
