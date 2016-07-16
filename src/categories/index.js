import {Router} from "aurelia-router";
import 'bootstrap';
export class Index {
    heading = "Categories Router";
    router;

    configureRouter(config, router) {
        config.map([
            { route: ["", "categories"], moduleId: "./categories", nav: true, title: "categories", name: "categories" },
            { route: "categoryCreate", moduleId: "./categoryCreate", nav: false, title: "categoryCreate", name: "categoryCreate" },
            { route: "categorydetails/:id", moduleId: "./categoryDetails", title: "CategoryDetails", nav: false, name: "categorydetails" },
            { route: "categoryedit/:id", moduleId: "./categoryEdit", title: "Edit Category", nav: false, name: "categoryedit" },
            { route: "categoryDelete/:id", moduleId: "./categoryDelete", title: "Delete Category", nav: false, name: "categoryDelete" },
            { route: "categoryCode/:id", moduleId: "/src/codeView/categoryCode", title: "Categories Code", nav: false, name: "categoryCode" },
            { route: "categoryMaster", moduleId: "./categoryMaster", nav: false, title: "categoryMaster", name: "categoryMaster" },
            { route: "categoryProducts", moduleId: "./categoryProducts", nav: false, title: "categoryProducts", name: "categoryProducts" },
            
        ]);
        this.router = router;
    }
    attached() {
        $(".indexMenuOver").popover({ trigger: "hover" });
    };
}
