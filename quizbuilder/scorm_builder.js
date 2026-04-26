// --- Global State & Init ---
let questionCount = 0;

$(document).ready(function() {
    // Bind Global Navbar Events
    $('#btnSaveLocal').click(saveToLocal);
    $('#btnExportJSON').click(exportJSON);
    $('#btnAddQuestion').click(function() { addQuestion(); });
    $('#btnGenerate').click(generateScormPackage);
    $('#importFile').change(function() { importJSON(this); });
    
    // Bind "Create your first question" button (fixes ReferenceError)
    $('#btnCreateFirst').click(function() { addQuestion(); });

    // Global Event Delegation for Dynamic "Delete Question" buttons
    $(document).on('click', '.delete-q-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const id = $(this).closest('.question-card').attr('data-id');
        deleteQuestion(id);
    });

    // Initialize Instructions Editor
    setTimeout(function() {
        initSummernote($('#courseInstructions'), 200, 'Enter course instructions...');
    }, 100);

    // Check for local storage on load
    if(localStorage.getItem('scormBuilderData')) {
        $('#startupModal').removeClass('hidden');
        
        $('#btnLoadLocal').click(function() {
            loadFromLocal();
            $('#startupModal').addClass('hidden');
        });
        
        $('#btnStartNew').click(function() {
            addQuestion();
            $('#startupModal').addClass('hidden');
        });
    } else {
        addQuestion(); 
    }
});

// --- Editor Logic & Custom Buttons ---

// Custom Audio Button
function getAudioButton(context) {
    var ui = $.summernote.ui;
    var button = ui.button({
        contents: '<i class="fas fa-music"></i>',
        tooltip: 'Insert Audio',
        click: function () {
            var url = prompt('Enter Audio URL (e.g., https://example.com/sound.mp3):');
            if (url) {
                const audioHtml = `<div class="my-2"><audio controls src="${url}" style="width: 100%; max-width: 300px;"></audio></div><p><br></p>`;
                context.invoke('editor.pasteHTML', audioHtml);
            }
        }
    });
    return button.render();
}

function initSummernote($el, height, placeholder) {
    $el.summernote({
        placeholder: placeholder,
        height: height,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture', 'video', 'audio']], // 'audio' triggers custom button
            ['view', ['codeview', 'help']]
        ],
        buttons: {
            audio: getAudioButton
        }
    });
}

// --- Core App Logic ---

function addQuestion(data = null) {
    questionCount++;
    $('#emptyState').hide();
    
    const template = document.getElementById('questionTemplate');
    const clone = template.content.cloneNode(true);
    const $card = $(clone).find('.question-card');
    
    const uniqueId = data ? data.id : Date.now() + Math.floor(Math.random() * 100000);
    
    $card.attr('data-id', uniqueId);
    
    // Append to DOM (hidden initially)
    $('#questionsContainer').append($card);
    
    // Add Navigator Item
    const navItem = `
        <div class="nav-item p-3 border-l-4 border-transparent cursor-pointer rounded-r text-sm font-medium text-gray-600" data-target="${uniqueId}" onclick="activateQuestion(${uniqueId})">
            <div class="flex justify-between items-center">
                <span>Question <span class="nav-number"></span></span>
                <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-50"></i>
            </div>
        </div>
    `;
    $('#questionNavigator').append(navItem);

    // Populate Data if exists
    if (data) {
        $card.find('.q-text').val(data.text);
        $card.find('.q-attempts').val(data.attempts);
        $card.find('.q-feedback-correct').val(data.feedbackCorrect);
        $card.find('.q-feedback-incorrect').val(data.feedbackIncorrect);
        
        data.answers.forEach(ans => {
            addAnswer($card.find('.answers-list'), ans.isCorrect, ans.text);
        });
    } else {
        addAnswer($card.find('.answers-list'), true); 
        addAnswer($card.find('.answers-list'), false); 
    }
    
    activateQuestion(uniqueId);

    // Initialize Editors
    setTimeout(function() {
        initSummernote($card.find('.q-text'), 150, 'Enter question text here...');
        initSummernote($card.find('.q-feedback-correct'), 80, 'Feedback for correct answer...');
        initSummernote($card.find('.q-feedback-incorrect'), 80, 'Feedback for incorrect answer...');
        
        if(data) {
            $card.find('.q-text').summernote('code', data.text);
            $card.find('.q-feedback-correct').summernote('code', data.feedbackCorrect);
            $card.find('.q-feedback-incorrect').summernote('code', data.feedbackIncorrect);
        }
    }, 50);
    
    $card.find('.add-answer-btn').off('click').on('click', function() {
        addAnswer($card.find('.answers-list'));
    });

    renumberQuestions();
}

function activateQuestion(id) {
    $('.question-card').hide();
    $(`.question-card[data-id="${id}"]`).show();
    $('.nav-item').removeClass('active bg-blue-50 border-blue-600 text-blue-700');
    $(`.nav-item[data-target="${id}"]`).addClass('active');

    if ($('.question-card').length === 0) {
        $('#emptyState').show();
    } else {
        $('#emptyState').hide();
    }
}

function deleteQuestion(id) {
    if(!confirm('Are you sure you want to delete this question?')) return;

    const $card = $(`.question-card[data-id="${id}"]`);
    const $navItem = $(`.nav-item[data-target="${id}"]`);
    
    const isActive = $navItem.hasClass('active');
    
    // Destroy editors
    $card.find('textarea').summernote('destroy');

    $card.remove();
    $navItem.remove();

    renumberQuestions();

    if(isActive) {
        const remaining = $('.nav-item');
        if(remaining.length > 0) {
            const nextId = $(remaining[0]).attr('data-target');
            activateQuestion(nextId);
        } else {
            $('#emptyState').show();
        }
    }
    showToast("Question deleted.");
}

function renumberQuestions() {
    const cards = $('.question-card');
    $('#questionCountBadge').text(cards.length);

    cards.each(function(index) {
        $(this).find('.q-number').text(index + 1);
    });

    $('.nav-item').each(function(index) {
        $(this).find('.nav-number').text(index + 1);
    });
}

function addAnswer($container, isCorrect = false, textContent = '') {
    const groupName = $container.closest('.question-card').attr('data-id');
    
    const html = `
        <div class="answer-row bg-white p-3 rounded border border-gray-200 relative group shadow-sm hover:shadow-md transition">
            <div class="flex justify-between items-center mb-2 border-b pb-2 border-gray-100">
                <label class="flex items-center space-x-2 cursor-pointer select-none">
                    <input type="radio" name="correct_${groupName}" class="w-5 h-5 text-blue-600 a-correct focus:ring-blue-500" ${isCorrect ? 'checked' : ''}>
                    <span class="font-bold text-sm text-gray-700">Correct Answer</span>
                </label>
                <button class="text-gray-400 hover:text-red-500 delete-ans-btn text-xs font-semibold uppercase"><i class="fas fa-times"></i> Remove</button>
            </div>
            <textarea class="a-text w-full">${textContent}</textarea>
        </div>
    `;
    $container.append(html);

    const $newRow = $container.find('.answer-row').last();
    
    setTimeout(function() {
        initSummernote($newRow.find('.a-text'), 80, 'Enter answer option...');
        if(textContent) {
            $newRow.find('.a-text').summernote('code', textContent);
        }
    }, 50);

    $newRow.find('.delete-ans-btn').click(function() {
        $newRow.find('.a-text').summernote('destroy');
        $newRow.remove();
    });
}

function showToast(message) {
    const toast = $(`<div class="toast show">${message}</div>`);
    $('#toast-container').append(toast);
    setTimeout(() => {
        toast.removeClass('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Data Management ---

function getCourseData() {
    const courseData = {
        title: $('#courseTitle').val() || "Quiz",
        passingScore: parseInt($('#passingScore').val()) || 80,
        // Get instructions from Summernote
        instructions: $('#courseInstructions').summernote('code'),
        questions: []
    };

    $('.question-card').each(function() {
        const $q = $(this);
        
        const qData = {
            id: $q.attr('data-id'),
            text: $q.find('.q-text').summernote('code'),
            attempts: parseInt($q.find('.q-attempts').val()) || 1,
            feedbackCorrect: $q.find('.q-feedback-correct').summernote('code'),
            feedbackIncorrect: $q.find('.q-feedback-incorrect').summernote('code'),
            answers: []
        };

        $q.find('.answer-row').each(function() {
            qData.answers.push({
                text: $(this).find('.a-text').summernote('code'),
                isCorrect: $(this).find('.a-correct').is(':checked')
            });
        });
        
        courseData.questions.push(qData);
    });
    return courseData;
}

function rebuildUIFromData(data) {
    // Cleanup all editors (including instructions)
    $('.question-card textarea, #courseInstructions').each(function() {
        $(this).summernote('destroy');
    });

    $('.question-card').remove();
    $('#questionNavigator').empty();
    questionCount = 0;

    $('#courseTitle').val(data.title);
    $('#passingScore').val(data.passingScore);
    
    // Set Instructions content and re-init
    $('#courseInstructions').val(data.instructions); 
    initSummernote($('#courseInstructions'), 200, 'Enter course instructions...');
    // Explicitly set code to handle HTML content
    $('#courseInstructions').summernote('code', data.instructions);

    if (data.questions && data.questions.length > 0) {
        data.questions.forEach(q => addQuestion(q));
    } else {
        addQuestion();
    }
}

// --- IO Operations ---

function importJSON(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                rebuildUIFromData(data);
                input.value = ''; 
                showToast("Course loaded successfully.");
            } catch(err) {
                alert("Error parsing JSON file: " + err);
            }
        };
        reader.readAsText(input.files[0]);
    }
}

function saveToLocal() {
    const data = getCourseData();
    localStorage.setItem('scormBuilderData', JSON.stringify(data));
    showToast("Progress saved to browser.");
}

function loadFromLocal() {
    const json = localStorage.getItem('scormBuilderData');
    if(json) {
        const data = JSON.parse(json);
        rebuildUIFromData(data);
        showToast("Course loaded.");
    } else {
        alert("No saved data found.");
    }
}

function exportJSON() {
    const data = getCourseData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], {type: "application/json;charset=utf-8"});
    saveAs(blob, (data.title || "quiz") + ".json");
}

// --- SCORM Generator ---

async function generateScormPackage() {
    const zip = new JSZip();
    const courseData = getCourseData();

    if(courseData.questions.length === 0) {
        alert("Please add at least one question.");
        return;
    }

    let isValid = true;
    courseData.questions.forEach((q, idx) => {
        if(q.answers.length === 0) isValid = false;
    });

    if(!isValid) {
        alert("Every question needs at least one answer option.");
        return;
    }

    const playerHTML = generatePlayerHTML(courseData);
    const manifestXML = generateManifest(courseData.title);

    zip.file("index.html", playerHTML);
    zip.file("imsmanifest.xml", manifestXML);
    zip.file("scorm_api.js", getScormAPIWrapper());

    const content = await zip.generateAsync({type:"blob"});
    saveAs(content, "scorm_package.zip");
}

function generateManifest(title) {
    return `<?xml version="1.0" standalone="no" ?>
<manifest identifier="com.scorm.manifest.${Date.now()}" version="1"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.imsproject.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="default_org">
    <organization identifier="default_org">
      <title>${title.replace(/&/g, '&amp;')}</title>
      <item identifier="item_1" identifierref="resource_1">
        <title>${title.replace(/&/g, '&amp;')}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="resource_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="scorm_api.js"/>
    </resource>
  </resources>
</manifest>`;
}

function getScormAPIWrapper() {
    return `
var scorm = {
    connection: null,
    init: function() {
        var findAPITries = 0;
        var win = window;
        while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
            findAPITries++;
            if (findAPITries > 7) { 
                console.error("Error finding API -- too deeply nested.");
                return false;
            }
            win = win.parent;
        }
        this.connection = win.API;
        
        if(this.connection) {
            this.connection.LMSInitialize("");
            this.connection.LMSSetValue("cmi.core.lesson_status", "incomplete");
            this.connection.LMSCommit("");
            return true;
        } else {
            console.warn("SCORM API not found - running in standalone mode.");
            return false;
        }
    },
    setScore: function(score) {
        if(this.connection) {
            this.connection.LMSSetValue("cmi.core.score.raw", score);
            this.connection.LMSCommit("");
        }
    },
    setStatus: function(status) { 
        if(this.connection) {
            this.connection.LMSSetValue("cmi.core.lesson_status", status);
            this.connection.LMSCommit("");
        }
    },
    finish: function() {
        if(this.connection) {
            this.connection.LMSFinish("");
        }
    }
};`;
}

function generatePlayerHTML(data) {
    // SAFE STRINGIFY: Escape closing script tags to prevent breaking the HTML parser
    const dataString = JSON.stringify(data).replace(/<\/script>/g, '<\\/script>');
    
    // We break up the closing script tag string in the return template to ensure the
    // browser doesn't interpret it as the end of the builder's script block.
    const closingScriptTag = '<' + '/script>';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f9f9f9; margin: 0; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #2563eb; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .btn { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px; margin-top: 10px; }
        .btn:hover { background: #1d4ed8; }
        .btn:disabled { background: #cbd5e1; cursor: not-allowed; }
        .question-container { display: none; margin-top: 20px; animation: fadeIn 0.5s; }
        .option-label { display: flex; align-items: flex-start; margin: 10px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px; cursor: pointer; transition: background 0.2s; }
        .option-label:hover { background: #eff6ff; }
        .option-label input { margin-top: 6px; margin-right: 15px; transform: scale(1.2); }
        .option-content { flex: 1; }
        .option-content img { max-width: 100%; height: auto; }
        
        .question-text { font-size: 1.1em; margin-bottom: 20px; }
        .question-text img { max-width: 100%; height: auto; }
        
        .feedback { margin-top: 15px; padding: 15px; border-radius: 5px; display: none; }
        .feedback img { max-width: 100%; height: auto; }
        .feedback.correct { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .feedback.incorrect { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
        
        .summary-item { padding: 10px; border-bottom: 1px solid #eee; }
        .summary-correct { color: green; font-weight: bold; }
        .summary-wrong { color: red; font-weight: bold; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
    <script src="scorm_api.js">${closingScriptTag}
</head>
<body>

<div class="container">
    <h1 id="courseTitle"></h1>
    <div id="introScreen">
        <div id="instructions" style="margin-bottom: 20px; white-space: pre-wrap;"></div>
        <button class="btn" onclick="startQuiz()">Start Quiz</button>
    </div>

    <div id="quizArea"></div>

    <div id="resultsScreen" style="display:none;">
        <h2>Quiz Complete</h2>
        <p>Your Score: <span id="finalScore" style="font-weight:bold; font-size: 1.2em;"></span>%</p>
        <p>Status: <span id="passFailStatus"></span></p>
        <div id="reviewArea" style="margin-top: 20px; border-top: 2px solid #eee; padding-top:10px;">
            <h3>Review</h3>
            <div id="questionBreakdown"></div>
        </div>
        <button class="btn" onclick="window.close(); scorm.finish();">Exit Course</button>
    </div>
</div>

<script>
    const courseData = ${dataString};
    let currentQIndex = 0;
    let score = 0;
    let userAnswers = []; 
    let questionState = {}; 

    window.onload = function() {
        document.title = courseData.title;
        document.getElementById('courseTitle').innerText = courseData.title;
        // Inject HTML for instructions to allow rich text/images/video
        document.getElementById('instructions').innerHTML = courseData.instructions;
        courseData.questions.forEach(q => { questionState[q.id] = q.attempts; });
        scorm.init();
    };

    function startQuiz() {
        document.getElementById('introScreen').style.display = 'none';
        renderQuestion(0);
    }

    function renderQuestion(index) {
        if(index >= courseData.questions.length) {
            showResults();
            return;
        }

        currentQIndex = index;
        const q = courseData.questions[index];
        const container = document.getElementById('quizArea');
        container.innerHTML = ''; 

        const qDiv = document.createElement('div');
        qDiv.className = 'question-container';
        qDiv.style.display = 'block';

        let html = \`
            <div style="margin-bottom: 10px; font-weight:bold; color:#666;">Question \${index + 1} of \${courseData.questions.length}</div>
            <div class="question-text">\${q.text}</div>
            <div id="options-\${q.id}">\`;

        q.answers.forEach((ans, i) => {
            html += \`
                <label class="option-label">
                    <input type="radio" name="q_\${q.id}" value="\${i}"> 
                    <div class="option-content">\${ans.text}</div>
                </label>\`;
        });

        html += \`</div>
            <div id="feedback-\${q.id}" class="feedback"></div>
            <button id="submitBtn" class="btn" onclick="submitAnswer()">Submit Answer</button>
            <button id="nextBtn" class="btn" style="display:none;" onclick="nextQuestion()">Next Question &rarr;</button>
        \`;

        qDiv.innerHTML = html;
        container.appendChild(qDiv);
    }

    function submitAnswer() {
        const q = courseData.questions[currentQIndex];
        const selected = document.querySelector(\`input[name="q_\${q.id}"]:checked\`);
        const feedbackEl = document.getElementById(\`feedback-\${q.id}\`);
        const submitBtn = document.getElementById('submitBtn');
        const nextBtn = document.getElementById('nextBtn');
        const optionsDiv = document.getElementById(\`options-\${q.id}\`);

        if(!selected) {
            alert("Please select an answer.");
            return;
        }

        const answerIndex = parseInt(selected.value);
        const isCorrect = q.answers[answerIndex].isCorrect;

        if(isCorrect) {
            feedbackEl.className = 'feedback correct';
            feedbackEl.innerHTML = q.feedbackCorrect;
            feedbackEl.style.display = 'block';
            disableInputs(optionsDiv);
            submitBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
            userAnswers.push({ qIndex: currentQIndex, isCorrect: true, qText: q.text });

        } else {
            questionState[q.id]--;
            feedbackEl.className = 'feedback incorrect';
            feedbackEl.style.display = 'block';
            
            if(questionState[q.id] > 0) {
                feedbackEl.innerHTML = q.feedbackIncorrect + "<div style='margin-top:10px; font-weight:bold;'>Try again. Attempts remaining: " + questionState[q.id] + "</div>";
            } else {
                feedbackEl.innerHTML = q.feedbackIncorrect + "<div style='margin-top:10px; font-weight:bold;'>No attempts remaining.</div>";
                disableInputs(optionsDiv);
                submitBtn.style.display = 'none';
                nextBtn.style.display = 'inline-block';
                userAnswers.push({ qIndex: currentQIndex, isCorrect: false, qText: q.text });
            }
        }
    }

    function disableInputs(container) {
        const inputs = container.querySelectorAll('input');
        inputs.forEach(input => input.disabled = true);
    }

    function nextQuestion() {
        renderQuestion(currentQIndex + 1);
    }

    function showResults() {
        document.getElementById('quizArea').style.display = 'none';
        const resultsDiv = document.getElementById('resultsScreen');
        resultsDiv.style.display = 'block';

        const correctCount = userAnswers.filter(a => a.isCorrect).length;
        const total = courseData.questions.length;
        const finalScore = Math.round((correctCount / total) * 100);

        document.getElementById('finalScore').innerText = finalScore;
        scorm.setScore(finalScore);
        
        let status = "failed";
        const statusEl = document.getElementById('passFailStatus');
        if(finalScore >= courseData.passingScore) {
            status = "passed";
            statusEl.innerText = "Passed";
            statusEl.style.color = "green";
            statusEl.style.fontWeight = "bold";
        } else {
            statusEl.innerText = "Did not pass";
            statusEl.style.color = "red";
        }
        scorm.setStatus(status);

        const breakdown = document.getElementById('questionBreakdown');
        let reviewHtml = '';
        userAnswers.forEach((ans, i) => {
            reviewHtml += \`
                <div class="summary-item">
                    <span style="font-size:0.9em; color:#888;">Q\${ans.qIndex + 1}:</span> 
                    <div style="margin-bottom:5px;">\${ans.qText}</div>
                    \${ans.isCorrect ? '<span class="summary-correct"><i class="fas fa-check"></i> Correct</span>' : '<span class="summary-wrong"><i class="fas fa-times"></i> Incorrect</span>'}
                </div>
            \`;
        });
        breakdown.innerHTML = reviewHtml;
    }
${closingScriptTag}
</body>
</html>`;
}