export const Order={
    btns:document.querySelectorAll(".orderNow"),
    orderId:"",
    modalHandler:function(){
    console.log(this);
    },
    init: function(){
        if(!this.btns) return null;
        this.btns.forEach(btn=>{
            btn.addEventListener('click',()=>this.modalHandler.call({...this,btn}));
        });
    }
}