

enum StatusValue {
    SUCCESS = 0,
    FAILURE = 1,
    TIMEOUT = 2,
    INIT = 3 // Initial value
}

class Status {
    msg: string;
    value: number;
    payload: any;
    constructor(msg: string = null, value: number = StatusValue.INIT, payload: any = null){
        this.msg = msg;
        this.value = value;
        this.payload = payload;
    }
}