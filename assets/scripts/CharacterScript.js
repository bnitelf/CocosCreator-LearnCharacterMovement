cc.Class({
    extends: cc.Component,
    
    ctor: function () {
        // Declare member variable and assign default value.
        this.rootCanvas =  null;
        this.goLeft = false;
        this.goRight = false;
        this.jumping = false;

        this.ACTION_TAG_JUMPING = 1;
    },

    properties: {
        // Jump height in pixel
        jumpHeight: 200,

        // Pixel/s
        moveSpeed: 600,

    },

    // use this for initialization
    onLoad: function () {

        this.rootCanvas = cc.find("Canvas").getComponent("CanvasScript");

        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // dt param or delta time
        // is the time between the start of the previous and the start of the current call to update()
        // The unit of this value is seconds
        // ref: https://stackoverflow.com/questions/34479099/what-is-a-delta-time-in-libgdx
        if(this.goLeft || this.goRight){
            this.walk(dt);
        }
    },

    onDestroy: function () {
        // remove key down and key up event
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {

        //cc.log("this = ", this);
        //cc.log("event = ", event);
        switch(event.keyCode) {
            case cc.KEY.left:
            case cc.KEY.a:
                //cc.log('Press left key');
                this.goLeft = true;
                break;

            case cc.KEY.right:
            case cc.KEY.d:
                //console.log('Press right key');
                this.goRight = true;
                break;

            case cc.KEY.up:
            case cc.KEY.w:
                //console.log('Press up key');
                this.jump();
                break;


        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.KEY.left:
            case cc.KEY.a:
                //cc.log('Release left key');
                this.goLeft = false;
                break;

            case cc.KEY.right:
            case cc.KEY.d:
                //console.log('Release right key');
                this.goRight = false;
                break;

            case cc.KEY.up:
            case cc.KEY.w:
                //console.log('Release up key');
                break;


        }
    },

    jump: function () {

        // get the action by tag
        var action = this.node.getActionByTag(this.ACTION_TAG_JUMPING);

        //cc.log("action = ", action);
        //cc.log("jumping = ", this.jumping);

        // if action == null mean action has finished run
        if(action == null){
            this.jumping = false;
        }

        if(!this.jumping){
            // cc.p(x, y) = cc.Vec2(x, y)
            // x ค่าบวก = ไปขวา
            // x ค่าลบ = ไปซ้าย 
            // ตามหลักคณิต
            var actionJumpUp = cc.moveBy(0.2, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
            var actionJumpDown = cc.moveBy(0.2, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
            action = cc.sequence([actionJumpUp, actionJumpDown]);

            // set tag because want to check if jump action has ended or not
            action.setTag(this.ACTION_TAG_JUMPING);

            this.node.runAction(action);
            this.jumping = true;
        }
    },

    walk: function (dt) {
        
        if(this.goLeft){
            if(!this.isTouchLeftScreenEdge())
                this.node.x -= this.moveSpeed * dt; 
        } else if (this.goRight){
            if(!this.isTouchRightScreenEdge())
                this.node.x += this.moveSpeed * dt; 
        }
    },

    isTouchLeftScreenEdge: function () {
        
        var nodeMinX = this.node.x - (this.node.width / 2);
        var nodeMaxX = this.node.x + (this.node.width / 2);
        if(nodeMinX <= this.rootCanvas.getMinX()){
            return true;
        } else {
            return false;
        }
    },

    isTouchRightScreenEdge: function () {
            
        var nodeMinX = this.node.x - (this.node.width / 2);
        var nodeMaxX = this.node.x + (this.node.width / 2);
        if(nodeMaxX >= this.rootCanvas.getMaxX()){
            return true;
        } else {
            return false;
        }
    }


});
