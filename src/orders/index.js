import {Router} from "aurelia-router";
import 'bootstrap';
export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ["", "orders"], moduleId: "./orders", nav: true, title: "Orders", name: "customerOrder" },
            { route: "orderNew", moduleId: "./orderNew", title: "New Customer Order", nav: false, name: "NewOrder" },
            { route: "orderEdit/:id", moduleId: "./orderEdit", title: "Edit Order", nav: false, name: "EditOrder" },
        ]);
        this.router = router;
    }
    attached() {
        $(".indexMenuOver").popover({ trigger: "hover" });
    };
}