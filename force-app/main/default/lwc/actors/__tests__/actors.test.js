import { createElement } from "lwc";
import Actors from "c/actors";
const mockGetActorList = require("./data/getActorList.json");
import getActors from "@salesforce/apex/ActorsController.getActors";
jest.mock(
  "@salesforce/apex/ActorsController.getActors",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);
describe("c-actors", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();

  });

  it("actorHandler -> addActor :  need to add the actorId as chosen when the event action is 'add'", () => {
    //Given
    const actorsComponent = createElement("c-actors", {
      is: Actors
    });
    actorsComponent.actors = ["A000ldsdo340"];
    //When
    document.body.appendChild(actorsComponent);
    getActors.emit(mockGetActorList);

    const actorList = actorsComponent.shadowRoot.querySelectorAll("c-actor");
    expect(actorList.length).toEqual(1);
    const actor = actorList[0];
    actor.dispatchEvent(
      new CustomEvent("actorchange", {
        detail: {
          action: "add",
          actorId: "A000ldsd999"
        }
      })
    );
    //Then
    expect(actorsComponent.actors).toEqual(["A000ldsdo340", "A000ldsd999"]);
  });

  it("actorHandler --> addActor : shouldn't  add the actorId as chosen if it already exists in the list", () => {
    //Given
    const actorsComponent = createElement("c-actors", {
      is: Actors
    });
    actorsComponent.actors = ["A000ldsdo340"];
    //When
    document.body.appendChild(actorsComponent);
    getActors.emit(mockGetActorList);

    const actorList = actorsComponent.shadowRoot.querySelectorAll("c-actor");
    expect(actorList.length).toEqual(1);
    const actor = actorList[0];
    actor.dispatchEvent(
      new CustomEvent("actorchange", {
        detail: {
          action: "add",
          actorId: actor.actorId
        }
      })
    );
    //Then
    expect(actorsComponent.actors).toEqual(["A000ldsdo340"]);
  });
  it("actorHandler --> removeActor : remove the actorId if exists in list of chosen actors", () => {
    //Given
    const actorsComponent = createElement("c-actors", {
      is: Actors
    });
    actorsComponent.actors = ["A000ldsdo340", "A000ldsd999", "defaultActor"];
    //When
    document.body.appendChild(actorsComponent);
    getActors.emit(mockGetActorList);

    const actorList = actorsComponent.shadowRoot.querySelectorAll("c-actor");
    expect(actorList.length).toEqual(3);
    const actor = actorList[1];
    actor.dispatchEvent(
      new CustomEvent("actorchange", {
        detail: {
          action: "remove",
          actorId: actor.actorId
        }
      })
    );
    //Then
    expect(actorsComponent.actors).toEqual(["A000ldsdo340", "defaultActor"]);
  });
  it("actorHandler --> updateActor : changes old actorId with new actorId", () => {
    //Given
    const actorsComponent = createElement("c-actors", {
      is: Actors
    });
    actorsComponent.actors = ["defaultActor"];
    //When
    document.body.appendChild(actorsComponent);
    getActors.emit(mockGetActorList);

    const actorList = actorsComponent.shadowRoot.querySelectorAll("c-actor");
    expect(actorList.length).toEqual(1);
    const actor = actorList[0];
    actor.dispatchEvent(
      new CustomEvent("actorchange", {
        detail: {
          action: "update",
          oldActorId : 'defaultActor',
          actorId: 'A000ldsdo340'
        }
      })
    );
    //Then
    expect(actorsComponent.actors).toEqual(["A000ldsdo340"]);
  });
});
