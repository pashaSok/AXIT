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





