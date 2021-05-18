let Home = {
   render : async () => {
    let view; 
    if(localStorage.getItem('userId') != null){
        view = `
        <h1>Hi, <span id="userName"></span></h1>
        <section class="recommendation">
                <h2 class="recommendation__title">Recommended for repetition</h2>
                <ul class="cards">
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
        const userNameSpan = document.getElementById('userName');
        if(userNameSpan != null) {
            userNameSpan.innerHTML = localStorage.getItem('userName');
        }

        const userId = localStorage.getItem('userId');
    
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
    }
   }

}

export default Home;