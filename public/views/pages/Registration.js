let Registration = {
    render : async () => {
        let view = `
        <dialog id="dialog">
            <form action="javascript:void(0);">
                <fieldset>
                    <legend class="form__name">Registration</legend>
                    <input id="nameInput" class="form__input" type="text" placeholder="Your name" required>
                    <input id="emailInput" class="form__input" type="text" placeholder="Email" required>
                    <input id="passwordInput" class="form__input" type="password" placeholder="Password" required>
                    <button id="registrationSubmit" class="form__submit" type="submit">Sign up</button>
                </fieldset>
            </form>
        </dialog>
        `
        return view
    }
    , after_render: async () => {
        let dialog = document.getElementById('dialog');
        dialog.showModal();

        let registrationButton = document.getElementById('registrationSubmit');
        registrationButton.addEventListener('click', function() {
            registration();
        });
        
        function registration() {
            let nameInput = document.getElementById('nameInput');
            let emailInput = document.getElementById('emailInput');
            let passwordInput = document.getElementById('passwordInput');

            firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
            .then((userCredential) => {
                let currentUser = userCredential.user;
                
                currentUser.updateProfile({
                    displayName: nameInput.value
                }).then(() => {
                    firebase.database().ref('users/' +  currentUser.uid + '/userInformation/').set({
                        registrationDate : Date.now()
                    }).then(() => {
                        localStorage.setItem('userId', currentUser.uid);
                        window.location.hash = '/';
                    })
                }).catch(function (error) {
                    console.log(error.message);
                });

            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    }
 
 }
 
 export default Registration;