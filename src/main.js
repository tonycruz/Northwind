import {ToastrConfig} from "./modules/toastrConfig";
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature("modules")
        .plugin('aurelia-validation')
    aurelia.start().then(a => a.setRoot('app'));
   ToastrConfig.setToastrConfigure();
}