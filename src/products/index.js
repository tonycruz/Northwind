import {Router} from "aurelia-router";
import 'bootstrap';
export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ["", "products"], moduleId: "./products", nav: true, title: "products", name: "Products" },
        ]);
        this.router = router;
    }
    attached() {
        $(".indexMenuOver").popover({ trigger: "hover" });
    };
}