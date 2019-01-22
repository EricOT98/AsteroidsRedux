class KeyboardManager
{
    /**
     * KeyboardManager constructor
     * @param {Array of keys that are to be checked for} keyArray 
     */
    constructor(keyArray) {
        this.keyArray = keyArray;
        this.mouseX = 0;
        this.mouseY = 0;
        document.addEventListener("keydown", this.keyDown.bind(this), {passive:false});
        document.addEventListener("keyup", this.KeyUp.bind(this), {passive:false});
        document.addEventListener("mousemove", this.mouseMove.bind(this), {passive:false});
    }

    /**
     * keydown callback function
     * @param {keydown Event} e 
     */
    keyDown(e) {
        this.keyCheck(e, true);
    }

    /**
     * keyup callback function
     * @param {keyup Event} e 
     */
    KeyUp(e) {
        this.keyCheck(e, false);
    }

    /**
     * keyCheck function to update key status
     * @param {key event} e 
     * @param {boole representing whether the event is a keydown or not} keyDown 
     */
    keyCheck(e, keyDown) {
        keyDown = keyDown === true;
        for(var i = 0; i < this.keyArray.length; i++){
            if(this.keyArray[i] === e.code){
                e.preventDefault();
                this[e.code] = keyDown;
            }
        }
    }

    /**
     * mouseMove callback function
     * @param {mousemove event} e 
     */
    mouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
}