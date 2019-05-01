import ajax from '@codexteam/ajax';

/**
 * Module for file uploading.
 */
export default class Uploader {
  /**
   * @param {Object} config
   * @param {function} onUpload - callback for successful file upload
   * @param {function} onError - callback for uploading errors
   */
  constructor({ config, onUpload, onError }) {
    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
  }

  /**
   * Handle clicks on the upload file button
   * @fires ajax.transport()
   * @param {function} onPreview - callback fired when preview is ready
   */
  uploadSelectedFile({ onPreview }) {
    ajax.transport({
      url: this.config.endpoint,
      accept: this.config.types,
      beforeSend: (files) => {
        const reader = new FileReader();

        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
          onPreview(e.target.result);
        };
      },
      fieldName: this.config.field
    }).then((response) => {
      this.onUpload(response);
    }).catch((error) => {
      this.onError(error.message);
    });
  }
}
