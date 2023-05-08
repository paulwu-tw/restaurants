const panel = document.querySelector('#panel')

panel.addEventListener('click', (e) => {
    const target = e.target
    const id = target.dataset.id
    // console.log('ID: ', id)
    if(target.matches('.delete-restaurant')) {
        if(window.confirm('Do you want to DELETE Restaurant?')) {
            fetch(`/restaurants/${id}?_method=DELETE`, { method: 'POST'})
            .then(()=>window.location.reload())
            .catch(err => console.log(err))
        }
    }
})