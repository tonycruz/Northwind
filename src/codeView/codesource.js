
import {inject} from "aurelia-framework";
import {ContextCodeBase} from "../modules/ContextCodeBase";
import {Router} from "aurelia-router";
import 'bootstrap';
import * as prism from 'prism';
import Clipboard from 'clipboard';


  
@inject(Router, ContextCodeBase)
export class CodeSource{
     constructor(router, datacontext) {
        this.datacontext = datacontext;
        this.router = router;
        this.client=[];
        this.server=[];
    }
    activate(params) {
    return    this.datacontext.getById(params.id)
            .then(result => {
                 this.client = result.client;
                  this.server = result.server;
                       });
      
    }
    attached() {
       Prism.highlightAll();
       var clipboard = new Clipboard('.codeview');

       clipboard.on('success', function(e) {
           toastr.success("code is in your clipboard", "Code");
        });
    }
}