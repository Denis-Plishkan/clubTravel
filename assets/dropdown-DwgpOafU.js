import{$ as s}from"./header--MTLiN39.js";class u{dropDown;dropMain;quantityAdults;quantityKids;addBtn;btn;children;tegContainer;error;currentAbdul;currentKids;customEvent;constructor(t,o){this.dropDown=s(t).find(".dropdown"),this.dropMain=this.dropDown.find(".dropdown__main"),this.quantityAdults=this.dropDown.find("#adults-quantity"),this.quantityKids=this.dropDown.find("#kids-quantity"),this.addBtn=this.dropDown.find(".dropdown__button-add"),this.error=this.dropDown.find(".dropdown__error"),this.btn=this.dropDown.find(".dropdown__btn"),this.children=this.dropDown.find(".dropdown__children"),this.tegContainer=s(o),this.customEvent=new CustomEvent("myCustomEvent"),this.currentAbdul=1,this.currentKids=0,this.init()}init(){this.open(),this.counter(this.dropDown.find(".dropdown__count-one")),this.counter(this.dropDown.find(".dropdown__count-two"),!0),this.removeTag(),this.removeAgeSelect(1),this.addPeople()}open(){this.btn.on("click",()=>{this.dropDown.toggleClass("dropdown_active")});const t=this;s(document).on("click",function(o){t.dropDown.has(o.target).length==0&&t.dropDown.removeClass("dropdown_active")})}counter(t,o=!1){const r=t.find(".dropdown__count-add"),i=t.find(".dropdown__count-remove"),e=t.find(".dropdown__count-current"),n=this;function c(){let d=+e.text();if(d<9){const l=d+1;e.html(String(l)),o?n.timeout(l,1):n.currentAbdul=l}}function h(){let d=+e.text();if(d>1||o&&d>0){const l=d-1;e.html(String(l)),o?(n.timeout(l,2),s(".dropdown__error").removeClass("dropdown__error_active-kids")):n.currentAbdul=l}}r.on("click",c),i.on("click",h)}addAgeSelect(t,o=!1){const i=this.dropDown.find(".children__drop").length;if(console.log(i),o){const e=this.kids();console.log(e),this.children.html("");let n=0;for(const c in e)for(let h=0;h<+e[c];h++){this.children.append(`
            <div id="drop-${n}" class="children__drop">
                <button class="children__btn">
                    <span class="children__current">${c}</span>
                    <svg><use xlink:href="#chevron-left"></use></svg> 
                </button>
                <ul class="children__list">
                    <li>Укажите возраст</li>
                    <li>&lt; 1 год</li>
                    <li>1 год</li>
                    <li>2 года</li>
                    <li>3 года</li>
                    <li>4 года</li>
                    <li>5 лет</li>
                    <li>6 лет</li>
                    <li>7 лет</li>
                    <li>8 лет</li>
                    <li>9 лет</li>
                    <li>10 лет</li>
                    <li>11 лет</li>
                    <li>12 лет</li>
                    <li>13 лет</li>
                    <li>14 лет</li>
                    <li>15 лет</li>
                    <li>16 лет</li>
                    <li>17 лет</li>
                </ul>
            </div>
        `);const d=s("<script>").attr("type","text/javascript").text(`
              function dropDown(id){
                  const drop = document.querySelector(id)
                  const li = drop.querySelectorAll('li');
                  const current = drop.querySelector('.children__current');
                  const btn  = drop.querySelector('.children__btn');
                  const listHeight = drop.querySelector('.children__list').offsetHeight;
  
                  li.forEach(item => {
                      item.addEventListener('click', () => {
                          current.textContent = item.textContent
                          if(item.textContent !== 'Укажите возраст'){
                              drop.classList.remove('children__drop_error')
                              document.querySelector('.dropdown__error').classList.remove('dropdown__error_active-kids')
                          }
                      })
                  });
  
                  
                  drop.addEventListener('click', () => {
                      drop.classList.toggle('children__drop_active')
                  })
  
                  document.addEventListener('click', (e) => {
                      if (!drop.contains(e.target)) {
                          drop.classList.remove('children__drop_active');
                      }
                  });
  
                  function observer(){
                      const options = {
                          rootMargin: '0px 0px -' + (listHeight? listHeight + 30 : 300 ) + 'px 0px',
                          threshold: 1 
                      };  
                      const observer = new IntersectionObserver(callback, options);  
                      if(btn){
                          observer.observe(btn);
                      }
          
                      function callback(entries) {
                          entries.forEach(entry => {
                              if (entry.isIntersecting) {
                                      drop.classList.add('children_top');
                                      drop.classList.remove('children_bottom');
                              } else {
                                  if(window.innerHeight > 700 ){
                                      drop.classList.add('children_bottom');
                                      drop.classList.remove('children_top');
                                  }
                              }
                          });
                      }
                  }
                  observer()
                  drop.classList.add('children__drop_opacity')
              }
              dropDown('#drop-${n}')
          `);s("body").append(d),n++}}else for(let e=0;e<t;e++)if(e>i-1){this.children.append(`
            <div id="drop-${e}" class="children__drop">
                <div class="children__btn">
                    <span class="children__current">Укажите возраст</span>
                    <svg><use xlink:href="#chevron-left"></use></svg> 
                </div>
                <ul class="children__list">
                    <li>&lt; 1 год</li>
                    <li>1 год</li>
                    <li>2 года</li>
                    <li>3 года</li>
                    <li>4 года</li>
                    <li>5 лет</li>
                    <li>6 лет</li>
                    <li>7 лет</li>
                    <li>8 лет</li>
                    <li>9 лет</li>
                    <li>10 лет</li>
                    <li>11 лет</li>
                    <li>12 лет</li>
                    <li>13 лет</li>
                    <li>14 лет</li>
                    <li>15 лет</li>
                    <li>16 лет</li>
                    <li>17 лет</li>
                </ul>
            </div>
        `);const n=s("<script>").attr("type","text/javascript").text(`
              function dropDown(id){
                  const drop = document.querySelector(id)
                  const li = drop.querySelectorAll('li');
                  const current = drop.querySelector('.children__current');
                  const btn  = drop.querySelector('.children__btn');
                  const listHeight = drop.querySelector('.children__list').offsetHeight;
  
                  li.forEach(item => {
                      item.addEventListener('click', () => {
                          current.textContent = item.textContent
                          if(item.textContent !== 'Укажите возраст'){
                              drop.classList.remove('children__drop_error')
                              document.querySelector('.dropdown__error').classList.remove('dropdown__error_active-kids')
                          }
                      })
                  });
  
                  
                  drop.addEventListener('click', () => {
                      drop.classList.toggle('children__drop_active')
                  })
  
                  document.addEventListener('click', (e) => {
                      if (!drop.contains(e.target)) {
                          drop.classList.remove('children__drop_active');
                      }
                  });
  
                  function observer(){
                      const options = {
                          rootMargin: '0px 0px -' + (listHeight? listHeight + 30 : 300 ) + 'px 0px',
                          threshold: 1 
                      };  
                      const observer = new IntersectionObserver(callback, options);  
                      if(btn){
                          observer.observe(btn);
                      }
          
                      function callback(entries) {
                          entries.forEach(entry => {
                              if (entry.isIntersecting) {
                                      drop.classList.add('children_top');
                                      drop.classList.remove('children_bottom');
                              } else {
                                  if(window.innerHeight > 700 ){
                                      drop.classList.add('children_bottom');
                                      drop.classList.remove('children_top');
                                  }
                              }
                          });
                      }
                  }
                  observer()
                  drop.classList.add('children__drop_opacity')
              }
              dropDown('#drop-${e}')
          `);s("body").append(n)}}removeAgeSelect(t){this.dropDown.find(".children__drop").each((r,i)=>{r>t-1&&(i.classList.remove("children__drop_opacity"),setTimeout(()=>{i.remove()},150))})}removeTag(){this.tegContainer.on("click",t=>{const o=t.target.parentElement?.textContent?.replace(/(x[0-9])\s\+/,"").trim(),r=this.dropDown.find(".children__drop"),i=s(".dropdown__count-two").find(".dropdown__count-current");t.target.innerHTML==="+"&&(r.each((e,n)=>{const c=n.querySelector(".children__current")?.textContent;o===c&&(t.target.parentElement?.remove(),n.style.display="none",n.remove())}),this.addAgeSelect(1,!0),i.html(String(this.currentKids)),this.kids(),s("#kids-quantity").html(String(this.currentKids)),this.timeout(this.currentKids,3)),document.dispatchEvent(this.customEvent)})}timeout(t,o){function r(){const i=Math.ceil(t/2);let e=0;return i===1?e=40:i>1&&(e=i*45-5),e}o===1?(t%2!==0&&this.children.css("height",`${r()}px`),this.addAgeSelect(t)):o===2?(t%2===0&&this.children.css("height",`${r()}px`),this.removeAgeSelect(t)):this.children.css("height",`${r()}px`)}kids(){const t=this.dropDown.find(".children__drop"),o=this,r={};return t.each(function(i,e){const n=String(e.querySelector(".children__current")?.textContent);n==="Укажите возраст"?(e.classList.add("children__drop_error"),o.error.addClass("dropdown__error_active-kids")):r.hasOwnProperty(n)?r[n]++:r[n]=1}),this.currentKids=Object.keys(r).reduce((i,e)=>(i+=+r[e],i),0),r}addPeople(){this.addBtn.on("click",()=>{const t=this.kids();if(this.dropDown.find(".children__drop_error").length===0){this.quantityAdults.html(String(this.currentAbdul)),this.quantityKids.html(String(this.currentKids)),this.dropDown.removeClass("dropdown_active"),this.tegContainer.html(`
            <li>Взрослых x${this.currentAbdul}</li>
        `);for(const i in t)this.tegContainer.append(`
            <li>${i} x${t[i]} <span>+</span></li>
          `);const r=new CustomEvent("myCustomEvent",{detail:{kids:this.currentKids,adults:this.currentAbdul}});document.dispatchEvent(r)}})}getAdults(){return this.currentAbdul}getKids(){return this.currentKids}}export{u as D};
