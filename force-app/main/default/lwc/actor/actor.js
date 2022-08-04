import { api, LightningElement, track, wire } from 'lwc';
import getActors from '@salesforce/apex/ActorsService.getActors';

export default class Actor extends LightningElement {
    
    @api
    actorId;

    @api
    showPlus;

    @api
    chosenActors;

    @track
    availableActors = [];

    @wire(getActors)
    actors({ data, error }) {
        if (data) {
            this.availableActors = data.map(actor => {
                return {
                    label: actor.Name,
                    value: actor.Id
                }
            });
            this.availableActors = this.availableActors.filter(actor => {
                return (this.actorId == actor.value) || 
                !this.chosenActors.includes(actor.value)
            });
        }
        else {
            console.log("eyoooo" + error);
        }
    }

    handleActorChange(event){
        if(this.actorId != event.detail.value){
            const actorChangeEvent = new CustomEvent(
                'actorchange',
                {
                    detail : {
                        actorId : event.detail.value,
                        oldActorId:this.actorId,
                        action : 'update'
                    }
                }
            );
            this.dispatchEvent(actorChangeEvent);
            this.actorId = event.detail.value;
            
        }
    }

    plus(){
        if(this.actorId != "defaultActor"){
            const addActorEvent = new CustomEvent(
                'actorchange',
                {
                    detail : {
                        actorId : 'defaultActor',
                        action : 'add'
                    }
                }
            );
            this.dispatchEvent(addActorEvent);
        }
    }

    minus(){
        const removeActorEvent = new CustomEvent(
            'actorchange',
            {
                detail : {
                    actorId : this.actorId,
                    action : 'remove'
                }
            }
        )
        this.dispatchEvent(removeActorEvent);
    }
    
}