//need update
import { createElement } from "lwc";
import Actor from "c/actor";



describe("c-actor", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("renders combobox with the right options if it's the last actor", async () => {
    //Given
    const actorComponent = createElement("c-actor", {
      is: Actor
    });
    actorComponent.isLast = true;
    actorComponent.availableActors = [
      { label: "Najlae", value: "A000ldsdo9999" }
    ];
    actorComponent.allActors = [
      { label: "Oualid", value: "A000ldsdo340" },
      { label: "Ahmed", value: "A000ldsd999" },
      { label: "Najlae", value: "A000ldsdo9999" }
    ];
    actorComponent.actorId = "defaultActor";

    //When
    document.body.appendChild(actorComponent);
    //Then
    const combobox =
      actorComponent.shadowRoot.querySelector("lightning-combobox");
    expect(combobox.options).toEqual([
      { label: "Najlae", value: "A000ldsdo9999" }
    ]);
    expect(combobox.disabled).toBeFalsy();
  });
  it("renders combobox with all options and disabled if it is not the last actor", async () => {
    //Given
    const actorComponent = createElement("c-actor", {
      is: Actor
    });
    actorComponent.showPlus = false;
    actorComponent.availableActors = [
      { label: "Najlae", value: "A000ldsdo9999" }
    ];
    actorComponent.allActors = [
      { label: "Oualid", value: "A000ldsdo340" },
      { label: "Ahmed", value: "A000ldsd999" },
      { label: "Najlae", value: "A000ldsdo9999" }
    ];
    actorComponent.actorId = "A000ldsdo340";

    //When
    document.body.appendChild(actorComponent);
    //Then
    const combobox =
      actorComponent.shadowRoot.querySelector("lightning-combobox");
    expect(combobox.options).toEqual( [
      { label: "Oualid", value: "A000ldsdo340" },
      { label: "Ahmed", value: "A000ldsd999" },
      { label: "Najlae", value: "A000ldsdo9999" }
    ]);
    expect(combobox.disabled).toBeTruthy();
  });
});
