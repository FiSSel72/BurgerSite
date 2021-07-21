export const Order={
    btns:document.querySelectorAll(".orderNow"),
    orderId:"",
    modalHandler:function(btn){
        this.orderId=btn.dataset.id;
    },
    closeModalListener:function(){
        const btn =document.querySelector(".modalClose");
        if (!btn) return null;
            btn.addEventListener('click',()=>closeModalFunc());
            function closeModalFunc (){
                const modal=document.querySelector("#orderModal");
                    if (!modal)return null;
                        console.log('False if class removed and true if added, so: ', modal.classList.toggle("active"));
                }
    },
    orderModalListener:function(){
        const btn =document.querySelector(".modalOrder");
        if (!btn) return null;
            btn.addEventListener('click',()=>{console.log(this)});
    },
    init:function(){
        if(!this.btns) return null;
        this.btns.forEach(btn=>{
            btn.addEventListener('click',()=>this.modalHandler.call(this, btn));
        });
        this.closeModalListener();
        this.orderModalListener();
    }
}
