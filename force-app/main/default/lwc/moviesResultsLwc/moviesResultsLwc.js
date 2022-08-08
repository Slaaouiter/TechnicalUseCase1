import { LightningElement, api, track, wire } from "lwc";
import getMovies from "@salesforce/apex/MovieController.getMovies";
import { refreshApex } from "@salesforce/apex";

export default class MoviesResultsLwc extends LightningElement {
  isLoading = false;
  movieSearchName='';
  @api
  selectedMovieId;

  @track
  movies;

  @wire(getMovies, { movieSearchName: "$movieSearchName" })
  wiredMovies({ data, error }) {
    if (data) {
      this.movies = data;
    } else if (error) {
      console.log("data.error");
      console.log(error);
    }
  }

  @api
  searchMovies(movieName) {
    this.isLoading = true;
    this.notifyLoading(this.isLoading);
    this.movieSearchName = movieName;
  }
  //this public function must refresh the movies asynchronously
  //uses notifyLoading
  @api
  async refresh() {
    this.isLoading = true;
    this.notifyLoading(this.isLoading);
    await refreshApex(this.movies);
    this.isLoading = false;
    this.notifyLoading(this.isLoading);
  }

  updateSelectedTile(event) {
    this.selectedMovieId = event.detail.movieId;
  }

  //Check the current value of isLoading before dispatching the doneloading or loading custom event
  notifyLoading(isLoading) {
    if (isLoading) {
      this.dispatchEvent(new CustomEvent("loading"));
    } else {
      this.dispatchEvent(CustomEvent("doneloading"));
    }
  }
}
