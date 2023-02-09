import login from "./entrance/entrance-view.hbs";
import registration from "./registration/registration-view.hbs";
import messenger from "./messenger/messenger-view.hbs";
import dialog from "./messenger/dialod.hbs";
import profile_view from "./profile/profile-view.hbs";
import change_data from "./profile/change-data.hbs";
import change_password from "./profile/change-password.hbs";
import error_50x from "./errors/error-50x.hbs";
import error_40x from "./errors/error-40x.hbs";
import chat_settings from "./messenger/chat-settings.hbs";
import register from "./register";
import "./style.scss";

function render(html, id) {
    const element = document.querySelector("#" + id);
    element.innerHTML = html;
}

function read(id) {
    const dialog_item = document.querySelector("#count__" + id);
    dialog_item.innerHTML = "";
    dialog_item.classList.remove("message__count-1");
    dialog_item.classList.add("message__count-0");
}

const ROUTER = {
    login: login,
    registration: registration,
    messenger: messenger,
    profile_view: profile_view,
    change_data: change_data,
    change_password: change_password
}

window.goToPage = function (page, context) {
    console.log(page)
    const template = ROUTER[page];
    render(template(context), "main");
}

window.openDialog = function (id) {
    const context = {
        name: "test name"
    };
    read(id);
    render(dialog(context), "dialog-space")
}

window.openSettings = function (id) {
    const context = {
        name: "Test name"
    }
    render(chat_settings(context), id)
}

function renderError(code) {
    if (code === 500) {
        return error_50x({code: code});
    }
    else {
        return error_40x({code: code});
    }
}
window.addEventListener("DOMContentLoaded", () => {
    register();

    const context = {};
    const html = login(context);

    // const html = renderError(500);

    render(html, "main");
})

