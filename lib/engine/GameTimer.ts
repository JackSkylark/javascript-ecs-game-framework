class GameTimer {
    private _isStarted: boolean;
    private _lastTime: number = (new Date()).getTime();
    public deltaTime: number = 0;

    private start = () => {
        this._lastTime = (new Date()).getTime();
        this.deltaTime = 0;
        this._isStarted = true;
    }

    tick = () => {
        if (!this._isStarted) {
            this.start();
        }

        const currentTime = (new Date()).getTime();
        this.deltaTime = (currentTime - this._lastTime) / 1000;
        this._lastTime = currentTime;
    }
}

export default GameTimer;
