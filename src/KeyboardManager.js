class KeyboardManager
{
    /**
     * KeyboardManager constructor
     */
    constructor()
    {
        this.W_KEY = "KeyW";
        this.A_KEY = "KeyA";
        this.S_KEY = "KeyS";
        this.D_KEY = "KeyD";
        this.UP_KEY = "ArrowUp";
        this.DOWN_KEY = "ArrowDown";
        this.LEFT_KEY = "ArrowLeft";
        this.RIGHT_KEY = "ArrowRight";
        document.addEventListener("keydown", this.keyPressed.bind(this), {passive:false});
        document.addEventListener("keyup", this.KeyReleased.bind(this), {passive:false});
        this.keyStatusDict = {};
    }

    /**
     * keydown Callback function
     * @param {KeyPress Event} e 
     */
    keyPressed(e)
    {
        this.keyStatusDict[e.code] = true;
        e.preventDefault();
    }

    /**
     * Key
     * @param {*} e 
     */
    KeyReleased(e)
    {
        this.keyStatusDict[e.code] = false;
        e.preventDefault();
    }
}