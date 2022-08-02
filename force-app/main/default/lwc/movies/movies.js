import { LightningElement } from 'lwc';

export default class Movies extends LightningElement {

    openNewMovieModal() {
        const newMovieModal = this.template.querySelector("c-new-movie-modal-lwc");
        newMovieModal.show();
    }
}