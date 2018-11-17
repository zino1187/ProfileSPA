/* 1사람에 대한 프로필 정보를 표현할 클래스 정의 */
class Profile{
    constructor(name,age,job){
        //데이터 즉 속성관련
        this.profile_id;
        this.name=name;
        this.age=age;
        this.job=job;

        //디자인 관련 변수 
        this.ul;

        //코드로 ul 세트를 정의 
        this.ul=document.createElement("ul");
        var li=document.createElement("li");
        li.innerText=
    }    
}