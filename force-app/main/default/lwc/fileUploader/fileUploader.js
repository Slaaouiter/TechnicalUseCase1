import { LightningElement, api } from "lwc";

export default class FilePreviewAndDownloads extends LightningElement {

  newFileWasUploaded = false;
  imageUrl;
  documentId;

  @api recordId;

  @api
  get uploadedFileUrl() {
    return this.imageUrl;
  }
  set uploadedFileUrl(value) {
    this.imageUrl = value;
  }

  @api
  get contentDocumentId(){
    return this.documentId;
  }

  set contentDocumentId(value){
    this.documentId = value;
  }

  get acceptedFormats() {
    return [".jpg", ".png"];
  }

  handleUploadFinished(event) {
    console.log("ID ==>" + this.recordId);
    const uploadedFiles = event.detail.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const uploadedFile = uploadedFiles[0];
      this.newFileWasUploaded = true;
      this.imageUrl =
        "/sfc/servlet.shepherd/version/download/" +
        uploadedFile.contentVersionId;
      this.documentId = uploadedFile.documentId;
    }
  }
}
