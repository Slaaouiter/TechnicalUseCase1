import getActors from "@salesforce/apex/ActorsController.getActors";
import { api, LightningElement, track, wire } from "lwc";
export default class Actors extends LightningElement {
  @wire(getActors)
  wiredActors({ data }) {
    if (data) {
      this.allActors = data.map((actor) => {
        return {
          label: actor.Name,
          value: actor.Id
        };
      });
      this.availableActors = [...this.allActors];
    }
  }

  @track
  allActors = [];

  @track
  availableActors = [];

  @track
  listOfChosenActors = ["defaultActor"];

  @api
  get actors() {
    return this.listOfChosenActors;
  }

  set actors(values) {
    this.listOfChosenActors = [...values];
  }

  actorHandler(event) {
    if (event.detail.actorId) {
      if (event.detail.action === "add") {
        this.addActor(event.detail.actorId);
      } else if (event.detail.action === "update") {
        this.updateActor(event.detail.oldActorId, event.detail.actorId);
      } else if (event.detail.action === "remove") {
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

    this.availableActors = this.availableActors.filter(
      (availableActor) =>
        !this.listOfChosenActors.includes(availableActor.value)
    );
  }

  removeActor(actorId) {
    this.listOfChosenActors = this.listOfChosenActors.filter(
      (chosenActor) => chosenActor !== actorId
    );
    this.availableActors = [
      ...this.availableActors,
      {
        label: this.getActorName(actorId),
        value: actorId
      }
    ];
  }
  
  getActorName(actorId) {
    let result = this.allActors.find((actor) => actor.value === actorId);
    return result ? result.label : "";
  }
}
