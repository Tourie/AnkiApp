let MyCards = {
    render : async () => {
        let view = `
        <h1>My cards</h1>
        <button class="card__button card__button_big" id="newCardButton">Add new card</button>
        <ul id="cards" class="cards">
        </ul>
        `
        return view
    }
    , after_render: async () => {
        let newCardButton = document.getElementById('newCardButton');

        newCardButton.addEventListener('click', ()=>{
            window.location.hash = '/new-card'
        })

        const sets = document.getElementById("cards");
        const userId = localStorage.getItem('userId');

        database.ref('users/' + userId + '/cards/').on('value', (snapshot)=>{
            for(let cardId in snapshot.val()){
                const card = snapshot.child(cardId).val();
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
        });

        function getSetHtml(setid) {

        }
    }
 
 }
 
 export default MyCards;