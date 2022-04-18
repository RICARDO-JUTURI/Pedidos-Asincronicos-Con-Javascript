window.onload = () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let idMovie = urlParams.get('id');
    let form = document.querySelector('form')
    
    let id = document.querySelector('#id')
    let title = document.querySelector('#title')
    let rating = document.querySelector('#rating')
    let awards = document.querySelector('#awards')
    let date = document.querySelector('#release_date')
    let length = document.querySelector('#length')

    let buttonUpdate = document.querySelector('.editar')
    let buttonAdd = document.querySelector('.agregar')
    let buttonDelete = document.querySelector('.botonBorrar')
    

    

    let apiGet = async (idMovie) =>{
        try {

            let response = await fetch(`http://localhost:3031/api/movies/${idMovie}`)
            let result = await response.json();
            return result
            
          } catch (error) {
          
          }
    }

    let apiCall = async(idMovie, title,rating,awards,release_date,length, url, method) =>{
        try {
            let response = await fetch(url,{
                headers : {
                    'content-type' : 'application/json'
                },
                method : method,
                body : JSON.stringify({
                    id : idMovie,
                    title,
                    rating,
                    awards,
                    release_date,
                    length
                }),
            });
            let result = await response.json();
            console.log(result)
          } catch (error) {
            console.log(error)
          }
    }
    
    async function imprimirResultados(idMovie) {
        let movie = await apiGet(idMovie)

        id.value = movie.data.id
        title.value = movie.data.title
        rating.value = movie.data.rating
        awards.value = movie.data.awards
        date.value = moment(movie.data.release_date).format('YYYY-MM-DD') 
        length.value = movie.data.length
    }
    
    
    if (idMovie !== null) {
        imprimirResultados(idMovie)
    }
    
    
    buttonUpdate.addEventListener('click', ()=>{
        let award = form.elements.awards.value
        let id = form.elements.id.value
        let title = form.elements.title.value
        let rating = form.elements.rating.value
        let release_date = form.elements.release_date.value
        let length = form.elements[5].value
        let url = `http://localhost:3031/api/movies/update/${idMovie}`
        apiCall(id,title,rating,award,release_date,length, url, 'PUT')

    })

    buttonDelete.addEventListener('click', ()=>{
        let award = form.elements.awards.value
        let id = form.elements.id.value
        let title = form.elements.title.value
        let rating = form.elements.rating.value
        let release_date = form.elements.release_date.value
        let length = form.elements[5].value
        let url = `http://localhost:3031/api/movies/delete/${idMovie}`
        apiCall(id,title,rating,award,release_date,length, url, 'DELETE')
    })

    buttonAdd.addEventListener('click', ()=>{
        let award = form.elements.awards.value
        let id = form.elements.id.value
        let title = form.elements.title.value
        let rating = form.elements.rating.value
        let release_date = form.elements.release_date.value
        let length = form.elements[5].value
        let url = `http://localhost:3031/api/movies/create`
        apiCall(id,title,rating,award,release_date,length, url, 'POST')
    })
    

}