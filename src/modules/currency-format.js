import accounting from 'openexchangerates/accounting.js';
export class CurrencyFormatValueConverter {
    toView(value, format) {
        if (value === null || value === undefined || isNaN(value)) {
            return null;
        }
        return accounting.formatMoney(value, format);
    }
}