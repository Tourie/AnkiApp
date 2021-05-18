import Utils from "./../../js/services/utils.js"

let RepeatProcess = {
    render : async () => {
        let view = `
        <section class="main-process">
            <div class="process__title">
                <h2 class="process__title-item">Time passed:<span Id="timeSeconds"></span></h2>
                <h2 class="process__title-item">Passed cards:<span><span id="cards-passed-num"></span> / <span id="cards-all-num" class="all-cards-num"></span></span></h2>
            </div>
            <article class="process__card" id="process__card">
                <h2 class="process__card-value" id="process__card-value">
                </h2>
            </article>
            <button class="main-process__button" id="main-process__button">Check</button>
            <section class="main-process__button-group" id="main-process__button-group">
                <button class="main-process__button main-process__button_fail" id="main-process__button_fail">Fail</button>
                <button class="main-process__button main-process__button_ok" id="main-process__button_ok">Ok</button>
            </section>
        </section>
        `
        return view
    }
    , after_render: async () => {
        const request = Utils.parseRequestURL();
        const userId = localStorage.getItem('userId');
        let cards = [];
        if(request.resource === 'repeat-set') {
            database.ref(`users/${userId}/cards/`).on('value', (snapshot) => {
                for(let cardId in snapshot.val()) {
                    const card = snapshot.child(cardId).val();
                    if(card.setId === request.id){
                        cards.push({
                            id: cardId,
                            frontValue: card.frontValue,
                            backValue: card.backValue,
                            setId: card.setId
                        });
                    }
                }

                mainLogic(cards);
            });
        }
        else if(request.resource === 'repeat-allcards') {
            database.ref(`users/${userId}/cards/`).on('value', (snapshot) => {
                for(let cardId in snapshot.val()) {
                    const card = snapshot.child(cardId).val();
                    cards.push({
                        id: cardId,
                        frontValue: card.frontValue,
                        backValue: card.backValue,
                        setId: card.setId
                    });
                }

                mainLogic(cards);
            });
        }

        function mainLogic(cards) {
            let index = -1;
            shuffle(cards);

            let totalSeconds = 0;
            setInterval(setTime, 1000);
            function setTime(){
                ++totalSeconds;
                let timer = document.getElementById('timeSeconds');
                timer.innerText = totalSeconds;
            }

            index = getNewCard(cards, index);

            const allCardsNum = document.getElementById('cards-all-num');
            allCardsNum.innerText = cards.length;

            const checkBtn = document.getElementById('main-process__button');
            checkBtn.addEventListener('click', () => {
                toResultState();
                const backValueView = document.getElementById('process__card-value');
                backValueView.innerText = cards[index].backValue;
            })

            const okBtn = document.getElementById('main-process__button_ok');
            okBtn.addEventListener('click', () => {
                index = getNewCard(cards, index);
            })

            const failBtn = document.getElementById('main-process__button_fail');
            failBtn.addEventListener('click', () => {
                index = getNewCard(cards, index);
            })
        }

        function getNewCard(cards, index) {
            index++;

            const cardPassedNum = document.getElementById('cards-passed-num');
            cardPassedNum.innerText = index;

            if(index < cards.length) {
                const frontValueView = document.getElementById('process__card-value');
                frontValueView.innerText = cards[index].frontValue;
                toCheckState();
            }
            else {
                window.location.hash = '/';
            }

            return index;
        }

        function toCheckState() {
            const frontValueView = document.getElementById('process__card-value');
            frontValueView.classList.remove('process__card-value_back');

            const elemArticle = document.getElementById('process__card');
            elemArticle.classList.remove('process__card_back');

            const btnGroup = document.getElementById('main-process__button-group');
            btnGroup.style.display = "none";

            const checkBtn = document.getElementById('main-process__button');
            checkBtn.style.display = "block";
        }

        function toResultState() {
            const frontValueView = document.getElementById('process__card-value');
            frontValueView.classList.add('process__card-value_back');

            const elemArticle = document.getElementById('process__card');
            elemArticle.classList.add('process__card_back');

            const btnGroup = document.getElementById('main-process__button-group');
            btnGroup.style.display = "flex";

            const checkBtn = document.getElementById('main-process__button');
            checkBtn.style.display = "none";
        }

        function shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
          }
    }
 
 }
 
 export default RepeatProcess;