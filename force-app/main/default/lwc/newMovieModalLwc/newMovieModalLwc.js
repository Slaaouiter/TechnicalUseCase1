import { api, LightningElement, track, wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi'; 
import CATEGORY_FIELD from '@salesforce/schema/Movie__c.Category__c'; 
import MOVIE_OBJECT from '@salesforce/schema/Movie__c';


export default class NewMovieModalLWC extends LightningElement {
    showModal = false;

    @wire(getObjectInfo, { objectApiName: MOVIE_OBJECT })
    movieMetadata;

    @wire(
        getPicklistValues, 
        { recordTypeId: '012000000000000AAA', fieldApiName: CATEGORY_FIELD }
    )
    picklistValues;

    @track
    types = [];

    @track
    movie = {
        Name: '',
        Category__c: '',
        Description__c:'',
        Rating__c:0
    }

    @api
    show() {
        this.showModal = true;
    }

    cancel() {
        this.showModal = false;
    }

    handleRatingChanged(event) {
        console.log("rating ->" + event.detail.rating);
        this.movie.Rating__c = event.detail.rating;
    }
}