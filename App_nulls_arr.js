Есть массив (Ответы с сервера - data.questions) с N-ым количеством вопросов(количество каждый раз разное)
Этот массив записывается в state(questionsFromServer)
Так же в момент получения данных с сервера, создаём другой массив (ОтветыПользователя), изначально пустой - []
Потом проходясь циклом по первому массиву (Ответы с сервера), внутри цикла - на каждой итерации мы добавляем во второй массив (ОтветыПользователя)
элемент со значением 0 (число). После чего второй массив сразу же записывается в state.(userAnswers)

Переходим к Компоненту, который выводит на экран вопрос и форму с ответами.
Каждый раз когда открывается новый вопрос, у нас уже есть его id, начальное его значение пусть будет 0 а не 1.
Используя useSlector, получаем из state массив 2 - ОтветыПользователя:
var userAnswers = useSelector((state) => state.userAnswers)
Так же получаем из state необходимый элемент первого массива:
var question = useSelector((state) => state.questionsFromServer[id].question) - записали вопрос в переменную question
var answers = useSelector((state) => state.questionsFromServer[id].answers) - записали все ответы на этот вопрос в переменную answers
var userAnswer = useSelector((state) => state.userAnswers[id]) - в userAnswer записали значение элемента по позиции номера вопроса в массиве
(ОтветыПользователя), которое изначально равно 0.
id в [] - это id текущего вопроса.



добавляем action:
export function changeAnswerAction(id,answer) {
    var data = {id: id, answer: answer}
    return { type: CHANGE_ANSWER_ACTION, data };
}

в редюсере:
case CHANGE_ANSWER_ACTION:
        var userAnswersCopy = state.userAnswers.slice();  //ОБЯЗАТЕЛЬНО делаем срез массива что бы не сслался на то же место в памяти(особенности js)
        userAnswersCopy[data.id] = data.answer
        return {
          ...state,
          userAnswers: userAnswersCopy,  // перезаписывает стейт на копию массива (копия не ссылается на то же место в памяти компа)
};


const dispatch = useDispatch()

так же пишем функцию изменения ответа на вопрос


var  answerChange (id,e) {
    dispatch(changeAnswerAction(id,e)) // передаём в state значение нового ответа
}

Переменную question вставляем в return компонента,
а потом возвращаемся в код компонента - до return
создаём пустой массив answers_list - в котором собираем jsx код.
циклом проходим по массиву answers, в случае когда по данному элементу в объекте

var answers_list = []
for (var i=0;i<answers.length;i++) {
    answers_list = answers_list.concat(
        <div onClick={changeAnswer(i)}>
            <label>
            <input
              value={i} // где i - номер элемента в массиве ответов. по элементу этого массива и его полю value мы будем проверять правильно ли он ответил
              key={i}
              type="radio"
              name="answer"
              checked={userAnswer != 0 ? 'checked': false} // если в общем массиве ответов по номеру этого вопроса значение 0 то инпут не выбран - иначе выбран
              onChange={()=>{answerChange(id,e)}}
            />
                {answers.answer}
            </label>
        </div>
    )
}
return (
    <div>
        <div>
            {question}
        </div>
            <div>
                {answers_list}
            </div>
            <div>
                <button onClick={nextQuestion}>  // nextQuestion - у тебя уже прописана
                    перейти к следующему вопросу
                </button>
            </div>
    </div>
)