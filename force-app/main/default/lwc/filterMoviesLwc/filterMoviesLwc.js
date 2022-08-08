import { LightningElement } from "lwc";

export default class FilterMoviesLwc extends LightningElement {
  searchCriteria;

  handleSearchCriteriaChange(event) {
    this.searchCriteria = event.target.value;
    const searchMoviesEvent = new CustomEvent("searchmovies", {
      detail: {
        movieName: this.searchCriteria
      }
    });
    this.dispatchEvent(searchMoviesEvent);
  }
}
