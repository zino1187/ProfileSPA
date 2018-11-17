/* 1사람에 대한 프로필 정보를 표현할 클래스 정의 */
class Profile{
    constructor(name,age,job){
        //데이터 즉 속성관련
        this.profile_id;
        this.name=name;
        this.age=age;
        this.job=job;

        this.arr=[
            this.name,
            this.age,
            this.job
        ];
        //디자인 관련 변수 
        this.ul;

        //코드로 ul 세트를 정의 
        this.ul=document.createElement("ul");
        //순수 자바스크립트에서 이벤트 핸들러를 동적
        //으로 구현하는 방법
        this.ul.addEventListener("click", ()=>{
            getDetail(this.arr);
        });

        for(var i=0;i<this.arr.length;i++){
            var li=document.createElement("li");
            li.innerText=this.arr[i];
            li.style.display="inline-block";
            li.style.width="30%";
            li.style.lineHeight="30px";
            this.ul.appendChild(li);
        }                
    }    
}