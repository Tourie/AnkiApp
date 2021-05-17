import Utils from './../../js/services/utils.js'

let Delete = {
    render : async () => {
        let view = `
        <h2>Are you sure want to delete it?</h2>
        <button class="card__button card__button_repeat" id="deleteButton">delete</button>
        <button class="card__button card__button_edit" id="backButton">back</button>
        `
        return view
    }
    , after_render: async () => {
        const deleteBtn = document.getElementById('deleteButton');
        const backButton = document.getElementById('backButton');

        deleteBtn.addEventListener('click', () => {
            const request = Utils.parseRequestURL();
            const userId = localStorage.getItem('userId');
            if(request.resource == 'delete-set') {
                deleter('sets', request);
            }
            if(request.resource == 'delete-card') {
                deleter('cards', request);
            }
        });

        function deleter(str, request) {
            let userId = localStorage.getItem('userId');
            database.ref(`users/${userId}/${str}/${request.id}/`).remove().then(()=>{
                window.location.hash = `#/my-${str}`
            }).catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
        }

        backButton.addEventListener('click', () => {
            history.back();
        })
    }
 
 }
 
 export default Delete;