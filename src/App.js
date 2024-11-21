import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Footer from "./components/Footer";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

const SECONDS_PER_QUESTION = 30

const initialState = {
  questions: [],
  status: "",
  index: 0,
  answer: null,
  point: 0,
  highScore: 0,
  seconds: 0
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: "error" }
    case "start":
      return { ...state, status: "active", seconds: state.questions.length * SECONDS_PER_QUESTION }
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index)
      return {
        ...state, answer: action.payload,
        point: currentQuestion.correctOption === action.payload
          ? state.point + currentQuestion.points
          : state.point
      }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore: state.point > state.highScore ? state.point : state.highScore
      }
    case "restart":
      return { ...state, index: 0, answer: null, point: 0, status: "ready" }
    case "tick":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? "finish" : state.status,
        highScore: state.point > state.highScore ? state.point : state.highScore
      }

    default:
      return state
  }
}



export default function App() {
  const [{ status, questions, index, answer, point, highScore, seconds }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length
  const maxPossibablePoints = questions.reduce((calc, item) => calc + item.points, 0)



  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then(data => data.json())
      .then(res => {
        dispatch({ type: "dataReceived", payload: res })
      })
      .catch((err) => dispatch({ type: "dataFailed" }))
      .finally(() => dispatch({ type: "" }))
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen
          dispatch={dispatch}
          numQuestions={numQuestions} />}
        {status === "active" && (
          <>
            <Progress numQuestions={numQuestions} index={index} point={point} maxPossibablePoints={maxPossibablePoints} />
            <Questions
              index={index}
              questions={questions}
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
            />
            <Footer>
              <Timer seconds={seconds} dispatch={dispatch} />
              <NextButton answer={answer} dispatch={dispatch} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        )}
        {
          status === "finish" && <FinishScreen
            point={point}
            maxPossibablePoints={maxPossibablePoints}
            highScore={highScore}
            dispatch={dispatch} />
        }


      </Main>
    </div>
  );
}

