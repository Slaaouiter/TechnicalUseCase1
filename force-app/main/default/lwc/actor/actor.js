import { api, LightningElement, track, wire } from "lwc";
import getActors from "@salesforce/apex/ActorsController.getActors";

export default class Actor extends LightningElement {
  chosenActor;

  @api
  get actorId() {
    return this.chosenActor;
  }

  set actorId(value) {
    this.chosenActor = value;
  }

  @api
  showPlus;

  @api
  chosenActors;

  @track
  availableActors = [];

  @wire(getActors)
  actors({ data }) {
    if (data) {
      this.availableActors = data.map((actor) => {
        return {
          label: actor.Name,
          value: actor.Id
        };
      });
      this.availableActors = this.availableActors.filter((actor) => {
        return (
          this.chosenActor === actor.value ||
          !this.chosenActors.includes(actor.value)
        );
      });
    }
  }

  handleActorChange(event) {
    if (this.chosenActor !== event.detail.value) {
      const actorChangeEvent = new CustomEvent("actorchange", {
        detail: {
          actorId: event.detail.value,
          oldActorId: this.chosenActor,
          action: "update"
        }
      });
      this.dispatchEvent(actorChangeEvent);
      this.chosenActor = event.detail.value;
    }
  }

  plus() {
    if (this.chosenActor !== "defaultActor") {
      const addActorEvent = new CustomEvent("actorchange", {
        detail: {
          actorId: "defaultActor",
          action: "add"
        }
      });
      this.dispatchEvent(addActorEvent);
    }
  }

  minus() {
    const removeActorEvent = new CustomEvent("actorchange", {
      detail: {
        actorId: this.chosenActor,
        action: "remove"
      }
    });
    this.dispatchEvent(removeActorEvent);
  }

  get isDisabled() {
    return this.chosenActor !== "defaultActor";
  }
}
