let Home = {
   render : async () => {
    let view; 
    if(localStorage.getItem('userId') != null){
        view = `
        <h1>Welcome!</h1>
        <section class="recommendation">
                <h2 class="recommendation__title" id="recomendationTitle">Recommended for repetition</h2>
                <ul class="cards" id="recommendationList">
                </ul>
                <button class="recommendation__repeat-all" onclick="window.location='/#/repeat-allcards/'">I want to repeat all cards</button>
        </section>
        <section class="stats">
            <h2 class="stats__title">My statistics <span> / at this day</span></h2>
            <ul class="stats__list">
                <li class="stats__item">
                    <p class="stats__item-description">Cards completed: <span id="cardsCompleted"></span></p>
                </li>
                <li class="stats__item">
                    <p class="stats__item-description">Accuracy: <span><span id="accuracy"></span>%</span></p>
                </li>
                <li class="stats__item">
                    <p class="stats__item-description">Time spent: <span><span id="timeSpent"></span> Sec</span></p>
                </li>
            </ul>
        </section> 
        `
    } 
    else {
        view = `<section class="welcom-section">
        <button class="welcom-section__main-button" onClick="location.href='/#/login'">Let's start</button>
        <a class="welcom-section__about-link" href="#">about project</a>
        </section>`
    }
       return view
   }
   , after_render: async () => {

    let userName = localStorage.getItem('userName');
    if(userName != null) {
        const userId = localStorage.getItem('userId');

        getRecommendations();
    
        let dateNow = new Date(Date.now());
        let date = dateNow.getDate()  + "-" + (dateNow.getMonth()+1) + "-" + dateNow.getFullYear();
        database.ref(`users/${userId}/stats/${date}`).on('value', (snapshot) => {
            let data = snapshot.val();
            if (data == null){
                let dailyStatsRef = database.ref(`users/${userId}/stats/`);
                dailyStatsRef.child(date).set({
                    cardsCompleted: 0,
                    okCards: 0,
                    timeSpent: 0
                })

                setStatsView();
            }
            else {
                setStatsView();
            }
            
            function setStatsView() {
                database.ref(`users/${userId}/stats/${date}`).on('value', (snapshot) => {
                    let stats = snapshot.val();
                    
                    const cardsCompleted = document.getElementById('cardsCompleted');
                    cardsCompleted.innerText = stats.cardsCompleted;

                    const accuracy = document.getElementById('accuracy');
                    if (stats.cardsCompleted != 0){
                        accuracy.innerText = parseFloat((stats.okCards / stats.cardsCompleted) * 100).toFixed(1);
                    } 
                    else{
                        accuracy.innerText = 0;
                    }

                    const timeSpent = document.getElementById('timeSpent');
                    timeSpent.innerText = stats.timeSpent;
                });
            }
        });
        
        function getRecommendations() {
            const recomendationTitle = document.getElementById('recomendationTitle');

            database.ref('users/' + userId + '/sets/').on('value', (snapshot)=>{
                let sets = []
                for(let setId in snapshot.val()){
                    const set = snapshot.child(setId).val();
                    sets.push({
                        setId: setId,
                        setName: set.setName,
                        lastUsed: set.lastUsed
                    });
                }

                if(sets.length === 0) {
                    recomendationTitle.innerText = 'Nothing to recommend at the moment'
                }
                else {
                    sets.sort((a,b) => a.lastUsed < b.lastUsed ? 1 : -1);
                    sets = sets.slice(-4);

                    const recommendationList = document.getElementById('recommendationList');

                    for(let set of sets){
                        const setHTML = `
                        <li class="card-item">
                            <h3 class="card__title">${set.setName}</h3>
                            <button class="card__button card__button_repeat" onclick="window.location='/#/repeat-set/${set.setId}'">repeat</button>
                            <button class="card__button card__button_edit" onclick="window.location='/#/my-sets/${set.setId}'">edit</button>
                            <button class="card__button card__button_delete" onclick="window.location='/#/delete-set/${set.setId}'">delete</button>
                        </li>
                        `
                        recommendationList.insertAdjacentHTML("afterbegin", setHTML);
                    }
                    
                }
            });
        }
    }
   }

}

export default Home;