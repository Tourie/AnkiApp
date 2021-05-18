let NewSet = {
    render : async () => {
        let view = `
        <dialog id="dialog">
            <form action="javascript:void(0);">
                <fieldset>
                    <legend class="form__name">New set</legend>
                    <input id="setNameInput" class="form__input" type="text" placeholder="Set name" required>
                    <button id="setSubmitBtn" class="form__submit" type="submit">Add</button>
                </fieldset>
            </form>
        </dialog>
        `
        return view
    }
    , after_render: async () => {
        let dialog = document.getElementById('dialog');
        dialog.showModal();

        let setSubmitBtn = document.getElementById('setSubmitBtn');
        setSubmitBtn.addEventListener('click', () => {
            const setNameInput = document.getElementById('setNameInput');
            const userId = localStorage.getItem('userId');
            if (userId != null && setNameInput.value != '') {
                let setsRef = database.ref('/users/' + userId + '/sets/');
                const key = setsRef.push({
                    setName: setNameInput.value,
                    creator: userId,
                    createdAt: Date.now(),
                    lastUsed: 0
                }).key;

                window.location.hash = '/my-sets/' + key;
            }
        })
        
    }
 
 }
 
 export default NewSet;