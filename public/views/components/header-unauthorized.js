let headerUnauth = {
    render: async () => {
        let view = `
        <div class="logo">
            <a href="/#/">Anki-app</a>
        </div>
        <div class="login-buttons">
            <button class="login-buttons__sign-in" onClick="location.href='/#/login'">
                sign in
            </button>
            <button onClick="location.href='/#/registration'" class="login-buttons__sign-up" type="button">
                sign up
            </button>
        </div>`
        return view
    },
    after_render: async () => { }

}

export default headerUnauth;