let EditSet = {
    render : async () => {
        let view = `<h1>Editing set</h1>
        <form class="edit-form">
            <input class="form__input" type="text" placeholder="Set name">
            <button class="card__button card__button_big">Save name</button>
        </form>
        <ul class="cards">
            <li class="card-item">
                <h3 class="card__title">Front name</h3>
                <h4 class="card__subtitle">Back name</h4>
                <button class="card__button card__button_edit">edit</button>
                <button class="card__button card__button_delete">delete</button>
            </li>
            <li class="card-item">
                <h3 class="card__title">Front name</h3>
                <h4 class="card__subtitle">Back name</h4>
                <button class="card__button card__button_edit">edit</button>
                <button class="card__button card__button_delete">delete</button>
            </li>
            <li class="card-item">
                <h3 class="card__title">Front name</h3>
                <h4 class="card__subtitle">Back name</h4>
                <button class="card__button card__button_edit">edit</button>
                <button class="card__button card__button_delete">delete</button>
            </li>
            <li class="card-item">
                <h3 class="card__title">Front name</h3>
                <h4 class="card__subtitle">Back name</h4>
                <button class="card__button card__button_edit">edit</button>
                <button class="card__button card__button_delete">delete</button>
            </li>
            <li class="card-item">
                <h3 class="card__title">Front name</h3>
                <h4 class="card__subtitle">Back name</h4>
                <button class="card__button card__button_edit">edit</button>
                <button class="card__button card__button_delete">delete</button>
            </li>
            <li class="card-item">
                <h3 class="card__title">Front name</h3>
                <h4 class="card__subtitle">Back name</h4>
                <button class="card__button card__button_edit">edit</button>
                <button class="card__button card__button_delete">delete</button>
            </li>
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
    }
 
 }
 
 export default EditSet;