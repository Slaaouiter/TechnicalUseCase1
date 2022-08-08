import { api, LightningElement } from "lwc";

export default class Actor extends LightningElement {
  @api
  isLast;

  @api
  availableActors;

  @api
  allActors;

  chosenActor;

  @api
  get actorId() {
    return this.chosenActor;
  }

  set actorId(value) {
    this.chosenActor = value;
  }

  get showPlus(){
    return this.isLast && this.availableActors.length > 1;
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
  get options() {
    return this.isLast ? this.availableActors : this.allActors;
  }
}
