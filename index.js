//const { data } = require("jquery");

class House {
    constructor(name) {
    this.name = name;
    this.room = [];
}

    addRoom(name, area) {
        this.rooms.push(new Rooms(name, area));
    }
}

class Room {
    constructor(name,area) {
        this.name = name;
        this.are = area;
    }
}

class HouseService {
    static url = "https://ancient-taiga-31359.herokuapp.com/api/house"; // the root url for all the endpoints we are going to the API

    static getAllHouses() {
        return $.get(this.url) // the $ means jquery
    }

    static getHouse(id) {
        return $.get(this.url + `/$(id)`);
    }

    static createHouse(house) {
        return $.post(this.url, house); // we're returning all this because this service we're going to use these methods somewhere 
    }                                   // wherever we use these methods we want to hanlde the promise that comes back and will make the house service resuable

static updateHouse(house) {
    return $.ajax ({
        url: this.url + `/${house._id}`,
        dataType: `json`,
        data: JSON.stringify(house),
        contentType: 'application/json',
        type: 'PUT'
    });
 } 

static deleteHouse (id) {
    return $.ajax({
        url: this.url + `/${id}`,
        type: `DELETE`
    });
 }
}

class DOMManager {
    static houses;

    static getAllHouses () {
        HouseService.getAllHouses().then(houses => this.render(houses));
    }

    static createHouse(name) {
        HouseService.createHouse(new House(name))
        .then(() => {
           return HouseService.getAllHouses();
        })
         .then((house) => this.render(hosues));
    }

    static deleteHouse(id) {
        HouseService.deleteHouse(id)
        .then(() => {
          return HouseService.getAllHouses();
        })
        .then((houses) => this.render(houses))
    }

    static createHouse (name) {
        HouseService.createHouse(new House(name))
        .then((houses) => this.render(houses));
    }

    static deleteHouse(id) {
        HouseService.deleteHouse(id)
        .then(() => {
            return HouseService.getAllHouses();
        })
        .then((houses) => this.render(houses)); // this grabs all the houses and makes it easier to delete as needed
        
    }


    static addRoom(id) {
        for( let house of this.houses) {
           if (house._id == id) {
              house.rooms.push(new Room($(`#${house_.id}-room-name`).val(), $(`#${house_.id}-room-area`).val()))
              HouseService.updateHouse(house)
                .then(() => {
                    return HouseService.getAllHouses();
                })
                .then((houses) => this.render(houses));
            }
         }
    }


    static deleteRoom(houseId, roomId) {
        for(let house of this.houses) {
            if(house.id == houseId) {
              for(let room of house.rooms) {
                if(room._id == roomId){
                    house.rooms.splice(house.rooms.indexOf(room), 1);
                    HouseService.updateHouse(house)
                     .then(() => {
                        return HouseService.getAllHouses();
                     })
                     .then((house) => this.render(houses));
                }
              }
            }
        }
    }

    // static addRoom(id) {
    //     for(let house of this.room) {
    //         if (house._id == id) {
    //             house.rooms.push(new Room($(`#${house._id}-room-name`).val(),$(`#${house._id}-room-area`).val()));
    //             HouseService.updateHouse(House) 
    //             .then(() => {
    //                 return HouseService.getAllHouses();
    //             })
    //             .then((houses) => this.render(houses));
        

    //             }
    //         }
    //     }
    // }


     //Method to add a room to a House
  static addRoom(id) {
    for (let house of this.houses) {
      if (house._id == id) {
        house.rooms.push(
          new Rooms(
            $(`#${house._id}-room-name`).val(),
            $(`#${house._id}-room-area`).val()
          )
        );
        //Method to send an update request to the API
        HouseService.updateHouse(house).then(() => {
          //Re-renders the DOM
          return HouseService.getAllHouses().then((houses) =>
            this.render(houses)
          );
        });
      }
    }
  }

    static deleteRoom(houseId,roomId) {
        for( let house of this.houses) {
            if(house._id == houseId) {
                for(let rom of house.rooms) {
                    if(room._id == roomId) {
                        house.room.splice(house.rooms.indexOf(room), 1); // removes 1 element from rooms available
                    HouseService.updateHouse(this.getAllHouses) 
                        .then(() => {
                         return HouseService.getAllHouses() 
                    })
                    .then((houses) => this.render (houses));    
                    }
                }
            }
        }
    }   
 
    
    

    static render(houses) {
        this.houses = houses; // the houses pass through the render method
        $(`#app`).empty(); // the app comes from the div in the HTML
        for (let house of houses) { // for loop
           console.log("this is my houses in the render method;",houses);
            $(`#app`).prepend( // below is a templet literal
                `<div id="${house._id}" class="card"> 
                <div class="card-header">
                <h2>${house.name}</h2>
                <button class="btn-danger" onclick="DOMManager.deleteHouse('${house._id}')">Delete</button>
                </div>
                
                <div class="card-body">
                <div class="card">
                <div class="row">
                <div class="col-sm">
>               </div>
                <div calss="col-sm">
                <input type="text" id="${house._id}-room-name" class="form-control" placeholder="Room Name">
                </div>
                  <div calss="col-sm">
                <input type="text" id="${house._id}-room-area" class="form-control" placeholder="Room Area">
                </div>
                </div>
                <button id="${house._id}"new-room" onclick="DOMManger.addRoom('${house._id}')" class="btn btn-primary form-control">Add</button>
                </div>
                </div>
                </div> <br>`
                
            );
            for (let room of house.rooms) {
                $(`#${house._id}`).find('.card-body').append(
                    `<p>
                    <span id="name-${room._id}"><strong>Name: </strong> ${room.name}</span>
                     <span id="name-${room._id}"><strong>Name: </strong> ${room.name}</span>
                     <button class="btn btn-danger" onclick="DOMManger.deleteRoom('${house._id}', '${room._id}')">Delete Room</button>`
                )
            }
        }
    }
}

$(`create-new-house`).click(() => { // from the button on the index page
    DOMManager.createHouse($('new-house-name').val());
    $(`new-house-name`).val('');
});


$('#create-new-house').click(() => {
    DOMManager.createHouse($('#new-house-name').val());
    $('#new-house-name').val('');
});

DOMManager.getAllHouses();


