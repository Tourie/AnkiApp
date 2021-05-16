let header = {
    render: async () => {
        let view = `
        <div class="logo">
            <a href="/#/">Anki-app</a>
        </div>
        <nav>
            <a href="sets.html">My sets</a>
            <a href="my-cards.html">My cards</a>
            <a href="#" id="logoutButton">Log out</a>
        </nav> `
        return view
    },
    after_render: async () => {
        let logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', function() {
            firebase.auth().signOut().then(()=>{
                window.location.hash = '/#/'
            })
        })
    }

}

export default header;