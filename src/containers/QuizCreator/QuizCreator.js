import React, { useState } from "react";
import './QuizCreator.scss'
import Button from "../../components/ui/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/ui/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/ui/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

const createOptionControl = (number) => {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number,
  }, {required: true})
}

const createFormControls = () => {
  return (
    {
      question: createControl({
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      }, {required: true}),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4),
    }
  )
}

const QuizCreator = (props) => {

  const initialFormControls = createFormControls();

  const [isFormValid, changeFormValid] = useState(false);
  const [formControls, changeFormControls] = useState(() => createFormControls());
  const [rightAnswerId, changeRightAnswerId] = useState(1);

  const submitHandler = (event) => {
    event.preventDefault();
  }
  
  const addQuestionHandler = (event) => {
    event.preventDefault();

    const {question, option1, option2, option3, option4} = formControls;

    const questionItem = {
      question: question.value,
      id: props.quiz?.length + 1,
      rightAnswerId: rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    props.createQuizQuestion(questionItem);

    changeFormValid(false);
    changeRightAnswerId(1);
    changeFormControls(initialFormControls);
  }

  const createQuizHandler = event => {
    event.preventDefault();

    changeFormValid(false);
    changeRightAnswerId(1);
    changeFormControls(initialFormControls);
    props.finishCreateQuiz();
  }

  const changeHandler = (value, controlName) => {
    const formControl = { ...formControls };
    const control = { ...formControl[controlName] };

    control.touched = true;
    control.value = value;

    control.valid = validate(control.value, control.validation)


    formControl[controlName] = control;

    changeFormControls(formControl);

    changeFormValid(validateForm(formControl));
  }
  
  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input

            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidete={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) => changeHandler(event.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
          {/*{ console.log(`valid: ${control.valid}, touched: ${control.touched}, shouldVal: ${!!control.validation}`) }*/}
        </Auxiliary>
      )
    })
  }

  const selectChangeHandler = (event) => {
    changeRightAnswerId(+event.target.value);
  }

  const select = <Select
    label={'Выберете правильный ответ'}
    value={rightAnswerId}
    onChange={selectChangeHandler}
    options={[
      {text: 1, value: 1},
      {text: 2, value: 2},
      {text: 3, value: 3},
      {text: 4, value: 4},
    ]}
  />
  
  return (
    <div className={'QuizCreator'}>
      <div>
        <h1>Создание теста</h1>
        
        <form onSubmit={submitHandler}>

          { renderControls() }

          { select }

          <Button
            type={'Button_primary'}
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button
            type={'Button_success'}
            onClick={createQuizHandler}
            disabled={props.quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
      
    </div>
  )
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);