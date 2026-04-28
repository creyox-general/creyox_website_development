odoo.define('cr_internal_website_theme.job_apply', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');

    publicWidget.registry.JobApplyForm = publicWidget.Widget.extend({
        selector: '.professional_apply_form',
        events: {
            'change .file_input': '_onFileChange',
        },

        /**
         * @private
         * @param {Event} ev
         */
        _onFileChange: function (ev) {
            const input = ev.currentTarget;
            const fileName = input.files.length > 0 ? input.files[0].name : "Choose file or drag here";
            const labelSpan = this.$('.file_upload_label span');

            if (labelSpan.length) {
                labelSpan.text(fileName);

                // Optional: add a success class to the label
                if (input.files.length > 0) {
                    this.$('.file_upload_label').addClass('file_selected');
                } else {
                    this.$('.file_upload_label').removeClass('file_selected');
                }
            }
        },
    });
});
