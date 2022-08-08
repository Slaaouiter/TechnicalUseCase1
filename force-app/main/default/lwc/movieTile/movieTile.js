import { api, LightningElement } from 'lwc';

const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';

export default class MovieTile extends LightningElement {
    @api
    movie;
    @api
    selectedMovieId;
    
    get backgroundStyle() {
        return 'background-image:url('+ this.movie.Picture__c +')';
    }
    
    get tileClass() {
        if (this.movie.Id === this.selectedMovieId) {
            return TILE_WRAPPER_SELECTED_CLASS;
        }
        return TILE_WRAPPER_UNSELECTED_CLASS;
    }
    
    selectMovie() {
        this.selectedMovieId = this.movie.Id;
        const movieselect = new CustomEvent('movieselect', {
            detail: {
                movieId: this.selectedMovieId
            }
        });
        this.dispatchEvent(movieselect);
    }
}