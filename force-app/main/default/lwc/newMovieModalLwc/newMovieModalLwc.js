import { api, LightningElement, track } from 'lwc';
export default class NewMovieModalLWC extends LightningElement {
    showModal=false;

    @track
    movie = {}

    @api
    show(){
        this.showModal = true;
    }

    cancel(){
        this.showModal = false;
    }
}