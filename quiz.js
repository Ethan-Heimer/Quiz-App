const QuestionPage = document.getElementById("QuestionContainer");
const StatsPage = document.getElementById("StatsPage");

const ButtonOne = document.getElementById('buttonOne');
const ButtonTwo = document.getElementById('buttonTwo');
const ButtonThree = document.getElementById('buttonThree');
const ButtonFour = document.getElementById('buttonFour');

ButtonOne.addEventListener('click', ()=>currentQuestion.AnswerQuestion(ButtonOne.textContent));
ButtonTwo.addEventListener('click', ()=>currentQuestion.AnswerQuestion(ButtonTwo.textContent));
ButtonThree.addEventListener('click', ()=>currentQuestion.AnswerQuestion(ButtonThree.textContent));
ButtonFour.addEventListener('click', ()=>currentQuestion.AnswerQuestion(ButtonFour.textContent));

class Question{
    constructor(question, correctAnswer, answer2, answer3, answer4)
    {
        this.question = question;
        this.correctAnswer = correctAnswer; 

        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
    }
}

function QuestionObj(){
    const QuestionText = document.getElementById('Question');

    let currentQuestion = null;

    const ID = () => { return questions.indexOf(currentQuestion); }

    const SetQuestion = (question)=>{
        currentQuestion = question;

        QuestionText.textContent = (ID()+1)+ ". " + currentQuestion.question;

        //set button text (randomly)
        let buttons=[ButtonOne, ButtonTwo, ButtonThree, ButtonFour]
        let answers=[currentQuestion.correctAnswer, currentQuestion.answer2, currentQuestion.answer3, currentQuestion.answer4];

        var buttonAmount = buttons.length;

        for(let i = 0; i < buttonAmount; i++)
        {
            let answerID = Math.floor(Math.random()*answers.length);

            buttons[0].textContent = answers[answerID];

            buttons.shift();
            answers.splice(answerID, 1); //remove answer from list of possable answers
        }
    }

    const AnswerQuestion = (answer) => {
        if(answer === currentQuestion.correctAnswer){
            score.Correct();
        }
        else{
            score.Wrong();
        } 

        NextQuestion();
    }

    const NextQuestion = () => {
        let newQuestionId = ID() + 1;
    
        if (newQuestionId < questions.length) {
            SetQuestion(questions[newQuestionId]);
        }
        else{
            DisplayStatsPage()
        }
    }    

    return{
        SetQuestion, ID, AnswerQuestion
    }
}

function scoreObj(){
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

   setUI();

   return{
    Correct, Wrong
   }
}

function DisplayStatsPage()
{
    QuestionPage.style.transform = "translateY(-100vh)";
    StatsPage.style.transform="translateY(-100vh)";
}

const questions = [
    new Question("Which new CSS3 feature enable the use of fonts that are not preloaded on a client PC?", "Woff", "Font-family", "SVG", "Font-tree"),
    new Question("Which is NOT a CSS gradient property?", "Optical-gradient", "Linear-gradient", "Repeating-radial-gradient", "Radial-gradient"),
    new Question("Which is the correct syntax to round a corner in CSS", "border-radius?: 15px", "border-roundness: 15px", "border: radius 15deg", "border-radius: 15"),
    new Question("What is the correct syntax to use a non-web safe font on your site?", "@font-face{font-family: Font Name; scr: url(link To font)}", "@font-style{src: url(Link to Font);}", ".font {font-face-scr: url(link to font)}", "All fonts must be web safe"),
    new Question("If you pass a negative value to the rotate() method, what is the result?", "It rotataes the element counter-clockwise", "It wont work", "It rotates the element clockwise", "It flips the elelment into the mirrored position"),
    new Question("To store information in Javascript, you use a: ", "Variable", "Copy", "Container", "Function"),
    new Question("Whats the diffrence between a global vs. local variable?", "A local variable can only be used by the function that defines it", "A local variable is avaliable to any code inside the script tags", "a global variable can only be used by the function that defines it", "A gloabl variable is trasnported ot other JavaScript programs"),
    new Question("What is jQuery?", "Lighweight, write less, do more JavaScript library", "A langueage specifically writen to acces databases", "Java-based query language", "A vector-graphic language"),
    new Question("Which of the following is NOT a JavaScript events?", "onModify()", "onClick()", "ondblClick()", "onBlur()"),
    new Question("Which tag helps you avoid problems if a browser does not support JavaScript?", "<!--", "<--//", "-->", "<comment>"),
]

const currentQuestion = QuestionObj();
const score = scoreObj();

currentQuestion.SetQuestion(questions[0]);





