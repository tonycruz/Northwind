import 'toastr';
export class ToastrConfig {
    static setToastrConfigure() {
        toastr.options.showDuration = 200;
        toastr.options.timeOut = 2000;
        toastr.options.hideDuration = 1000;
        toastr.options.positionClass = "toast-bottom-right";
        toastr.options.extendedTimeOut = 1000;
        toastr.options.showEasing = 'swing';
        toastr.options.hideEasing = 'linear';
        toastr.options.showMethod = 'fadeIn';
        toastr.options.hideMethod = 'fadeOut';
    }
}