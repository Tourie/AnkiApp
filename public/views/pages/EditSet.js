import Utils from "./../../js/services/utils.js"

let EditSet = {
    render : async () => {
        let view = `<h1>Editing set</h1>
        <form class="edit-form">
            <input id="setNameInput" class="form__input" type="text" placeholder="Set name">
            <button id="saveSetBtn" class="card__button card__button_big">Save name</button>
        </form>
        <ul class="cards">
            <li class="card-item">
                <h3 class="card__title">Front name</h3>
                <h4 class="card__subtitle">Back name</h4>
                <button class="card__button card__button_edit">edit</button>
                <button class="card__button card__button_delete">delete</button>
            </li>
        </ul>
        `
        return view
    }
    , after_render: async () => {
        const setNameInput = document.getElementById('setNameInput');
        const setId = Utils.parseRequestURL().id;
        const saveSetBtn = document.getElementById('saveSetBtn');
        const userId = localStorage.getItem('userId');
        const request = Utils.parseRequestURL();

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
    }
 
 }
 
 export default EditSet;