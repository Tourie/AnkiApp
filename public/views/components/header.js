let header = {
    render: async () => {
        let view = `
        <div class="logo">
            <a href="/#/">Anki-app</a>
        </div>
        <nav>
            <a id="mySetsButton">My sets</a>
            <a id="myCardsButton">My cards</a>
            <a id="logoutButton">Log out</a>
        </nav> `
        return view
    },
    after_render: async () => {
        let mySetsButton = document.getElementById('mySetsButton');
        let myCardsButton = document.getElementById('myCardsButton');
        let logoutButton = document.getElementById('logoutButton');

        logoutButton.addEventListener('click', function() {
            firebase.auth().signOut().then(() => {
                localStorage.removeItem('userId');
                window.location.hash = '/';
            })
        });

        mySetsButton.addEventListener('click', function () {
            window.location.hash = '/my-sets'
        })

        myCardsButton.addEventListener('click', function () {
            window.location.hash = '/my-cards'
        })
    }

}

export default header;