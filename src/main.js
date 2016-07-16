//import {Aurelia} from 'aurelia-framework';
import {ToastrConfig} from "./modules/toastrConfig";
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature("modules")
        .plugin('aurelia-validation')
        .plugin('aurelia-bootstrap-datepicker');
    aurelia.start().then(a => a.setRoot('app'));
   ToastrConfig.setToastrConfigure();
}