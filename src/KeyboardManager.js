class KeyboardManager
{
    /**
     * KeyboardManager constructor
     * @param {Array of keys that are to be checked for} keyArray 
     */
    constructor(keyArray) {
        this.keyArray = keyArray;
        document.addEventListener("keydown", this.keyDown.bind(this), {passive:false});
        document.addEventListener("keyup", this.KeyUp.bind(this), {passive:false});
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
     * keyCheck function
     * @param {key event} e 
     * @param {boolean representing whether the event is a keydown or not} keyDown 
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
}