
import moment from 'moment';

export class DateFormatValueConverter {
    toView(value, format) {
        return moment(value).format('DD/MM/YYYY');
   }
   fromView(value){
       return new Date(value)
   }
} 