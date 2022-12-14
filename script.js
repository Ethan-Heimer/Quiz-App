function Question(_ID, _question, _correctAnswer, _answer2, _answer3, _answer4){
    const question = _question;
    const correctAnswer = _correctAnswer;
    const answer2 = _answer2;
    const answer3 = _answer3;
    const answer4 = _answer4;

    const ID = _ID;
    
    const GetPossableAnswers = () =>
    {
        return [correctAnswer, answer2, answer3, answer4];
    }

    const Answer = (answer) => {
        var isCorrect = answer === correctAnswer;

        if(isCorrect)
        {            
            score.Correct();
        }
        else{
            score.Wrong();
        }

        if(ID !== questions.length-1)
        {
            display.SetQuestion(questions[ID+1]);
        }
        else{
            display.ShowResultsPage();
        }
    }

    const GetQuestion = () => {
        return question;
    }

    return{
        ID, Answer, GetPossableAnswers, correctAnswer, GetQuestion, answer2, answer3, answer4
    }
}

const questions = [
    Question(0 ,"Which new CSS3 feature enable the use of fonts that are not preloaded on a client PC?", "Woff", "Font-family", "SVG", "Font-tree"),
    Question(1, "Which is NOT a CSS gradient property?", "Optical-gradient", "Linear-gradient", "Repeating-radial-gradient", "Radial-gradient"),
    Question(2, "Which is the correct syntax to round a corner in CSS", "border-radius?: 15px", "border-roundness: 15px", "border: radius 15deg", "border-radius: 15"),
    Question(3, "What is the correct syntax to use a non-web safe font on your site?", "@font-face{font-family: Font Name; scr: url(link To font)}", "@font-style{src: url(Link to Font);}", ".font {font-face-scr: url(link to font)}", "All fonts must be web safe"),
    Question(4, "If you pass a negative value to the rotate() method, what is the result?", "It rotataes the element counter-clockwise", "It wont work", "It rotates the element clockwise", "It flips the elelment into the mirrored position"),
    Question(5, "To store information in Javascript, you use a: ", "Variable", "Copy", "Container", "Function"),
    Question(6, "Whats the diffrence between a global vs. local variable?", "A local variable can only be used by the function that defines it", "A local variable is avaliable to any code inside the script tags", "a global variable can only be used by the function that defines it", "A gloabl variable is trasnported ot other JavaScript programs"),
    Question(7, "What is jQuery?", "Lighweight, write less, do more JavaScript library", "A langueage specifically writen to acces databases", "Java-based query language", "A vector-graphic language"),
    Question(8, "Which of the following is NOT a JavaScript events?", "onModify()", "onClick()", "ondblClick()", "onBlur()"),
    Question(9, "Which tag helps you avoid problems if a browser does not support JavaScript?", "<!--", "<--//", "-->", "<comment>"),
]


function Display()
{
    const QuestionPage = document.getElementById("QuestionContainer");
    const StatsPage = document.getElementById("StatsPage");

    const QuestionText = document.getElementById('Question');

    const ButtonOne = document.getElementById('buttonOne');
    const ButtonTwo = document.getElementById('buttonTwo');
    const ButtonThree = document.getElementById('buttonThree');
    const ButtonFour = document.getElementById('buttonFour');

    const resultScore = document.getElementById("r_score");



    const Buttons = [ButtonOne, ButtonTwo, ButtonThree, ButtonFour];

    var currentQuestion = null;

    const initButtons = () => {
        Buttons.forEach(el =>{
            el.addEventListener('click', () => {currentQuestion.Answer(el.textContent)})
        });
    }

    initButtons();

    const SetQuestion = (question) => 
    {
        currentQuestion = question;
        QuestionText.textContent = currentQuestion.GetQuestion();

         (currentQuestion.GetQuestion())

        let buttonsToSet = [ButtonOne, ButtonTwo, ButtonThree, ButtonFour];
        var possableAnswers = currentQuestion.GetPossableAnswers();

        for(var i = 0; i < Buttons.length; i++)
        {
            let answerID = Math.floor(Math.random()*possableAnswers.length);
            buttonsToSet[0].textContent = possableAnswers[answerID];

            buttonsToSet.shift();
            possableAnswers.splice(answerID, 1);
        } 
    }

    const ShowResultsPage = () => {
        QuestionPage.style.transform = "translateY(-100vh)";
        StatsPage.style.transform = "translateY(-100vh)";

        resultScore.textContent = `Your Score: ${score.GetPercent()}`
    }

    const ShowQuiz = () => {
        QuestionPage.style.transform = "translateY(0)";
        StatsPage.style.transform = "translateY(0)";
    }

    return{
        SetQuestion, ShowResultsPage, ShowQuiz
    }
}

function ScoreObj(){
    const ScoreWrapper = document.getElementById("scoreWrapper");
    const Score = document.getElementById('score');
    const ScoreText = document.getElementById('scoreText');

    var score = 0; 
    var maxScore = questions.length; 

    let scoreWrongColor = '#ef476f';
    var scoreBaseColor = Score.style.backgroundColor;

   const Correct = () =>{
        score++; 
        setUI();
        pulseUI(500);
   }

   const Wrong = () => {
        setUI();
        flashUI(500);
   }

   //ui
   const setUI = () => {
        Score.style.width = `${(score/maxScore) * 25}vw`;
        ScoreText.textContent = `${score}/${maxScore}`;
   }

   const flashUI = (ms) => {
        //change color
        Score.style.backgroundColor = scoreWrongColor;
        setTimeout(() => {Score.style.backgroundColor = scoreBaseColor}, ms);

        //shake
        ScoreWrapper.style.transform = "translateY(-1vh)";
        setTimeout(() => {ScoreWrapper.style.transform = "translateY(0)";}, ms/6)
        setTimeout(() => {ScoreWrapper.style.transform = "translateY(-1vh)";}, ms/3)
        setTimeout(() => {ScoreWrapper.style.transform = "translateY(0)";}, ms/1.5)
   }

   const pulseUI = (ms) => {
        ScoreWrapper.style.scale = "1.1";
        setTimeout(() => {ScoreWrapper.style.scale = "1"}, ms)
   } 

   const GetPercent = () => {
    return `${(score/maxScore)*100}%`
   }

   const Reset = () => {
    score = 0;
    setUI()
    flashUI();
   }

   setUI();

   return{
    Correct, Wrong, GetPercent, Reset
   }
}

const display = Display();
const score = ScoreObj();

display.SetQuestion(questions[0]);

const restart = document.getElementById('Reset');
restart.addEventListener('click', ()=>{
    display.ShowQuiz();
    score.Reset();
    display.SetQuestion(questions[0]);
});

