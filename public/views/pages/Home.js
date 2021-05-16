let Home = {
   render : async () => {
    let view; 
    if(localStorage.getItem('userId') != null){
        view = `<h1>Hi, <span id="userName"></span></h1>
        <section class="recommendation">
                <h2 class="recommendation__title">Recommended for repetition</h2>
                <ul class="cards">
                    <li class="card-item">
                        <h3 class="card__title">Set name</h3>
                        <button class="card__button card__button_repeat">repeat</button>
                        <button class="card__button card__button_edit">edit</button>
                        <button class="card__button card__button_delete">delete</button>
                    </li>
                    <li class="card-item">
                        <h3 class="card__title">Set name</h3>
                        <button class="card__button card__button_repeat">repeat</button>
                        <button class="card__button card__button_edit">edit</button>
                        <button class="card__button card__button_delete">delete</button>
                    </li>
                    <li class="card-item">
                        <h3 class="card__title">Set name</h3>
                        <button class="card__button card__button_repeat">repeat</button>
                        <button class="card__button card__button_edit">edit</button>
                        <button class="card__button card__button_delete">delete</button>
                    </li>
                    <li class="card-item">
                        <h3 class="card__title">Set name</h3>
                        <button class="card__button card__button_repeat">repeat</button>
                        <button class="card__button card__button_edit">edit</button>
                        <button class="card__button card__button_delete">delete</button>
                    </li>
                    <li class="card-item">
                        <h3 class="card__title">Set name</h3>
                        <button class="card__button card__button_repeat">repeat</button>
                        <button class="card__button card__button_edit">edit</button>
                        <button class="card__button card__button_delete">delete</button>
                    </li>
                </ul>
                <button class="recommendation__repeat-all">I want to repeat all cards</button>
        </section>
        <section class="stats">
            <h2 class="stats__title">My statistics <span> / at this day</span></h2>
            <ul class="stats__list">
                <li class="stats__item">
                    <p class="stats__item-description">Cards completed: <span>10</span></p>
                </li>
                <li class="stats__item">
                    <p class="stats__item-description">Accuracy: <span>80%</span></p>
                </li>
                <li class="stats__item">
                    <p class="stats__item-description">Time spent: <span>100 Min</span></p>
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

   }

}

export default Home;