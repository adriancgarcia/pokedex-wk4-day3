// console.log("Pokedex");


// const pokes = 
// [
//     { slot: 1,  type: {name:  "grass", url: "https://pokeapi.co/api/v2/type/12/"}},
//     { slot: 2,  type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}},
//  ];

//  const newPokes = pokes.map(item => item.type.name);

//  console.log(newPokes)

 

//  let x = [
//     { slot: 1, type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" } },
//     { slot: 2, type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" } },
// ];

// let y = x.map(v => v.type.name)
// console.log(y);

//  ["grass", "poison"];

const $searchForm = $("form");




$searchForm.on("submit", event => {
    event.preventDefault();
    // console.log(event.target)

    // generate data from the target object
    const formData = new FormData(event.target);
    // console.log(formData)
    
    // get the value from the generated data where the name value is "pokemon"
    const pokemon = formData.get("pokemon").toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    const $screen = $(".screen")
    const $result = $(".result")

// empty out the input field
$('[name="pokemon"]')[0].value = "";

// empty out previous result and add in a loading indicator
$screen.empty();
$result.html(`<div>Loading...</div>`);

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            $screen.html(
                `<img src=${data.sprites.front_default} alt=${data.name}>`
            );
            $result.html(`
            <div>
            <b>name: </b> ${data.name}
            </div>
            
            <div>
            <b>id: </b> ${data.id}
            </div>

            <div>
            <b>weight: </b> ${data.weight}
            </div>

            <div>
            <b>type: </b> ${data.types.map(v => v.type.name)}
            </div>
            `)
        })

            .catch (() => {
                $result.html(`<div> there was an error...</div>`)
        });
    });