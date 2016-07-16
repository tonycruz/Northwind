import {Router} from "aurelia-router";
import 'bootstrap';

export class Index {
   configureRouter(config, router) {
        config.map([
            { route: ["", "shippers"], moduleId: "./shippers", nav: true, title: "shippers", name: "shippers" },
          
        ]);
        this.router = router;
    }
    attached() {
        $(".indexMenuOver").popover({ trigger: "hover" });
    };
}