window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  let setMovie = JSON.parse(localStorage.getItem('moviesId')) ? JSON.parse(localStorage.getItem('moviesId')) : []
  let apiCall = async () => {
    try {
      let response = await fetch('http://localhost:3031/api/movies')
      let result = await response.json()
      return result

    } catch (error) {
      console.log(error)
    }
  }

  let buscar =(items, id)=>{
    for(let item of items){
      if (item.id === id) {
        console.log('si esta')
        return true
      }
    }
    return false
  }
  let guardarDatos = async (datos) => {
    let peliculas = await apiCall()
    console.log(peliculas)
    // Codigo que debemos usar para mostrar los datos en el frontend
    let data = peliculas.data;
    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;
      let fav = `<button id="${movie.id}">agregar a favoritos</button>`
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.innerHTML += fav
    });

    let buttons = document.querySelectorAll('button')
    

    let storage = JSON.parse(localStorage.getItem('moviesId'))
    buttons.forEach((button, i) =>{
      
      button.addEventListener('click', (e)=>{
        if (storage === null) {
          setMovie.push({id : e.target.attributes.id.value})
          localStorage.setItem('moviesId', JSON.stringify(setMovie))
        } else {
          console.log(buscar(storage, e.target.attributes.id.value))
          if (!buscar(storage, e.target.attributes.id.value)) {
            console.log(setMovie)
            setMovie.push({id : e.target.attributes.id.value})
            localStorage.setItem('moviesId', JSON.stringify(setMovie))
          }
        }
      })
    })
    

  }
  guardarDatos()
  
  
};