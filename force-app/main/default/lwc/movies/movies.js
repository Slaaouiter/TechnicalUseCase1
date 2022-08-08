import { LightningElement } from 'lwc';

export default class Movies extends LightningElement {
    isLoading = false;

    handleLoading() {
        this.isLoading = true;
    }
    
    handleDoneLoading() {
        this.isLoading = false;
    }

    searchMovies(event){
        let movieName = event.detail.movieName;
        this.template.querySelector('c-movies-results-lwc ').searchMovies(movieName);
        this.handleDoneLoading();
    }
    openNewMovieModal() {
        const newMovieModal = this.template.querySelector("c-new-movie-modal-lwc");
        newMovieModal.show();
    }
}