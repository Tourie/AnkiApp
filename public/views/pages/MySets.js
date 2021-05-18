let MySets = {
    render : async () => {
        let view = `
        <h1>My sets</h1>
        <button class="card__button card__button_big" id="newSetButton">Add new</button>
        <ul id="sets" class="cards">
        </ul>
        `
        return view
    }
    , after_render: async () => {
        let newSetButton = document.getElementById('newSetButton');

        newSetButton.addEventListener('click', ()=>{
            window.location.hash = '/new-set'
        })

        const sets = document.getElementById("sets");
        const userId = localStorage.getItem('userId');

        database.ref('users/' + userId + '/sets/').on('value', (snapshot)=>{
            for(let setId in snapshot.val()){
                const setRef = snapshot.child(setId).val();
                const setHTML = `
                <li class="card-item">
                    <h3 class="card__title">${setRef.setName}</h3>
                    <button class="card__button card__button_repeat" onclick="window.location='/#/repeat-set/${setId}'">repeat</button>
                    <button class="card__button card__button_edit" onclick="window.location='/#/my-sets/${setId}'">edit</button>
                    <button class="card__button card__button_delete" onclick="window.location='/#/delete-set/${setId}'">delete</button>
                </li>
                `
                sets.insertAdjacentHTML("afterbegin", setHTML);
            }
        });

        function getSetHtml(setid) {

        }
    }
 
 }
 
 export default MySets;