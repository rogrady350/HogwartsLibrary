var portalUrl = 'https://comp246harrypotter.herokuapp.com';

function getSpells() {
    $.ajax({
        url: portalUrl + "/get-spells",
        type: "get",
        success: function(response) {
            response = JSON.parse(response);
            showTable(response.spells); // Pass spells array to showTable
            
        },
        error: function(response) {
            response = JSON.parse(response);
            console.error(response.msg);
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
            htmlString += "<td>" + (spell["counter-spell"] || "N/A") + "</td>";
            htmlString += "<td><button>Delete</button> <button>Edit</button></td>"; //place holder buttons. not functiong at this time
        htmlString += "</tr>";
    });

    $("#spellsTable").html(htmlString); //add rows to table
}

getSpells();   //populate table on load