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

  it("renders all actors as choices in the combobox", async () => {
    //Given
    const actorComponent = createElement("c-actor", {
      is: Actor
    });
    actorComponent.chosenActors = ["A000ldsdo340"];
    actorComponent.actorId = "A000ldsdo340";
    //When
    document.body.appendChild(actorComponent);
    await flushPromises();
    //Then
    const combobox =
      actorComponent.shadowRoot.querySelector("lightning-combobox");
    expect(combobox.options).toEqual([
      { label: "Oualid", value: "A000ldsdo340" },
      { label: "Ahmed", value: "A000ldsd999" },
      { label: "Najlae", value: "A000ldsdo9999" }
    ]);
  });

  it("removes chosen actor from combobox choices", async () => {
    // Given
    const actorComponent = createElement("c-actor", {
      is: Actor
    });
    actorComponent.chosenActors = ["A000ldsdo340", "A000ldsd999"];
    actorComponent.actorId = "A000ldsd999";

    //When
    document.body.appendChild(actorComponent);
    
    await flushPromises();

    //Then
    const combobox =
      actorComponent.shadowRoot.querySelector("lightning-combobox");
    expect(combobox.options).toEqual([
      { label: "Ahmed", value: "A000ldsd999" },
      { label: "Najlae", value: "A000ldsdo9999" }
    ]);
  });

  it("combobox is disabled when actorId is not 'defaultActor'", async () => {
    // Given
    const actorComponent = createElement("c-actor", {
      is: Actor
    });
    actorComponent.chosenActors = ["A000ldsdo340", "A000ldsd999"];
    actorComponent.actorId = "A000ldsd999";

    //When
    document.body.appendChild(actorComponent);
    
    await flushPromises();

    //Then
    const combobox =
      actorComponent.shadowRoot.querySelector("lightning-combobox");
    expect(combobox.disabled).toBeTruthy();
  });

  it("combobox is enabled when actorId is 'defaultActor'", async () => {
    // Given
    const actorComponent = createElement("c-actor", {
      is: Actor
    });
    actorComponent.chosenActors = [];
    actorComponent.actorId = "defaultActor";

    //When
    document.body.appendChild(actorComponent);
    
    await flushPromises();

    //Then
    const combobox =
      actorComponent.shadowRoot.querySelector("lightning-combobox");
    expect(combobox.disabled).toBeFalsy();
  });

  it("handleActorChange changes the actorId", async () => {
    // Given
    const actorComponent = createElement("c-actor", {
      is: Actor
    });
    actorComponent.chosenActors = [];
    actorComponent.actorId = "defaultActor";

    //When
    document.body.appendChild(actorComponent);
    
    await flushPromises();

    //Then
    const combobox =
      actorComponent.shadowRoot.querySelector("lightning-combobox");
    combobox.dispatchEvent(
      new CustomEvent("change", { detail: { value: "A000ldsd999" } })
    );
    expect(actorComponent.actorId).toEqual("A000ldsd999");
  });

  // Helper function to wait until the microtask queue is empty.
  async function flushPromises() {
    return Promise.resolve();
  }
});
