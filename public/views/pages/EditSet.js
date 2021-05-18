import Utils from "./../../js/services/utils.js"

let EditSet = {
    render : async () => {
        let view = `<h1>Editing set</h1>
        <form class="edit-form" action="javascript:void(0);">
            <input id="setNameInput" class="form__input" type="text" placeholder="Set name">
            <button id="saveSetBtn" class="card__button card__button_big">Save name</button>
        </form>
        <ul id="sets" class="cards">
        </ul>
        `
        return view
    }
    , after_render: async () => {
        document.title = 'Edit set';
        const setNameInput = document.getElementById('setNameInput');
        const setId = Utils.parseRequestURL().id;
        const saveSetBtn = document.getElementById('saveSetBtn');
        const userId = localStorage.getItem('userId');

        if(userId != null && setId != null) {
            database.ref(`users/${userId}/sets/${setId}`).on('value', (snapshot)=>{
                setNameInput.value = snapshot.val().setName;
            });
        }

        saveSetBtn.addEventListener('click', () => {
            database.ref(`users/${userId}/sets/${setId}`).update({
                setName: setNameInput.value,
                creator: userId,
                createdAt: Date.now()
            });
        })

        let sets = document.getElementById('sets');
        database.ref('users/' + userId + '/cards/').on('value', (snapshot)=>{
            for(let cardId in snapshot.val()){
                const card = snapshot.child(cardId).val();
                if (card.setId === setId){
                    const setHTML = `
                    <li class="card-item">
                        <h3 class="card__title">${card.frontValue}</h3>
                        <h4 class="card__subtitle">${card.backValue}</h4>
                        <button class="card__button card__button_edit" onclick="window.location='/#/my-cards/${cardId}'">edit</button>
                        <button class="card__button card__button_delete" onclick="window.location='/#/delete-card/${cardId}'">delete</button>
                    </li>
                    `
                    sets.insertAdjacentHTML("afterbegin", setHTML);
                }
            }
        });
    }
 
 }
 
 export default EditSet;