let Login = {
    render : async () => {
        let view = `
        <dialog id="dialog">
            <form action="javascript:void(0);">
                <fieldset>
                    <legend class="form__name">Log in</legend>
                    <input id="emailInput" class="form__input" type="text" placeholder="Email">
                    <input id="passwordInput" class="form__input" type="password" placeholder="Password">
                    <button id="loginSubmit" class="form__submit" type="submit">Sign in</button>
                </fieldset>
            </form>
        </dialog>
        `
        return view
    }
    , after_render: async () => {
        let dialog = document.getElementById('dialog');
        dialog.showModal();

        let loginButton = document.getElementById('loginSubmit');
        loginButton.addEventListener('click', function() {
            login();
        })

        function login() {
            let emailInput = document.getElementById('emailInput');
            let passwordInput = document.getElementById('passwordInput');

            firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
            .then((userCredential) => {
                let currentUser = userCredential.user;
                localStorage.setItem('userId', currentUser.uid);
                window.location.hash = '/';
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    }
 
 }
 
 export default Login;