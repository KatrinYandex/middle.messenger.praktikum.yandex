import "./style.scss";
import Router from "./utils/Router";
import { Entrance } from "./pages/entrance";
import {Registration} from "./pages/registration";
// import {DialogPage} from "./pages/messenger";
// import {ChangeData} from "./pages/profile/modules/changeData";
import {ChangePassword} from "./pages/profile/modules/changePassword";
import {ProfilePage} from "./pages/profile";
import {MessengerPage} from "./pages/messenger";
import {ChangeDataPage} from "./pages/profile/modules/changeData";
import AuthController from "./controllers/AuthController";
import store from "./utils/Store";

enum Routes {
    entrance = '/',
    registration = '/register',
    profile = '/profile',
    messenger = '/messenger',
    profileSettings = '/profile_settings',
    changePassword = '/change_password'
}
window.addEventListener("DOMContentLoaded", async () => {
    Router
        .use(Routes.entrance, Entrance)
        .use(Routes.registration, Registration)
        .use(Routes.messenger, MessengerPage)
        .use(Routes.profileSettings, ChangeDataPage)
        .use(Routes.changePassword, ChangePassword)
        .use(Routes.profile, ProfilePage)

    switch (window.location.pathname) {}

    try {
        await AuthController.user()
        if (store.getState().user!.data!.id) {
            Router.start();
            Router.go(Routes.profile)
        }
        else {
            Router.start()
            Router.go(Routes.entrance)
        }
    } catch (e) { }
})
