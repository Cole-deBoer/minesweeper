import GenerateScreen from "/js/GenerateScreen.js"
export default class App
{
    constructor()
    {
        let GameScreen = new GenerateScreen(15);
        this.disableContextMenu();
    }    

    disableContextMenu(){
        document.addEventListener('contextmenu', event => event.preventDefault());
    }
}