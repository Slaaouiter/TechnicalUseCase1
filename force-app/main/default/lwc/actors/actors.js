import { api, LightningElement, track, wire } from 'lwc';
export default class Actors extends LightningElement {
    @track
    listOfChosenActors = ['defaultActor'];

    actorHandler(event) {
        if (event.detail.actorId) {
            if (event.detail.action == "add") {
                this.addActor(event.detail.actorId);
            }
            else if (event.detail.action == "update") {
                this.updateActor(event.detail.oldActorId, event.detail.actorId);
            }
            else if (event.detail.action == "remove") {
                this.removeActor(event.detail.actorId);
            }
        }
    }

    updateActor(oldActorId, newActorId) {
        let indexOfActor = this.listOfChosenActors.indexOf(oldActorId);
        if (indexOfActor > -1) {
            this.listOfChosenActors[indexOfActor] = newActorId;

        }
    }
    addActor(actorId) {
        if (!this.listOfChosenActors.includes(actorId)) {
            this.listOfChosenActors.push(actorId);
        }
    }

    removeActor(actorId) {
        let indexOfActor = this.listOfChosenActors.indexOf(actorId);
        if (indexOfActor > -1) {
            this.listOfChosenActors.splice(indexOfActor, 1);
        }
    }
    
}