import {Router} from "aurelia-router";
import 'bootstrap';
export class Index {
   configureRouter(config, router) {
        config.map([
            { route: ["", "suppliers"], moduleId: "./suppliers", nav: true, title: "suppliers", name: "suppliers" },         
        ]);
        this.router = router;
    }
    attached() {
        $(".indexMenuOver").popover({ trigger: "hover" });
    };
}