window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  let noList = document.querySelector('#notList')
  // Aqui debemos agregar nuestro fetch

  let apiCall = async (idMovie) => {
    try {
      let response = await fetch(`http://localhost:3031/api/movies/${idMovie}`)
      let result = await response.json()
      return result

    } catch (error) {
      console.log(error)
    }
  }
 //  Codigo que debemos usar para mostrar los datos en el frontend

  let imprimir = async (datos) => {
    let storage = JSON.parse(localStorage.getItem('moviesId'))
    await storage.forEach(async item => {
      let result = await apiCall(item.id)
      let movie = result.data
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;
      
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

    })
  }
  console.log(localStorage.getItem('moviesId'))
  if (localStorage.getItem('moviesId') === null) {
    noList.innerHTML += '<h2>No hay peliculas favoritas agregadas</h2>'
  } else{
    imprimir()
  }
  
};
