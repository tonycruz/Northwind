import { customElement, bindable, inject } from 'aurelia-framework';
import 'jquery-ui';

@customElement('datepicker')
@inject(Element)
export class Datepicker {
    @bindable id = '';
    @bindable name = '';
    @bindable options = {};

    constructor(Element) {
        this.element = Element;

        if (!this.id && this.name) {
            this.id = this.name;
        }

        if (!this.name && this.id) {
            this.name = this.id;
        }
    }

    attached() {
        $(`#${this.id}`).datepicker(this.options)
            .on('change', e => {
                let changeEvent = new CustomEvent('input', {
                    detail: {
                        value: e.val
                    },
                    bubbles: true
                });

                this.element.dispatchEvent(changeEvent);
            });
    }

    detached() {
        $(`#${this.id}`).datepicker('destroy').off('change');
}
}