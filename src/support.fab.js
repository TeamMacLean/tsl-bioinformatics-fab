import $ from 'jquery';

window.$ = $;
import swal from 'sweetalert2'


const SupportFab = {
    init: function (options) {


        function sendIt(message) {
            $.ajax({
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
            button.append('?')
            // button.append('<svg transform="translate(0, -14) scale(0.5)" aria-hidden="true" data-prefix="fas" data-icon="question" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-question fa-w-12 fa-2x"><path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z" class=""></path></svg>');
            $('body').append(button);
        })
    }
};

window.SupportFab = SupportFab;