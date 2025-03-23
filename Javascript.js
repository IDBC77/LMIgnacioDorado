// Array de preguntas con opciones y respuestas correctas
const questions = [
    {
        question: "¿Qué significa HTML?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Home Text Markup Language"],
        answer: 0
    },
    {
        question: "¿Qué es un archivo XML?",
        options: ["Un lenguaje de programación", "Un lenguaje de marcado", "Un sistema operativo"],
        answer: 1
    },
    {
        question: "¿Cuál es la función de las etiquetas en HTML?",
        options: ["Dar formato a la página", "Describir el contenido de la página", "Conectar con bases de datos"],
        answer: 1
    },
    {
        question: "¿Qué es un DOCTYPE?",
        options: ["Especifica el tipo de documento", "Es una etiqueta HTML", "Es un lenguaje de programación"],
        answer: 0
    },
    {
        question: "¿Qué es un archivo XSL?",
        options: ["Un tipo de base de datos", "Una hoja de estilo para XML", "Un lenguaje de programación"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answering = false; // Para controlar si se está respondiendo una pregunta

// Inicializar el cuestionario
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Mostrar la pregunta
    document.getElementById("question-container").innerHTML = `<p class="text-xl font-semibold">${currentQuestion.question}</p>`;

    // Mostrar opciones
    let optionsHtml = '';
    currentQuestion.options.forEach((option, index) => {
        optionsHtml += `<button class="option bg-gray-200 hover:bg-blue-300 px-4 py-2 my-2 rounded w-full" data-index="${index}">${option}</button>`;
    });
    document.getElementById("options-container").innerHTML = optionsHtml;

    // Mostrar contador de preguntas
    document.getElementById("counter").innerHTML = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

    // Deshabilitar el botón de "Siguiente" hasta que se seleccione una respuesta
    document.getElementById("next-button").disabled = true;

    // Agregar evento a las opciones
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', checkAnswer);
    });
}

// Verificar si la respuesta es correcta
function checkAnswer(e) {
    const selectedOption = parseInt(e.target.getAttribute("data-index"));
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    if (selectedOption === correctAnswer) {
        score++;
    }

    // Habilitar el botón de "Siguiente" después de seleccionar una respuesta
    document.getElementById("next-button").disabled = false;

    // Desactivar la opción de respuesta para no hacer clic nuevamente
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true;
    });

    answering = true; // Indicar que se ha respondido la pregunta
}

// Mostrar el resultado final
function showResult() {
    document.getElementById("quiz-container").innerHTML = `
        <p class="text-2xl font-bold">Has completado el cuestionario</p>
        <p class="text-lg">Tu puntaje es: ${score} de ${questions.length}</p>
    `;
}

// Lógica para manejar el clic en el botón "Siguiente"
document.getElementById("next-button").addEventListener('click', function() {
    if (answering) {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();  // Cargar la siguiente pregunta
        } else {
            showResult();  // Si ya no hay más preguntas, mostrar el resultado
        }

        answering = false;  // Reseteamos la bandera
    }
});

// Inicializar el cuestionario al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    loadQuestion();
});
