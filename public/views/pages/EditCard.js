import Utils from "../../js/services/utils.js";

let EditCard = {
    render : async () => {
        let view = `
        <h1>Editing card</h1>
        <form class="card-creator" action="javascript:void(0);">
            <section class="card-creator__cards">
                <div class="card-creator__front">
                    <h2 class="card-creator__title">Front name</h2>
                    <input id="frontValueInput" class="form__input input_blue" type="text" placeholder="Value" required>
                </div>
                <div class="card-creator__back">
                    <h2 class="card-creator__title">Back name</h2>
                    <input id="backValueInput" class="form__input input_yellow" type="text" placeholder="Value" required>
                </div>
            </section>
            <section class="card-creator__collections">
                <label>Select set:</label>
                <select class="collections__choice" id="setsChoice">
                    <option id="no set" value="no set">No set</option>
                </select>
            </section>
            <button class="form__submit" type="submit" id="saveButton">Save</button>
        </form>
        `
        return view
    }
    , after_render: async () => {
        const userId = localStorage.getItem('userId');
        let setsChoice = document.getElementById('setsChoice');
        database.ref(`users/${userId}/sets/`).on('value', (snapshot) => {
            for(let setId in snapshot.val()) {
                const set = snapshot.child(setId).val();
                let opt = document.createElement('option');
                opt.value = setId;
                opt.innerHTML = set.setName;
                opt.id = setId;
                setsChoice.appendChild(opt);
            }
        });

        const request = Utils.parseRequestURL();
        database.ref(`users/${userId}/cards/${request.id}`).on('value', (snapshot) => {
            let card = snapshot.val();
            let opt = document.getElementById(card.setId);
            opt.selected = true;
            
            let frontValueInput = document.getElementById('frontValueInput');
            let backValueInput = document.getElementById('backValueInput');
            frontValueInput.value = card.frontValue;
            backValueInput.value = card.backValue;
        })

        let saveButton = document.getElementById('saveButton');
        saveButton.addEventListener('click', () => {
            let frontValue = document.getElementById('frontValueInput').value;
            let backValue = document.getElementById('frontValueInput').value;
            const userId = localStorage.getItem('userId');
            if (userId != null) {
                database.ref(`users/${userId}/cards/${request.id}`).update({
                    frontValue: frontValue,
                    backValue: backValue,
                    setId: setsChoice.value,
                    creator: userId,
                    createdAt: Date.now()
                });

                window.location.hash = '/my-cards/' + key;
            }
        })
    }
 
 }
 
 export default EditCard;