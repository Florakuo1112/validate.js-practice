console.log('suc');
//dom
const form = document.querySelector('#myForm');
const input = form.querySelectorAll('input');
const submit = document.querySelector('.submit');
//把輸入的data放在這邊
 let dataToValidate={
};

form.addEventListener('click', (e)=>{
    //如果不是點到submit不要有作用
   if(e.target.value !== 'submit'){
       return
   };
   console.log(input) //會是一個陣列

   //初始化 一開始要讓字是空白,不然重按submit顯示的error提示不會消失
   input.forEach((item)=>{
       item.nextElementSibling.innerHTML = `<p></p>`
   });

   input.forEach((item)=>{
    //   console.log(item.value);
       if(item.value == 'submit'){
           return
       };
       dataToValidate[item.name] = item.value;
   });
   console.log(dataToValidate) //所輸入的資訊存在這邊
   const errors = validate(dataToValidate, constraints);
   console.log(errors); //errors是物件方式呈現
    input.forEach((item)=>{
        console.log(item.name);
        if(errors[item.name] !== undefined){
           item.nextElementSibling.textContent= errors[item.name]
           return
        }
    })
});

var constraints = {
    username: {
      presence:{
          allowEmpty:false // 這樣空字串才會被認為是empty
          ,
          message: "必填" 
      },
      exclusion:{
          within: ["nicklas"],// 不能用這個名字
          message: `不能用'%{value}` 
      },
      length:{
        maximum:2
      }
    },
    password: {
        presence:{
            allowEmpty:false
        }
    },
    email:{
        presence:{
            allowEmpty:false,
            message: "必填"
        },
       // email:true //會執行email格式的驗證
       email:{
           message:"不是正確的email格式" //可以自己設定message
       }
  },
  confirmPassword:{
    presence:{
        allowEmpty:false,
    },
      equality: dataToValidate.password
  }
};

