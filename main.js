// Definir las preguntas y respuestas del cuestionario
const questions = [
    {
        question: "¿Qué significa HTML?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Home Text Markup Language"],
        correctAnswer: 0
    },
    {
        question: "¿Qué es un archivo XML?",
        options: ["Un lenguaje de programación", "Un lenguaje de marcado", "Un sistema operativo"],
        correctAnswer: 1
    },
    {
        question: "¿Cuál es la función de las etiquetas en HTML?",
        options: ["Dar formato a la página", "Describir el contenido de la página", "Conectar con bases de datos"],
        correctAnswer: 1
    },
    {
        question: "¿Qué es un DOCTYPE?",
        options: ["Especifica el tipo de documento", "Es una etiqueta HTML", "Es un lenguaje de programación"],
        correctAnswer: 0
    },
    {
        question: "¿Qué es un archivo XSL?",
        options: ["Un tipo de base de datos", "Una hoja de estilo para XML", "Un lenguaje de programación"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Función para cargar la pregunta actual
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionContainer = document.getElementById("questionContainer");

    // Limpiar las respuestas previas
    questionContainer.innerHTML = `
        <h3 class="text-xl mb-4">${currentQuestion.question}</h3>
        <div>
            ${currentQuestion.options.map((option, index) => `
                <label class="block">
                    <input type="radio" name="answer" value="${index}" class="mr-2">
                    ${option}
                </label>
            `).join('')}
        </div>
    `;

    // Actualizar el contador de preguntas
    document.getElementById("questionCounter").innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
}

// Función para validar la respuesta
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const selectedValue = parseInt(selectedAnswer.value);
        if (selectedValue === questions[currentQuestionIndex].correctAnswer) {
            score++;
        }
    }
}

// Función para avanzar a la siguiente pregunta
function nextQuestion() {
    checkAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// Función para finalizar el cuestionario
function endQuiz() {
    const quizContainer = document.getElementById("quizContainer");

    // Mostrar el resultado
    quizContainer.innerHTML = `
        <h2 class="text-2xl font-semibold mb-6">¡Fin del Cuestionario!</h2>
        <p class="text-lg mb-4">Tu puntuación es ${score} de ${questions.length}</p>
        <button id="restartBtn" class="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">Reiniciar Cuestionario</button>
    `;

    // Añadir el evento para reiniciar el cuestionario
    document.getElementById("restartBtn").addEventListener("click", restartQuiz);
}

// Función para reiniciar el cuestionario
function restartQuiz() {
    // Restablecer puntuación e índice
    score = 0;
    currentQuestionIndex = 0;

    // Limpiar respuestas seleccionadas (si hay)
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(button => button.checked = false);

    // Ocultar el botón de reinicio y mostrar el cuestionario nuevamente
    document.getElementById("quizContainer").classList.remove("hidden");
    document.getElementById("startQuizBtn").style.display = "none";  // Ocultar el botón de "Iniciar Cuestionario"
    
    // Limpiar el contenedor de resultados
    document.getElementById("quizContainer").innerHTML = `
        <h2 class="text-2xl font-semibold mb-6">Cuestionario sobre Lenguajes de Marcas</h2>
        <div id="questionContainer" class="mb-6"></div>
        <div class="flex justify-between items-center">
            <button id="nextBtn" class="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Siguiente</button>
            <p id="questionCounter" class="text-lg">Pregunta 1 de 5</p>
        </div>
    `;
    
    // Cargar la primera pregunta
    loadQuestion();

    // Rehabilitar el botón "Siguiente"
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
}

// Manejo del botón de inicio del cuestionario
document.getElementById("startQuizBtn").addEventListener("click", function() {
    document.getElementById("quizContainer").classList.remove("hidden");
    document.getElementById("startQuizBtn").style.display = "none";
    loadQuestion();
});

// Manejo del botón siguiente
document.getElementById("nextBtn").addEventListener("click", nextQuestion);
