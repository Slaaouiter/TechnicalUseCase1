import { api, LightningElement, track, wire } from "lwc";
import { getPicklistValues, getObjectInfo } from "lightning/uiObjectInfoApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import USER_ID from "@salesforce/user/Id";

import createMovie from "@salesforce/apex/MovieController.createMovie";
import MOVIE_OBJECT from "@salesforce/schema/Movie__c";
import TYPE_FIELD from "@salesforce/schema/Movie__c.Type__c";

export default class NewMovieModalLWC extends LightningElement {
  userId = USER_ID;
  showModal = false;
  showNameRequiredMessage = false;
  @wire(getObjectInfo, { objectApiName: MOVIE_OBJECT })
  movieMetadata;

  @wire(getPicklistValues, {
    recordTypeId: "$movieMetadata.data.defaultRecordTypeId",
    fieldApiName: TYPE_FIELD
  })
  picklistValues;

  @track
  types = [];

  @track
  movie = {
    Name: "",
    Type__c: "",
    Description__c: "",
    Rating__c: 0,
    Picture__c: ""
  };

  @api
  get movieCreated() {
    return this.movie;
  }

  set movieCreated(value) {
    this.movie = value;
  }
  @api
  show() {
    this.showModal = true;
  }

  handleCancel() {
    this.showModal = false;
  }

  handleRatingChanged(event) {
    if (event.detail.rating) {
      this.movie.Rating__c = event.detail.rating;
    }
  }

  handleNameChange(event) {
    if (event.target.value) {
      this.movie.Name = event.target.value;
      if (this.showNameRequiredMessage) {
        this.showNameRequiredMessage = false;
      }
    }
  }

  handleTypeChange(event) {
    if (event.target.value) {
      this.movie.Type__c = event.target.value;
    }
  }

  handleDescriptionChange(event) {
    if (event.target.value) {
      this.movie.Description__c = event.target.value;
    }
  }

  handleSave() {
    if(!this.movie.Name){
      this.showNameRequiredMessage = true;
    }
    else{
      let fileUploader = this.template.querySelector("c-file-uploader");
      this.movie.Picture__c = fileUploader.uploadedFileUrl;
      let actors = this.template.querySelector("c-actors").actors;
      console.log(JSON.stringify(this.movie));
      console.log(JSON.stringify(actors));
      console.log(fileUploader.contentDocumentId);
      createMovie({
        movie: this.movie,
        actorsIds: actors,
        contentDocumentId: fileUploader.contentDocumentId
      })
        .then(() => {
          this.showModal = false;
          let event = new ShowToastEvent({
            message: "Hi there! the movie was created"
          });
          this.dispatchEvent(event);
        })
        .catch((error) => {
          let event = new ShowToastEvent({
            message: "Ooops an error occured" + JSON.stringify(error)
          });
          this.dispatchEvent(event);
        });
    }
  }
}
