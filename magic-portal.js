var portalUrl = 'https://comp246harrypotter.herokuapp.com';

function getSpells() {
    $.ajax({
        url: portalUrl + "/get-spells",
        type: "get",
        success: function(response) {
            data = JSON.parse(response);
            showTable(data.spells); // Pass spells array to showTable
            console.log(data.msg)
        },
        error: function(response) {
            data = JSON.parse(response);
            console.error(data.msg);
         }
    });
}

//populate table
function showTable(spellsTable) {
    var htmlString = ""; //empty string

    spellsTable.forEach(spell =>  {
        htmlString += "<tr>";
            htmlString += "<td>" + spell.name + "</td>";
            htmlString += "<td>" + spell.type + "</td>";
            htmlString += "<td>" + spell.effect + "</td>";
            htmlString += "<td>" + (spell["counter-spell"] || " ") + "</td>";
            htmlString += "<td><button>Delete</button> <button>Edit</button></td>"; //place holder buttons. not functiong at this time
        htmlString += "</tr>";
    });

    $("#spellsTable").html(htmlString); //add rows to table
}

getSpells();   //populate table on load

//additional unimplemented function templates
/*add new spells to library
  send JSON object spell in form {
    name: "spell name", type: "spell type", 
    effect: "spell effect", counter: "counter spell"}*/
function addSpell(spell) {
    $.ajax({
        url: portalUrl + "/add-spells",
        type: "post",
        data: JSON.stringify({
            name: spell.name, 
            type: spell.type, 
            effect: spell.effect, 
            counter: spell.counter
        }),
        success: function(response) {
            data = JSON.parse(response);
            console.log(data.msg);
        },
        error: function(response) {
            data = JSON.parse(response);
            console.error(response.msg);
         }
    });
}

/*show table with only desired spell type
  send type in a JSON object in the form {type: "type"}*/
function getSpellsByType(type) {
    $.ajax({
        url: portalUrl + "/get-spellsByType",
        type: "get",
        data: {type},
        success: function(response) {
            data = JSON.parse(response);
            console.log(data.msg)            
        },
        error: function(response) {
            data = JSON.parse(response);
            console.error(data.msg);
         }
    });
}

/*remove spell from library
  send data in a JSON object in the form {type: "type"}
  link to delete button for spell row*/
function deleteSpell(type) {
    $.ajax({
        url: portalUrl + "/delete-spell",
        type: "delete",
        data: type,
        success: function(response) {
            data = JSON.parse(response);
            console.log(data.msg);
        },
        error: function(response) {
            data = JSON.parse(response);
            console.error(data.msg);
         }
    });
}

/*update existing spell
send data in a JSON object in the form:{
ID: "spell Mongo Id", name: "spell name", 
type: "spell type", effect: "spell effect", 
counter: "counter spell"}
link to edit button for spell row*/
function updateSpell() {
    $.ajax({
        url: portalUrl + "/update-spells" + spell.id,
        type: "put",
        data: JSON.stringify({
            id: spell.id,
            name: spell.name, 
            type: spell.type, 
            effect: spell.effect, 
            counter: spell.counter
        }),
        success: function(response) {
            data = JSON.parse(response);
            console.log(data.msg)
        },
        error: function(response) {
            data = JSON.parse(response);
            console.error(data.msg);
         }
    });
}

/*get the magical spell for the day
Returns a JSON string in the form - {msg: "SUCCESS", spell: "the spell string"}*/
function spellOfTheDay() {
    $.ajax({
        url: portalUrl + "/spelloftheday",
        type: "get",
        success: function(response) {
            data = JSON.parse(response);
            stringOfDay = data.spell
            console.log(data.msg)
        },
        error: function(response) {
            data = JSON.parse(response);
            console.error(data.msg);
         }
    });
}