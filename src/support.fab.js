import $ from 'jquery';

window.$ = $;
import swal from 'sweetalert2'


const SupportFab = {
    init: function (options) {


        function sendIt(message) {
            return $.ajax({
                data: 'payload=' + JSON.stringify({
                    "text": `message via ${window.location.hostname} ${message}`
                }),
                dataType: 'json',
                processData: false,
                type: 'POST',
                url: options.url
            });
        }

        function askForInfo() {
            swal({
                type: 'question',
                title: 'Please Provide Feedback',
                input: 'textarea',
                animation: false,
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                preConfirm: (message) => {
                    return sendIt(message)
                        .then(response => {
                            return response;
                        })
                        .catch(error => {
                            swal.showValidationMessage(
                                `Reporting failed: please contact ${options.email} instead.`
                            )
                        })
                },
                allowOutsideClick: () => !swal.isLoading()
            }).then((result) => {
                if (result.value) {
                    swal({
                        title: `Your feedback has been received, Thank you.`,
                        animation: false
                    })
                }
            })
        }


        $(function () {
            const button = $('<div/>', {
                id: 'support-fab-button',
                click: function () {
                    askForInfo();
                },
                css: {
                    'font-family': 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
                    'font-weight': '900',
                    'background-color': '#FC4482',
                    'border-radius': '100%',
                    'position': 'fixed',
                    'bottom': '32px',
                    'right': '32px',
                    'width': '60px',
                    'height': '60px',
                    'color': 'white',
                    'align-text': 'center',
                    'text-align': 'center',
                    'line-height': '60px',
                    'font-size': '50px',
                    'z-index': '2',
                    'transition-timing-function': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    'transition-duration': '400ms',
                    'cursor': 'pointer'
                },
                mouseenter: function () {
                    $(this).css({
                        '-webkit-transform': 'scale(1.2, 1.2) translate3d(0, 0, 0)',
                        'transform': 'scale(1.2, 1.2) translate3d(0, 0, 0)'
                    })
                },
                mouseout: function () {
                    $(this).css({
                        '-webkit-transform': 'scale(1, 1) translate3d(0, 0, 0)',
                        'transform': 'scale(1, 1) translate3d(0, 0, 0)',
                    })
                }
            });
            button.append('?');
            $('body').append(button);
        })
    }
};

window.SupportFab = SupportFab;