const tabItem = document.querySelectorAll('.tab__button');
const tabContentItem = document.querySelectorAll('.tab-content');

tabItem.forEach((item)=>
    item.addEventListener('click',(e)=>{
        const id=e.target.getAttribute('id').replace('#','');
        e.preventDefault();
        tabItem.forEach(function(child){
            child.classList.remove('tab-active');
        });
        tabContentItem.forEach(function(child){
            child.classList.remove('tab-content-active');   
        });
        item.classList.add('tab-active');
        document.getElementById(id).classList.add('tab-content-active');
    })
);

const priceTabButton = document.querySelectorAll('.price__item-header-title');
const priceTabContent = document.querySelectorAll('.price__item-content');
if(document.documentElement.clientWidth < 987){
    priceTabButton.forEach((item)=>
        item.addEventListener('click',(e)=>{
            const id =e.target.getAttribute('id').replace('#','');
            e.preventDefault();
            priceTabContent.forEach((child)=>{
                child.classList.remove('price__item-list-active');
            });
            item.classList.add('price__item-list-active');
            document.getElementById(id).classList.add('price__item-list-active');
        })
    );
}




