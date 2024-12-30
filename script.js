const questions = [
    {
        question: "Siapa CEO Amazon (sekarang)?",
        answers: ["Bill Gates", "Jeff Bezos", "Andy Jassy"],
        correctAnswer: 2,
        image: "assets/picture/amazon.jpeg",
        imageAlt: "Amazon CEO Now" 
    },
    {
        question: "Siapa presiden ke-35 USA? (klu: presiden ini menjabat dari tahun 1961 - 1963, parah si kalo ga tau)",
        answers: ["Richard Nixon", "JFK", "Obama"],
        correctAnswer: 1,
        image: "assets/picture/barack-obama-john-f-kennedy-richard-nixon.jpg",
        imageAlt: "Foto Presiden Obama, JFK, dan Richard Nixon"     
    },
    {
        question: "JFK dan Soekarno adalah orang yang punya pemahaman komunisme. Ketika terjadi tragedi terbunuhnya JFK dan pelengseran Soekarno yg diakibatkan oleh peristiwa G30SPKI. Nahh apa maksud dari semua itu?",
        answers: ["SAYA TAKUT DITANGKAP BANG", "Kedua Tokoh itu dianggap ancaman serius oleh El*t Global", "Parah authornya, ngasi konspirasi n cocoklogi"],
        correctAnswer: 0,
        image: "assets/picture/jfk-irsoekarno.jpg",
        imageAlt: "Foto Presiden JFK & Soekarno"    
    },
    {
        question: "Dalam pemerintahan Abraham Lincoln, beliau sangat dihormati oleh penduduk di warga negaranya. Apa yang menjadi ciri khas dari beliau?",
        answers: ["merendahkan pajak, yang penting ga nyampe 12%", "menyetarakan ras", "meningkatkan teknologi & memajukan peradaban"],
        correctAnswer: 1,
        image: "assets/picture/abraham-lincoln.jpg",
        imageAlt: "Foto Presiden Abraham Lincoln"     
    },
    {
        question: "Teori Karl Marx dicap sebagai teori yang menentang teori klasik dan dikenal dengan istilah Kapitalisme. Dari teori Karl Marx ini, siapakah pihak yang ingin di untungkan?",
        answers: ["pendeta & borjuis", "gelandangan", "buruh"],
        correctAnswer: 2,
        image: "assets/picture/karlmax.jpg",
        imageAlt: "Foto Karl" 
    },
    {
        question: "Nyatakan benar atau salah. Sinar cahaya akan membelok dalam medan gravitasi.",
        answers: ["salah", "benar"],
        correctAnswer: 1,
        image: "assets/picture/gravitational.jpg",
        imageAlt: "Foto Tentang Gravitasi" 
    },
    {
        question: "Madura adalah salah satu wilayah di negara kita. Disebut apakah wilayah dari Madura",
        answers: ["provinsi", "pulau", "kota"],
        correctAnswer: 1,
        image: "assets/picture/tretan_muslim.jpg",
        imageAlt: "Foto Tretan Muslim"     
    },
    {
        question: "Pernyataan tepat mengenai atom dan partikel penyusun atom adalah? jika ragu eleminasi yang menurut anda salah",
        answers: ["elektron bermuatan negatif tersebar dalam kulit atom", "jumlah proton pada setiap atom lebih banyak dari jumlah elektron", "neutron terletak pada kulit atom dan bergerak mengelilingi proton"],
        correctAnswer: 0,
        image: "assets/picture/atom.jpeg",
        imageAlt: "Foto Atom dan Partikel Penyusunnya"     
    },
    {
        question: "Pada 12 September 1984 terjadi Peristiwa Tanjung Priok yang menelan korban lebih dari 200 orang. Sampai sekarang pemerintah seakan menutup mata dan tidak mengakui kalo itu adalah pelanggaran HAM. Menurut anda apa itu tergolong pelanggaran atau tidak? (ini bukan propaganda tetapi author hanya mengungkap fakta yg terjadi)",
        answers: ["ya", "tidak", "ragu, takut besok saya ditangkap"],
        correctAnswer: 0,
        image: "assets/picture/tanjung_priok.jpg",
        imageAlt: "Foto Gatau"     
    },
    {
        question: "Zaman Paleolitikum atau zaman batu tua berlangsung sekitar 2,5 Juta tahun yang lalu. Zaman ini merupakan zaman paling awal dari zaman batu, dimana manusia purba menggunakan batu sebagai alat (pokoknya disini kalian punya batu kalian punya kuasa). Zaman Paleolitikum kemudian digantikan oleh zaman? (Author mengklasifikasi zaman batu ada 3, terdapat juga pengklasifikasian zaman batu itu 2 tetapi pada soal ini author lebih memilih yang 3)",
        answers: ["Neolitikum(Zaman Batu Muda)", "Mesolitikum (Zaman Batu Pertengahan)"],
        correctAnswer: 1,
        image: "assets/picture/zaman_batu.jpg",
        imageAlt: "Foto Jaman Batu"     
    },
];

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const analisisElement = document.getElementById('analisis');
const imageContainer = document.getElementById("image-container");

const submitButton = document.getElementById('submit');
const startButton = document.getElementById("start-button")
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');

const shuffledQuestions = shuffleQuestions(questions);

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

//set waktunya disini
let timeRemaining = 30;
let timerInterval;

function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    timeRemaining = 30;
    shuffleQuestions(questions);
    loadQuestion();
    startTimer();
    startButton.style.display = "none";
}


function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;

    answersElement.innerHTML = '';
    imageContainer.innerHTML = '';

    if (question.image) {
        const imgElement = document.createElement("img");
        imgElement.style.width = "300px";
        imgElement.style.marginTop = "2rem";
        imgElement.src = question.image;
        imgElement.alt = question.imageAlt;
        imageContainer.appendChild(imgElement);
    }

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => {
            checkAnswer(index);
        });
        answersElement.appendChild(button);
    });
}

function shuffleQuestions(questions) {
    return questions.sort(() => Math.random() - 0.5);
  }

function startTimer() {
    timerInterval = setInterval(() => {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        checkAnswer(-1);
      } else {
        document.getElementById('timer').textContent = `Waktu tersisa: ${timeRemaining} detik`;
      }
    }, 1000);
  }

function checkAnswer(selected) {
    clearInterval(timerInterval);
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selected === correctAnswer) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        timeRemaining = 30;
        loadQuestion();
        startTimer();
    } else {
        showResults();
        hideAll();
    }
}

function showResults() {
    resultElement.textContent = `Anda mendapatkan skor: ${score}0, dari total pertanyaan: ${questions.length}`;
    if(score > 8){
        analisisElement.textContent =  "GG ABANGKUU, Keep learning bang.";
    } else if(score > 5){
        analisisElement.textContent = "Not bad, don't afraid to learn something new abangkuuu";
    }
     else {
        analisisElement.textContent =  "Belajar lagi ya dek ya...";
    }
    hideAll();
}

function hideAll() {
    questionElement.style.display = 'none';
    answersElement.style.display = 'none';

    const imageContainer = document.getElementById("image-container");
    if (imageContainer) {
        imageContainer.innerHTML = '';
      }
    
    const timerContainer = document.getElementById('timer-container');
    timerContainer.style.display = 'none';

    const restart = document.getElementById('restart');
    restart.style.display = 'none';
}

startButton.addEventListener("click", startQuiz);

// shuffleQuestions(questions);
// loadQuestion();
// startTimer();
