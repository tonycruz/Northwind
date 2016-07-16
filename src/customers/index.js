import {Router} from "aurelia-router";
import 'bootstrap';

export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ["", "customers"], moduleId: "./customers", nav: true, title: "Customers", name: "customers" },
            { route: "customerNew", moduleId: "./customerNew", title: "New Customer", nav: false, name: "customerNew" },
            { route: "customerOrders", moduleId: "./customerOrders", title: "Customer Orders", nav: false, name: "customerOrders" },
            { route: "customersMaster", moduleId: "./customersMaster", title: "Customer Master", nav: false, name: "customersMaster" },
            { route: "customerDetails/:id", moduleId: "./customerDetails", nav: false, title: "Customer Details", name: "customerDetails" },
            { route: "customerEdit/:id", moduleId: "./customerEdit", title: "Edit customerEdit", nav: false, name: "customerEdit" },
        ]);
        this.router = router;
    }
    attached() {
        $(".indexMenuOver").popover({ trigger: "hover" });
    };
}