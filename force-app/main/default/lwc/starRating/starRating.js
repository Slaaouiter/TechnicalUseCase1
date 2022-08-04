import fivestar from '@salesforce/resourceUrl/fivestar';
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// add constants here
const ERROR_TITLE = 'Error loading five-star';
const ERROR_VARIANT = 'error';
const EDITABLE_CLASS = 'c-rating';
const READ_ONLY_CLASS = 'readonly c-rating';

export default class StarRating extends LightningElement {
    @api
    readOnly;
    @api
    value;

    editedValue;
    isRendered;

    get starClass() {
        return this.readOnly ? READ_ONLY_CLASS : EDITABLE_CLASS;
    }

    renderedCallback() {
        if (this.isRendered) {
            return;
        }
        this.loadScript();
        this.isRendered = true;
    }

    //Method to load the 3rd party script and initialize the rating.
    loadScript() {
        Promise.all([
            loadScript(this, fivestar + '/rating.js'),
            loadStyle(this, fivestar + '/rating.css')
        ]).then(() => {
            this.initializeRating();
        })
            .catch(error => {
                const toast = new ShowToastEvent({
                    title: ERROR_TITLE,
                    message: error.message,
                    variant: ERROR_VARIANT,
                });
                this.dispatchEvent(toast);
            });
    }

    initializeRating() {
        let domEl = this.template.querySelector('ul');
        let maxRating = 5;
        let self = this;
        let callback = function (rating) {
            self.editedValue = rating;
            self.ratingChanged(rating);
        };
        this.ratingObj = window.rating(
            domEl,
            this.value,
            maxRating,
            callback,
            this.readOnly
        );
    }

    // Method to fire event called ratingchange with the following parameter:
    // {detail: { rating: CURRENT_RATING }}); when the user selects a rating
    ratingChanged(rating) {
        const ratingchangeEvent = new CustomEvent('ratingchange', {
            detail: {
                rating: rating
            }
        });
        this.dispatchEvent(ratingchangeEvent);
    }
}