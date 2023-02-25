import "./style.scss";
import { Entrance } from "./pages/entrance";

function append(html: HTMLElement, id) {
    const element = document.querySelector("#" + id);
    element.appendChild(html);
}

window.addEventListener("DOMContentLoaded", () => {
    const entrance = new Entrance();
    console.log(entrance)
    append(entrance.element, "main");
})
