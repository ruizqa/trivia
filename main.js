let element;
let categories ={
  'geography':22,
  'entertainment':11,
  'science':17
}

let questionNums ={
  1:{cat:'geo', type:'easy', points:100},
  2:{cat:'ent', type:'easy',points:100},
  3:{cat:'sci', type:'easy',points:100},
  4:{cat:'geo', type:'medium',points:200},
  5:{cat:'ent', type:'medium',points:200},
  6:{cat:'sci', type:'medium',points:200},
  7:{cat:'geo', type:'hard',points:300},
  8:{cat:'ent', type:'hard',points:300},
  9:{cat:'sci', type:'hard',points:300},

}

let questions ={}
function writeQuestion(question){
  return `<div class="card-content white-text">
  <input type='hidden' value='${question.points}'>
  <span class="card-title">Question #${question.number}</span></span>
  <p class="q-body">${question.text}</p>
  <p>
    <label>
      <input name="question${question.number}" type="radio" value="option1" class=${question.options[0].type}/>
      <span>${question.options[0].value}</span>
    </label>
  </p>
  <p>
    <label>
      <input name="question${question.number}" type="radio" value="option2" class=${question.options[1].type}/>
      <span>${question.options[1].value}</span>
    </label>
  </p>
  <p>
    <label>
      <input name="question${question.number}" type="radio" value="option3" class=${question.options[2].type}/>
      <span>${question.options[2].value}</span>
    </label>
  </p>
</div>`}

function getQuestion(type,category,number,selector){
  let element = $(`${selector}`).parent();
  let categoryId= categories[category]
  $.get(`https://opentdb.com/api.php?amount=1&category=${categoryId}&difficulty=${type}&type=multiple`,function(data){
    $(data.results).each(function(){
        let question ={}
        question.number=number
        question.text = data.results[0].question;
        question.options=[]

        let answers ={
            'correct':data.results[0].correct_answer,
            'incorrect1': data.results[0].incorrect_answers[0],
            'incorrect2': data.results[0].incorrect_answers[1]
        }

        let i=0;

        while(Object.keys(answers).length>0){
          let index =Math.floor(Math.random()*Object.keys(answers).length)
          question.options[i] ={}
          question.options[i].value = answers[Object.keys(answers)[index]]
          question.options[i].type = Object.keys(answers)[index]
          delete answers[Object.keys(answers)[index]]
          i+=1
        }
        
        if(type=="easy"){
          question.points=100
        } 
        else if (type=='medium'){
          console.log(type);
          question.points=200}
        else if (type=='hard') {
          question.points=300
        }
        
        $(element).empty()
        $(element).append(writeQuestion(question))
        $('input[type="radio"]').change(checkAnswer)

    })
})

}

let EventListeners = {
  'geo-easy' : function(){getQuestion('easy', 'geography',1, '#geo-easy')},
  'geo-medium':function(){getQuestion('medium', 'geography',4,'#geo-medium')},
  'geo-hard': function(){getQuestion('hard', 'geography',7, '#geo-hard')},
  'ent-easy': function(){getQuestion('easy', 'entertainment',2, '#ent-easy')},
  'ent-medium': function(){getQuestion('medium', 'entertainment',5, '#ent-medium')},
  'ent-hard':function(){getQuestion('hard', 'entertainment',8, '#ent-hard')},
  'sci-easy':function(){getQuestion('easy', 'science',3, '#sci-easy')},
  'sci-medium':function(){getQuestion('medium', 'science',6,'#sci-medium')},
  'sci-hard': function(){getQuestion('hard', 'science',9,'#sci-hard')}

}



function ActivateButtons(){
for(key in EventListeners){
  $(`#${key}`).on('click', EventListeners[key])
    
}}



ActivateButtons();

function checkAnswer(event){
  let element = event.target
  let number = element.name
  if($(element).hasClass('correct/')){
    $(element).next('span').css('color','white')
    let points = parseInt($(`#${number}`).find('input[type="hidden"]').val())
    $('#score').text(parseInt($('#score').text())+points)
    $(`#${number}`).find('.card').prepend('<p class="white-text">Correct Answer!</p>')
}
else{
    $(`#${number}`).find('input[class^="correct"]').next('span').css('color','white')
    $(`#${number}`).find('.card').prepend('<p class="white-text">Incorrect Answer :( </p>')
}
$(`#${number}`).find('input').prop('disabled', true)


}

$('#reload').on('click', function(){
  for(let i=1;i<10;i++){
    $(`#question${i}`).empty().append(getButtons(i))
  }
  ActivateButtons();
})

$('#reload').on('mouseover', function(){
  $(this).css('cursor', 'pointer');
})

function getButtons(number){
return `<div class="card blue-grey darken-1">
<a class="btn" id="${questionNums[number].cat}-${questionNums[number].type}">${questionNums[number].points} pts</a>
</div>`
  
}

// $(document).ready(function(){

//     //geography questions
//     $.get("https://opentdb.com/api.php?amount=3&category=22&difficulty=easy&type=multiple",function(data){
//         $(data.results).each(function(index){
//             let text = data.results[index].question;
//             let answers ={
//                 'correct':data.results[index].correct_answer,
//                 'incorrect1': data.results[index].incorrect_answers[0],
//                 'incorrect2': data.results[index].incorrect_answers[1]
//             }

//             let number = 'question' + parseInt(index*3+1)
//             let question = {
//               'text': text,
//               'answers':answers
//             }
            
//             questions[number] = question

//         })
//     })

//     //entertainment
//     $.get("https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=multiple",function(data){
//       $(data.results).each(function(index){
//           let text = data.results[index].question;
//           let answers ={
//               'correct':data.results[index].correct_answer,
//               'incorrect1': data.results[index].incorrect_answers[0],
//               'incorrect2': data.results[index].incorrect_answers[1]
//           }

//           let number = 'question' + parseInt(index*3+1)
//           let question = {
//             'text': text,
//             'answers':answers
//           }
          
//           questions[number] = question

//       })
//   })

//     //science questions


// })





// $(`#question${index*3+1} .q-body`).text(question)
// while(options.length>0){
//     let random = Math.floor(Math.random()*options.length);
//     $(`#question${index*3+1} input[value="option${options[random]}"]`).siblings('span').text(Object.values(answers)[options[random]-1]).addClass(Object.keys(answers)[options[random]-1])
//     options.splice(random,1);
// }