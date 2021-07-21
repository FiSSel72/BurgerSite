import { Order } from "./componetns/order";

//MENU BTN
(()=>{
const btn = document.querySelector(".menuBtn");
if (!btn) return null;

btn.addEventListener('click',()=>clickEvent.call(btn));
function clickEvent(){
console.log(this);
}
}
)();
//ORDER NOW BTN
(()=>{
    const btns = document.querySelectorAll(".orderNow");
    if (!btns) return null;

    btns.forEach(btn=>{
        btn.addEventListener('click',()=>clickEvent.call(btn));
    });
    function clickEvent(){
    const modal=document.querySelector("#orderModal");
    if (!modal)return null;
        modal.classList.add("active");
    }
    }
    )();
//CLOSE BTN
// (()=>{
//     const btns = document.querySelectorAll(".modalClose");
//     if (!btns) return null;

//    btns.forEach(btn=>{
//         btn.addEventListener('click',()=>clickEvent.call(btn));
//     });
//     function clickEvent(){
//     const modal=document.querySelector("#orderModal");
//     if (!modal)return null;
//        console.log('False if class removed and true if added, so: ', modal.classList.toggle("active"));
//     }
//     }
//     )();
    //SUMBIT ORDER BTN
    // (()=>{
    //     const btns = document.querySelectorAll(".modalOrder");
    //     if (!btns) return null;
    //    btns.forEach(btn=>{
    //         btn.addEventListener('click',()=>clickEvent.call(btn));
    //     });
    //     function clickEvent(){
    //     let data=document.querySelector("#orderForm");
    //     if (!data)return null;
    //     const nameUi=data.querySelector("input[name='name']");
    //     if(!nameUi) return null;

    //     var formData = JSON.stringify({name:nameUi.value}, null, 2);
        
    //     console.log(formData);

    //     }
    // }
    //     )();
Order.init();