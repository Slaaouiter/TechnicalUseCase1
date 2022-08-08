import { LightningElement } from 'lwc';

export default class FilterMoviesLwc extends LightningElement {
    searchCriteria;

    handleSearchCriteriaChange(event){
        if(event.target.value && event.target.value.length >2){
            this.searchCriteria = event.target.value;
            const searchMoviesEvent = new CustomEvent("searchmovies", {
                detail: {
                    movieName: this.searchCriteria
                }
              });
              this.dispatchEvent(searchMoviesEvent);
        }
    }
}