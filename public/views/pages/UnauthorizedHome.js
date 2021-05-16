let UnauthorizedHome = {
    render : async () => {
        let view = `
        <section class="welcom-section">
            <button class="welcom-section__main-button" onClick="location.href='main.html'">Let's start</button>
            <a class="welcom-section__about-link" href="#">about project</a>
        </section> 
        `
        return view
    }
    , after_render: async () => {
    }
 
 }
 
 export default UnauthorizedHome;