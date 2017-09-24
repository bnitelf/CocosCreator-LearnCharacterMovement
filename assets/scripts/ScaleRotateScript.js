cc.Class({
    extends: cc.Component,

    ctor: function() {
        this.contScaleUp = false;
        this.contScaleDown = false;
        this.contRotateLeft = false;
        this.contRotateRight = false;

        // ต้องใช้หน่วยเป็น amount/second เพราะ update() ส่ง param มาเป็น delta time
        // ถ้าเรา loop update จะทำให้ update() ค้าง
        this.rotateAnglePerSec = 45; // degree
        this.scalePerSec = 0.2; // percent per second (0.2 = 20%)
    },

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        maxScale:  1,
        minScale: 0.2,

    },

    // use this for initialization
    onLoad: function () {

    },

    //called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.contScaleUp){
            var currentScaleX = this.node.scaleX;
            var currentScaleY = this.node.scaleY;

            if(currentScaleX < this.maxScale) {
                var newScaleX = currentScaleX + (this.scalePerSec * dt);
                var newScaleY = currentScaleY + (this.scalePerSec * dt);

                this.node.setScale(newScaleX, newScaleY);
            }
        }

        if(this.contScaleDown){
            var currentScaleX = this.node.scaleX;
            var currentScaleY = this.node.scaleY;

            if(currentScaleX > this.minScale) {
                var newScaleX = currentScaleX + (-this.scalePerSec * dt);
                var newScaleY = currentScaleY + (-this.scalePerSec * dt);

                this.node.setScale(newScaleX, newScaleY);
            }
        }

        if(this.contRotateLeft){
            var currentRotation = this.node.rotation;
            
            var newRotation = currentRotation + (-this.rotateAnglePerSec * dt);
            this.node.setRotation(newRotation);
        }

        if(this.contRotateRight){
            var currentRotation = this.node.rotation;
            
            var newRotation = currentRotation + (this.rotateAnglePerSec * dt);
            this.node.setRotation(newRotation);
        }
    },

    rotateLeft: function () {
        var currentRotation = this.node.rotation;
        var newRotation = currentRotation - 1;
        this.node.setRotation(newRotation);
    },

    rotateRight: function () {
        var currentRotation = this.node.rotation;
        var newRotation = currentRotation + 1;
        this.node.setRotation(newRotation);
    },

    rotateLeftForever: function () {
        // Continue update should be done in update() function
        // otherwise UI will freeze
        if(!this.contRotateLeft){
            this.contRotateLeft = true;
            this.contRotateRight = false;
        } else {
            this.contRotateLeft = false;
            this.contRotateRight = false;
        }
    },

    rotateRightForever: function () {
        // Continue update should be done in update() function
        // otherwise UI will freeze
        if(!this.contRotateRight){
            this.contRotateRight = true;
            this.contRotateLeft = false;
        } else {
            this.contRotateRight = false;
            this.contRotateLeft = false;
        }
    },

    scaleDown: function () {
        var currentScaleX = this.node.scaleX;
        var currentScaleY = this.node.scaleY;

        if(currentScaleX > this.minScale || currentScaleY > this.minScale){
            var newScaleX = currentScaleX - 0.1;
            var newScaleY = currentScaleY - 0.1;

            this.node.setScale(newScaleX, newScaleY);
        }
    },

    scaleUp: function () {
        var currentScaleX = this.node.scaleX;
        var currentScaleY = this.node.scaleY;

        if(currentScaleX < this.maxScale || currentScaleY < this.maxScale){
            var newScaleX = currentScaleX + 0.1;
            var newScaleY = currentScaleY + 0.1;

            this.node.setScale(newScaleX, newScaleY);
        }
    },

    scaleDownForever: function () {
        // Continue update should be done in update() function
        // otherwise UI will freeze
        if(!this.contScaleDown){
            this.contScaleDown = true;
            this.contScaleUp = false;
        } else {
            this.contScaleDown = false;
            this.contScaleUp = false;
        }
    },

    scaleUpForever: function () {
        // Continue update should be done in update() function
        // otherwise UI will freeze
        if(!this.contScaleUp){
            this.contScaleUp = true;
            this.contScaleDown = false;
        } else {
            this.contScaleUp = false;
            this.contScaleDown = false;
        }
    },

    goToMainScene: function () {
        cc.director.loadScene("MainScene");
    }

});
