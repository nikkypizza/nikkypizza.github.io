!function(){const e=[0,20,50,100],t=document.querySelectorAll(".ProgSkillsList-ItemButton"),l=document.querySelector(".ProgSkillScale"),o=l.querySelector(".ProgSkillScale-Input"),n=l.querySelector(".ProgSkillScale-Thumb"),r=n.offsetWidth,u=l.clientWidth,s=(u-r/2)/100;n.style.left=`${o.value*s}px`,n.addEventListener("mousedown",e=>{e.preventDefault();let t=e.clientX,l=e=>{let l=t-e.clientX;t=e.clientX,e.preventDefault(),n.style.left=`${n.offsetLeft-l}px`,o.setAttribute("value",Math.abs(((n.offsetLeft-l+r/2)/u*100).toFixed(0))),n.offsetLeft<-r/2&&(n.style.left=`${-r/2}px`),n.offsetLeft>=u-r/1.5&&(n.style.left=`${u-r/1.5}px`)};const s=e=>{e.preventDefault(),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",s)}),o.addEventListener("input",()=>{n.style.left=`${o.value*s}px`});const i=document.querySelector(".Fieldset-Textarea"),d=e=>{e.style.height="inherit";let t=window.getComputedStyle(e),l=parseInt(t.getPropertyValue("border-top-width"),10)+parseInt(t.getPropertyValue("padding-top"),10)+e.scrollHeight+parseInt(t.getPropertyValue("padding-bottom"),10)+parseInt(t.getPropertyValue("border-bottom-width"),10);e.style.height=l+"px"};d(i),i.addEventListener("input",function(e){d(e.target)}),t.forEach((t,l)=>{t.addEventListener("click",()=>{o.setAttribute("value",e[l]),n.style.left=`${o.value*s-r/2}px`})})}();