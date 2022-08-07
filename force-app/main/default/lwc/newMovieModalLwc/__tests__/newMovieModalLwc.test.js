import { createElement } from "lwc";
import NewMovieModalLwc from "c/newMovieModalLwc";
import { getPicklistValues, getObjectInfo } from "lightning/uiObjectInfoApi";

const mockGetPicklistValues = require("./data/getTypeList.json");
const mockGetObjectInfo = require("./data/getObjectInfo.json");
describe("c-new-movie-modal-lwc", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("handleNameChange --> stores Name input change in movieCreated.Name", async () => {
    //Given
    const modalComponent = createElement("c-new-movie-modal-lwc", {
      is: NewMovieModalLwc
    });

    //When
    document.body.appendChild(modalComponent);
    modalComponent.show();

    getPicklistValues.emit(mockGetPicklistValues);
    getObjectInfo.emit(mockGetObjectInfo);
    await flushPromises();
    //Then
    const lightningInput =
      modalComponent.shadowRoot.querySelector("lightning-input");
    lightningInput.value = "The Hunter";
    lightningInput.dispatchEvent(new CustomEvent("change"));
    expect(modalComponent.movieCreated.Name).toEqual("The Hunter");
  });
  it("Types combobox populated with the correct data", async () => {
    //Given
    const modalComponent = createElement("c-new-movie-modal-lwc", {
      is: NewMovieModalLwc
    });

    //When
    document.body.appendChild(modalComponent);
    modalComponent.show();

    getPicklistValues.emit(mockGetPicklistValues);
    getObjectInfo.emit(mockGetObjectInfo);
    await flushPromises();
    //Then
    const combobox =
      modalComponent.shadowRoot.querySelector("lightning-combobox");
    const options = combobox.options.map((option) => {
      return {
        label: option.label,
        value: option.value
      };
    });
    expect(options).toEqual([
      {
        label: "Horror",
        value: "Horror"
      },
      {
        label: "Adventure",
        value: "Adventure"
      },
      {
        label: "Action",
        value: "Action"
      },
      {
        label: "Drama",
        value: "Drama"
      },
      {
        label: "Comedy",
        value: "Comedy"
      }
    ]);
  });

  it("handleTypeChange --> stores Type choice change in movieCreated.Type__c", async () => {
    //Given
    const modalComponent = createElement("c-new-movie-modal-lwc", {
      is: NewMovieModalLwc
    });

    //When
    document.body.appendChild(modalComponent);
    modalComponent.show();

    getPicklistValues.emit(mockGetPicklistValues);
    getObjectInfo.emit(mockGetObjectInfo);
    await flushPromises();
    //Then
    const combobox =
      modalComponent.shadowRoot.querySelector("lightning-combobox");
    combobox.value = "Horror";
    combobox.dispatchEvent(new CustomEvent("change"));
    expect(modalComponent.movieCreated.Type__c).toEqual("Horror");
  });
  it("handleRatingChanged --> stores rating  change in movieCreated.Rating__c", async () => {
    //Given
    const modalComponent = createElement("c-new-movie-modal-lwc", {
      is: NewMovieModalLwc
    });

    //When
    document.body.appendChild(modalComponent);
    modalComponent.show();

    getPicklistValues.emit(mockGetPicklistValues);
    getObjectInfo.emit(mockGetObjectInfo);
    await flushPromises();
    //Then
    const ratingComponent =
      modalComponent.shadowRoot.querySelector("c-star-rating");
    ratingComponent.dispatchEvent(
      new CustomEvent("ratingchange", {
        detail: {
          rating: 4
        }
      })
    );
    expect(modalComponent.movieCreated.Rating__c).toEqual(4);
  });
  it("handleDescriptionChange --> stores description  change in movieCreated.Description__c", async () => {
    //Given
    const modalComponent = createElement("c-new-movie-modal-lwc", {
      is: NewMovieModalLwc
    });

    //When
    document.body.appendChild(modalComponent);
    modalComponent.show();

    getPicklistValues.emit(mockGetPicklistValues);
    getObjectInfo.emit(mockGetObjectInfo);
    await flushPromises();
    //Then
    const textArea = modalComponent.shadowRoot.querySelector("lightning-textarea");
    textArea.value = "Best movie to watch in family";
    textArea.dispatchEvent(new CustomEvent("change"));
    expect(modalComponent.movieCreated.Description__c).toEqual("Best movie to watch in family");
  });
  async function flushPromises() {
    return Promise.resolve();
  }
});
