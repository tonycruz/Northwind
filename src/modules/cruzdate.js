import {customElement, bindable, inject, bindingMode} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';
import { datepicker } from 'jquery-ui';

@customElement('cruzdate')
@bindable({name: 'value', attribute: 'value', defaultValue: '', defaultBindingMode: bindingMode.twoWay})

@inject(Element)
export class Cruzdate {
    constructor(element) {
        this.element = element;
        this.pickerDate = '';
    }

    valueChanged() {
        var currentvalue = $('.input-group.date', this.element).val();

        if (currentvalue !== this.selected) {
            $('.input-group.date', this.element).datepicker('update', this.value);
        }
    }

    bind(){
        var options = {
            autoclose: true, 
            format: 'dd/mm/yyyy',
        };

        $('.input-group.date', this.element).datepicker(options).datepicker('update', this.value);    

        $('.input-group.date', this.element).on('changeDate', (event) => {           
            this.value = $('.input-group.date', this.element).datepicker('getUTCDate');
        });
    }
}