export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['','welcome'], name: 'welcome', moduleId: './welcome', nav: true, title:'Welcome' },
       { route: "categories", moduleId: "./categories/index", nav: true, title: "categories", name: "categories" },
       { route: "customerIndex", moduleId: "./customers/index", nav: true, title: "customers", name: "customerIndex" },
       { route: "ordersIndex", moduleId: "./orders/index", nav: true, title: "orders", name: "ordersIndex" },
       { route: "productsIndex", moduleId: "./products/index", nav: true, title: "products", name: "productsIndex" },
       { route: "shippersIndex", moduleId: "./shippers/index", nav: true, title: "shippers", name: "shippersIndex" },
       { route: "suppliersIndex", moduleId: "./suppliers/index", nav: true, title: "suppliers", name: "suppliersIndex" },
        { route:"CodeView/:id", moduleId: "./codeView/CodeSource", title: "Code View", nav: false, name: "codeView" },
    ]);

    this.router = router;
  }
}
