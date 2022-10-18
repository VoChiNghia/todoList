




var newTask = document.getElementById('newTask')
var list = document.getElementById('todo')
var todoComplete = document.getElementById('completed')

var arrTodo = []
var arrComplete = []
if(localStorage.getItem('arrTodo')){
    arrTodo = JSON.parse(localStorage.getItem('arrTodo'))
}

if(localStorage.getItem('arrComplete')){
    arrComplete = JSON.parse(localStorage.getItem('arrComplete'))
}





document.getElementById('addItem').addEventListener('click', function(){
  var valueInput = newTask.value 
    var id = Math.random()*10
    var flag = true
    arrTodo.forEach(function(item){
       
        if(valueInput === item.textTodo & valueInput !== ""){
            flag = false
        }
    })

  if(flag){
    arrTodo.push({id:id,textTodo: valueInput,status: 'todo'})
    localStorage.setItem('arrTodo',JSON.stringify(arrTodo))

  }
  
  render(arrTodo,list)
  newTask.value = ""
})

window.onload = render(arrTodo,list)
window.onload = render(arrComplete,todoComplete)

function render(arrTodo,ui){
    
    var content = ''
    
    arrTodo.forEach(function(item,index){
        
         content +=  `
        <li>
            <span>${item.textTodo}</span>
            <div class="buttons">
                <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteToDo(event)">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" data-index="${index}"  data-status="${item.status}" onclick="completeToDo(event)" >
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>
    `
    })

  
    
    ui.innerHTML = content
}



const completeToDo = (e)=>{ 
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = document.getElementById('todo')
    let ulCompleted =  document.getElementById('completed')

  
    
    if(status == "todo"){       
      
        let completedItem = arrTodo.slice(tdIndex,tdIndex+1);   
        
           completedItem[0].status = "completed"
           
        arrComplete.push(completedItem[0]);
        localStorage.setItem('arrComplete',JSON.stringify(arrComplete))
        
       
      
        render(arrComplete,todoComplete)
        deleteTodoItem(tdIndex)
        deleteToDo()
       
       
    }else if(status == "completed"){
        let completedItem = arrComplete.slice(tdIndex,tdIndex+1);   
               
          completedItem[0].status = "todo"
         
           arrTodo.push(completedItem[0])
          
           render(arrTodo,list)
           deleteToDoComplete(tdIndex)
           deleteToDo()
        
    }else{
        alert("Cannot move todo !");
    }
}




function deleteToDo(e){
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = document.getElementById('todo')
    let ulCompleted =  document.getElementById('completed')

    if(status === 'todo'){
        arrTodo.splice(tdIndex, 1)
        localStorage.setItem('arrTodo',JSON.stringify(arrTodo))
        render(arrTodo,list)
    }else if(status === 'completed'){
        arrComplete.splice(tdIndex, 1)
        localStorage.setItem('arrTodo',JSON.stringify(todoComplete))
        render(arrComplete,todoComplete)
    }

   
   
    
  
}
function deleteToDoComplete(index){
   
    arrComplete.splice(index, 1)
    localStorage.removeItem('arrComplete')
    render(arrComplete,todoComplete)
}
function deleteTodoItem(index){
   
    arrTodo.splice(index, 1)
    localStorage.removeItem('arrTodo')
    render(arrTodo,list)
}