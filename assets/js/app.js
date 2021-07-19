const form = $("#form");
const inputElement = $("#inputHeroes");

form.submit(function(event) {
  event.preventDefault();

  const idSuperHeroe = inputElement.val();

  $.ajax({
    type: "GET",
    url: `https://superheroapi.com/api.php/10226070021914379/${idSuperHeroe}`,
    dataType: "json"
  }).done(function(data) {

    if (idSuperHeroe > 731) {
      $("#error").append(`Debes ingresar un número desde el 1 al 731`);
    } else if (idSuperHeroe == ""){
      $("#error").append(`Debes ingresar un número`);
    } else {
      $("#title").append(`Personaje encontrado`)
      $("#heroContent").append(`
      <p>Conexiones: ${data.connections["group-affiliation"]}</p>
      <p>Publicado por: ${data.biography.publisher}</p>
      <p>Ocupación: ${data.work.occupation}</p>
      <p>Primera aparición: ${data.biography["first-appearance"]}</p>
      <p>Altura: ${data.appearance.height[0]} - ${data.appearance.height[1]}</p>
      <p>Peso: ${data.appearance.weight[0]} - ${data.appearance.weight[1]}</p>
      <p>Alianzas: ${data.biography.aliases.join(" - ")}</p>
      
      `);
      $("#characterName").append(`<p>${data.name}</p>`);
      $("#heroImg").attr("src", `${data.image.url}`);

      const statsHeroe = {
        title: {
          text: `Estadisticas de poder de ${data.name}`
        },
        data: [{
            type: "pie",
            startAngle: 45,
            showInLegend: "true",
            legendText: "{label}",
            indexLabel: "{label} ({y})",
            yValueFormatString:"#,##0.#"%"",
            dataPoints: [
              { label: "Inteligencia", y: Number.parseInt(data.powerstats.intelligence) },
              { label: "Fuerza", y: Number.parseInt(data.powerstats.strength) },
              { label: "Velocidad", y: Number.parseInt(data.powerstats.speed) },
              { label: "Durabilidad", y: Number.parseInt(data.powerstats.durability) },
              { label: "Poder", y: Number.parseInt(data.powerstats.power) },
              { label: "Combate", y: Number.parseInt(data.powerstats.combat) },
            ]
        }]
      };
  
      $("#statsHeroe").CanvasJSChart(statsHeroe);
    }


  });
});
