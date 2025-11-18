// Business Assessment System
console.log('🔍 Assessment System Loading...');

// Assessment Questions Database
const assessmentQuestions = {
    risks: [
        {
            id: 'risk_1',
            question: 'Do you continually assess risks in the business that may affect the ability of the QMS to achieve its intended purpose?',
            weight: 4
        },
        {
            id: 'risk_2',
            question: 'Have you considered both international and external issues that may impact the ability of the business to to achieve the intended purpose of your QMS?',
            weight: 3
        },
        {
            id: 'risk_3',
            question: 'Have you addressed the risks and opportunities in order to provide assurance that your QMS can achieve its intended purpose?',
            weight: 2
        },
        {
            id: 'risk_4',
            question: 'Have you planned the actions to address these risks and opportunities?',
            weight: 3
        },
        {
            id: 'risk_5',
            question: 'Are the actions integrated into the QMS, fully implented and evaluated for effectiveness?',
            weight: 2
        }
    ],
    business: [
        {
            id: 'bus_1',
            question: 'Have you systematically defined and do you manage each process and its interactions so as to achieve the inteded results in accordance with both the policy and strategic direction of the busines?',
            weight: 4
        },
        {
            id: 'bus_2',
            question: 'Do you understand the context of your business and what the needs and expectations are of your interested parties?',
            weight: 3
        }
    ],
    leadership: [
        {
            id: 'lead_1',
            question: 'Have you identified your leadership commitment, including your quality policy to guide your QMS?',
            weight: 4
        },
        {
            id: 'lead_2',
            question: 'Have you identified the roles, responsibilites and authorities required for your QMS?',
            weight: 4
        },
        {
            id: 'lead_3',
            question: 'Have you defined the objectives for improving your products or services, processes, structure and management system?',
            weight: 3
        }
    ],
    resources: [
        {
            id: 'res_1',
            question: 'Are there processes for identifying and assigning resources and identifying competencies needed for the tasks and activities?',
            weight: 4
        },
        {
            id: 'res_2',
            question: 'Is communication of policies and strategy, with relevant objectives, carried out effectively?',
            weight: 4
        },
        {
            id: 'res_3',
            question: 'Is the documented information you created sufficient to ensure that the quality management system is suitable, adequate and effective for its purpose?',
            weight: 4
        }
    ],
    operations: [
        {
            id: 'ops_1',
            question: 'Have you established the necessary controls to ensure that the business processes can function in such a way that does not adversely affect products or services?',
            weight: 4
        },
        {
            id: 'ops_2',
            question: 'Iss the necessary corrective action taken when operation controls (processes, procedures, etc.) are not followed?',
            weight: 4
        },
        {
            id: 'ops_3',
            question: "Have you determined what would constitute an operational control being 'out of control'?",
            weight: 3
        }

    ],

    strategy: [
        {
            id: 'strat_1',
            question: 'Do you have a programme of internal audits, which will systematically review the processes of the QMS to validate that they are meeting the planned arrangements that are set out for them?',
            weight: 3
        },
        {
            id: 'strat_2',
            question: 'Do you review the information collected related to the performance and effectiveness of the QMS? (This is called management review)',
            weight: 4
        },
        {
            id: 'strat_3',
            question: 'Do you effectively manage any nonconformity and corrective action in order to fix problems found during performance evaluation?',
            weight: 3
        },
        {
            id: 'strat_4',
            question: 'Do you ensure that the information gathered is used to make necessary positive adjustments to QMS? (e.g. if a target has been met, then a new target can be chosen. If there are problems reaching a target, then the resources for the program can be reviewed and adjustments made)',
            weight: 4
        }
    ]
};

// Category order for sequential flow
const categoryOrder = ['risks', 'business', 'leadership', 'resources', 'operations', 'strategy'];

// Assessment State
let currentAssessment = {
    category: null,
    categoryIndex: 0,
    unlockedIndex: 0, // highest unlocked category index (0 = first)
    completedCategories: {},
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    userInfo: {}
};

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

// Initialize Supabase if credentials are available
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase initialized for assessments');
    } catch (error) {
        console.warn('⚠️ Supabase initialization failed:', error);
    }
}

// DOM Elements
const assessmentCategories = document.getElementById('assessment-categories');
const assessmentFormSection = document.getElementById('assessment-form-section');
const emailCollectionSection = document.getElementById('email-collection-section');
const resultsSection = document.getElementById('results-section');

// Initialize Assessment System
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Assessment System Initialized');
    initializeAssessmentSystem();
});

function initializeAssessmentSystem() {
    // Single universal start button under categories
    const startAllBtn = document.getElementById('start-all-assessment');
    if (startAllBtn) {
        startAllBtn.addEventListener('click', function() {
            // disable the start button once started
            startAllBtn.disabled = true;
            startAllBtn.classList.add('started');
            // Start with the first category in order
            startAssessment(categoryOrder[0]);
        });
    }

    // Back to categories button
    const backBtn = document.getElementById('back-to-categories');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            showSection('assessment-categories');
            resetAssessment();
        });
    }

    // Navigation buttons
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', previousQuestion);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }

    // Email collection form
    const emailForm = document.getElementById('email-collection-form');
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSubmission);
    }

    // Results actions
    const downloadBtn = document.getElementById('download-results');
    const takeAnotherBtn = document.getElementById('take-another-assessment');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResults);
    }
    
    if (takeAnotherBtn) {
        takeAnotherBtn.addEventListener('click', function() {
            showSection('assessment-categories');
            resetAssessment();
        });
    }

    console.log('✅ Assessment system event listeners initialized');
}

function startAssessment(category) {
    console.log(`🎯 Starting ${category} assessment`);

    const idx = categoryOrder.indexOf(category);
    if (idx === -1) return;

    // Prevent starting categories that are locked
    if (idx > currentAssessment.unlockedIndex) {
        alert('Please complete previous categories first.');
        return;
    }

    // Set current category index and questions (keep cumulative answers)
    currentAssessment.category = category;
    currentAssessment.categoryIndex = idx;
    currentAssessment.questions = [...assessmentQuestions[category]];
    currentAssessment.currentQuestionIndex = 0;

    // Update UI
    document.getElementById('assessment-category-title').textContent = getCategoryDisplayName(category);
    document.getElementById('total-questions').textContent = currentAssessment.questions.length;

    // Load first question
    loadQuestion(0);
    updateProgress();

    // Show assessment form
    showSection('assessment-form-section');
}

function loadQuestion(index) {
    const question = currentAssessment.questions[index];
    const questionContainer = document.getElementById('question-container');
    
    questionContainer.innerHTML = `
        <div class="question-card active">
            <div class="question-number">Question ${index + 1} of ${currentAssessment.questions.length}</div>
            <div class="question-text">${question.question}</div>
            <div class="answer-options">
                <div class="answer-option">
                    <input type="radio" id="${question.id}_yes" name="${question.id}" value="yes">
                    <label for="${question.id}_yes">
                        <div class="answer-icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <span>Yes</span>
                    </label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="${question.id}_no" name="${question.id}" value="no">
                    <label for="${question.id}_no">
                        <div class="answer-icon">
                            <i class="fas fa-times"></i>
                        </div>
                        <span>No</span>
                    </label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="${question.id}_unsure" name="${question.id}" value="unsure">
                    <label for="${question.id}_unsure">
                        <div class="answer-icon">
                            <i class="fas fa-question"></i>
                        </div>
                        <span>Not Sure</span>
                    </label>
                </div>
            </div>
        </div>
    `;

    // Restore previous answer if exists
    const previousAnswer = currentAssessment.answers[question.id];
    if (previousAnswer) {
        const radio = document.querySelector(`input[name="${question.id}"][value="${previousAnswer}"]`);
        if (radio) {
            radio.checked = true;
        }
    }

    // Add event listeners for answer selection
    const radioButtons = questionContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            currentAssessment.answers[question.id] = this.value;
            updateNavigationButtons();
        });
    });

    // Update current question display
    document.getElementById('current-question').textContent = index + 1;
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const currentQuestion = currentAssessment.questions[currentAssessment.currentQuestionIndex];
    
    // Show/hide previous button
    if (currentAssessment.currentQuestionIndex > 0) {
        prevBtn.style.display = 'flex';
    } else {
        prevBtn.style.display = 'none';
    }
    
    // Update next button
    const hasAnswer = currentAssessment.answers[currentQuestion.id];
    nextBtn.disabled = !hasAnswer;
    
    // Change button text for last question: use 'Next Category' until the last category, then 'Complete Assessment'
    if (currentAssessment.currentQuestionIndex === currentAssessment.questions.length - 1) {
        const isLastCategory = currentAssessment.categoryIndex >= categoryOrder.length - 1;
        if (isLastCategory) {
            nextBtn.innerHTML = '<span>Complete Assessment</span><i class="fas fa-check"></i>';
        } else {
            nextBtn.innerHTML = '<span>Next Category</span><i class="fas fa-arrow-right"></i>';
        }
    } else {
        nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
    }
}

function previousQuestion() {
    if (currentAssessment.currentQuestionIndex > 0) {
        currentAssessment.currentQuestionIndex--;
        loadQuestion(currentAssessment.currentQuestionIndex);
        updateProgress();
    }
}

function nextQuestion() {
    const currentQuestion = currentAssessment.questions[currentAssessment.currentQuestionIndex];
    const hasAnswer = currentAssessment.answers[currentQuestion.id];

    if (!hasAnswer) {
        alert('Please select an answer before proceeding.');
        return;
    }

    // If there are more questions in this category, go to next question
    if (currentAssessment.currentQuestionIndex < currentAssessment.questions.length - 1) {
        currentAssessment.currentQuestionIndex++;
        loadQuestion(currentAssessment.currentQuestionIndex);
        updateProgress();
        return;
    }

    // Last question in current category — mark category complete
    const finishedCategory = currentAssessment.category;
    currentAssessment.completedCategories[finishedCategory] = true;
    const finishedBtnEl = document.querySelector(`.assessment-btn[data-category="${finishedCategory}"]`);
    if (finishedBtnEl) finishedBtnEl.classList.add('completed');

    // If there is a next category, unlock it and load it
    if (currentAssessment.categoryIndex < categoryOrder.length - 1) {
        const nextIdx = currentAssessment.categoryIndex + 1;
        currentAssessment.unlockedIndex = Math.max(currentAssessment.unlockedIndex, nextIdx);
        const nextCategory = categoryOrder[nextIdx];

        currentAssessment.categoryIndex = nextIdx;
        currentAssessment.category = nextCategory;
        currentAssessment.questions = [...assessmentQuestions[nextCategory]];
        currentAssessment.currentQuestionIndex = 0;

        // Update UI title and counts
        document.getElementById('assessment-category-title').textContent = getCategoryDisplayName(nextCategory);
        document.getElementById('total-questions').textContent = currentAssessment.questions.length;

        loadQuestion(0);
        updateProgress();
    } else {
        // Last category finished — proceed to email collection
        showSection('email-collection-section');
    }
}

function updateProgress() {
    const progress = ((currentAssessment.currentQuestionIndex + 1) / currentAssessment.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

async function handleEmailSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    currentAssessment.userInfo = {
        email: formData.get('email'),
        name: formData.get('name') || '',
        company: formData.get('company') || ''
    };
    
    // Show loading
    showLoading('Processing your assessment...');
    
    try {
        // Calculate results
        const results = calculateResults();
        
        // Store assessment in database
        await storeAssessmentResults(results);
        
        // Show results
        hideLoading();
        displayResults(results);
        showSection('results-section');
        
    } catch (error) {
        console.error('Error processing assessment:', error);
        hideLoading();
        alert('There was an error processing your assessment. Please try again.');
    }
}

function calculateResults() {
    const answers = currentAssessment.answers;
    // Calculate results across all categories (final aggregated assessment)
    const questions = categoryOrder.flatMap(cat => assessmentQuestions[cat]);
    
    let totalScore = 0;
    let maxScore = 0;
    let yesCount = 0;
    let noCount = 0;
    let unsureCount = 0;
    
    questions.forEach(question => {
        const answer = answers[question.id];
        const weight = question.weight;
        
        maxScore += weight * 3; // Max score is "yes" * weight * 3
        
        if (answer === 'yes') {
            totalScore += weight * 3;
            yesCount++;
        } else if (answer === 'no') {
            totalScore += weight * 0;
            noCount++;
        } else if (answer === 'unsure') {
            totalScore += weight * 1;
            unsureCount++;
        }
    });
    
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    // Determine status and recommendations
    let status, statusClass, description, recommendations;
    
    if (percentage >= 80) {
        status = 'Excellent';
        statusClass = 'excellent';
        description = 'Your business is performing exceptionally well in this area. Continue maintaining these high standards.';
        recommendations = [
            'Maintain current best practices',
            'Share your success strategies with other areas',
            'Consider mentoring other businesses',
            'Look for opportunities to further optimize'
        ];
    } else if (percentage >= 65) {
        status = 'Good';
        statusClass = 'good';
        description = 'Your business is performing well in this area with room for some improvements.';
        recommendations = [
            'Address areas where you answered "No" or "Not Sure"',
            'Implement best practices from industry leaders',
            'Set specific improvement targets',
            'Regular monitoring and review processes'
        ];
    } else if (percentage >= 45) {
        status = 'Needs Improvement';
        statusClass = 'needs-improvement';
        description = 'This area requires attention and improvement to ensure business success.';
        recommendations = [
            'Prioritize addressing critical gaps',
            'Develop an improvement action plan',
            'Consider professional consultation',
            'Implement systematic improvements',
            'Regular progress monitoring'
        ];
    } else {
        status = 'Critical';
        statusClass = 'critical';
        description = 'This area needs immediate attention and significant improvement.';
        recommendations = [
            'Immediate action required',
            'Seek professional assistance',
            'Develop comprehensive improvement strategy',
            'Allocate necessary resources',
            'Implement emergency measures if needed',
            'Regular progress reviews'
        ];
    }
    
    return {
        category: 'overall',
        percentage,
        status,
        statusClass,
        description,
        recommendations,
        totalQuestions: questions.length,
        yesCount,
        noCount,
        unsureCount,
        answers: currentAssessment.answers,
        userInfo: currentAssessment.userInfo
    };
}

async function storeAssessmentResults(results) {
    try {
        // Build master assessment payload
        const assessmentPayload = {
            email: results.userInfo.email || null,
            name: results.userInfo.name || null,
            company: results.userInfo.company || null,
            overall_score: results.percentage,
            status: results.status,
            total_questions: results.totalQuestions,
            yes_count: results.yesCount,
            no_count: results.noCount,
            unsure_count: results.unsureCount,
            answers: results.answers || {},
            metadata: {
                source: 'web',
                version: '1.0.0'
            },
            created_at: new Date().toISOString()
        };

        if (supabase) {
            console.log('📤 Saving assessment to Supabase (assessments, categories, answers)...');

            // Insert master assessment and return id
            const { data: insertedAssessment, error: assessmentError } = await supabase
                .from('assessments')
                .insert([assessmentPayload])
                .select()
                .single();

            if (assessmentError) {
                console.error('❌ Supabase error inserting assessment:', assessmentError);
                throw assessmentError;
            }

            const assessmentId = insertedAssessment.id;

            // Prepare per-category payloads
            const categoryRows = [];
            const answerRows = [];

            categoryOrder.forEach((catKey, idx) => {
                const questions = assessmentQuestions[catKey] || [];
                let yesCount = 0, noCount = 0, unsureCount = 0;
                let totalScore = 0, maxScore = 0;
                const catAnswers = {};

                questions.forEach(q => {
                    const ans = currentAssessment.answers[q.id];
                    if (ans === 'yes') yesCount++;
                    else if (ans === 'no') noCount++;
                    else if (ans === 'unsure') unsureCount++;

                    const weight = q.weight || 1;
                    maxScore += weight * 3;
                    if (ans === 'yes') totalScore += weight * 3;
                    else if (ans === 'unsure') totalScore += weight * 1;

                    if (ans) catAnswers[q.id] = ans;

                    // prepare answer row if answered
                    if (ans) {
                        const scoreForAnswer = ans === 'yes' ? weight * 3 : (ans === 'unsure' ? weight * 1 : 0);
                        answerRows.push({
                            assessment_id: assessmentId,
                            category_key: catKey,
                            question_id: q.id,
                            question_text: q.question,
                            answer: ans,
                            weight: weight,
                            score: scoreForAnswer,
                            created_at: new Date().toISOString()
                        });
                    }
                });

                const categoryScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : null;
                const categoryStatus = categoryScore === null ? null : (categoryScore >= 80 ? 'Excellent' : (categoryScore >= 65 ? 'Good' : (categoryScore >= 45 ? 'Needs Improvement' : 'Critical')));

                categoryRows.push({
                    assessment_id: assessmentId,
                    category_key: catKey,
                    category_title: getCategoryDisplayName(catKey),
                    position: idx,
                    score: categoryScore,
                    status: categoryStatus,
                    total_questions: questions.length,
                    yes_count: yesCount,
                    no_count: noCount,
                    unsure_count: unsureCount,
                    answers: catAnswers,
                    created_at: new Date().toISOString()
                });
            });

            // Insert categories in bulk
            if (categoryRows.length > 0) {
                const { error: catError } = await supabase
                    .from('assessment_categories')
                    .insert(categoryRows);

                if (catError) {
                    console.error('❌ Supabase error inserting categories:', catError);
                    throw catError;
                }
            }

            // Insert answer rows in bulk (if any)
            if (answerRows.length > 0) {
                // Insert in batches to avoid payload limits
                const batchSize = 500;
                for (let i = 0; i < answerRows.length; i += batchSize) {
                    const batch = answerRows.slice(i, i + batchSize);
                    const { error: ansError } = await supabase
                        .from('assessment_answers')
                        .insert(batch);
                    if (ansError) {
                        console.error('❌ Supabase error inserting answers:', ansError);
                        throw ansError;
                    }
                }
            }

            console.log('✅ Assessment, categories and answers saved to Supabase successfully');
        } else {
            // Fallback to structured localStorage
            console.log('📤 Saving assessment to localStorage (structured)...');
            const store = JSON.parse(localStorage.getItem('oakglobal_assessments_v2') || '[]');
            const record = {
                id: Date.now(),
                assessment: assessmentPayload,
                categories: categoryOrder.map((catKey, idx) => {
                    const questions = assessmentQuestions[catKey] || [];
                    const catAnswers = {};
                    let yesCount = 0, noCount = 0, unsureCount = 0, totalScore = 0, maxScore = 0;
                    questions.forEach(q => {
                        const ans = currentAssessment.answers[q.id];
                        if (ans) catAnswers[q.id] = ans;
                        const weight = q.weight || 1;
                        maxScore += weight * 3;
                        if (ans === 'yes') { yesCount++; totalScore += weight * 3; }
                        else if (ans === 'unsure') { unsureCount++; totalScore += weight * 1; }
                        else if (ans === 'no') { noCount++; }
                    });
                    const categoryScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : null;
                    return {
                        category_key: catKey,
                        category_title: getCategoryDisplayName(catKey),
                        position: idx,
                        score: categoryScore,
                        total_questions: questions.length,
                        yes_count: yesCount,
                        no_count: noCount,
                        unsure_count: unsureCount,
                        answers: catAnswers
                    };
                })
            };
            store.push(record);
            localStorage.setItem('oakglobal_assessments_v2', JSON.stringify(store));
            console.log('✅ Assessment saved to localStorage successfully');
        }

    } catch (error) {
        console.error('❌ Error storing assessment:', error);
        // Don't throw error - allow results to be shown even if storage fails
    }
}

function displayResults(results) {
    // Update overall score
    document.getElementById('overall-score-text').textContent = `${results.percentage}%`;
    document.getElementById('score-label').textContent = `${getCategoryDisplayName(results.category)} Health Score`;
    
    // Update results summary
    const summaryContainer = document.getElementById('results-summary');
    summaryContainer.innerHTML = `
        <div class="result-category">
            <h3>
                ${getCategoryDisplayName(results.category)} Assessment
                <span class="result-status ${results.statusClass}">${results.status}</span>
            </h3>
            <p class="result-description">${results.description}</p>
            
            <div class="score-breakdown" style="margin: 1.5rem 0; padding: 1rem; background: white; border-radius: 8px; border: 1px solid var(--border);">
                <h4 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 1rem;">Response Summary:</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; text-align: center;">
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #059669;">${results.yesCount}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Yes</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #dc2626;">${results.noCount}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">No</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #d97706;">${results.unsureCount}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Not Sure</div>
                    </div>
                </div>
            </div>
            
            <div class="recommendations">
                <h4>Recommendations for Improvement:</h4>
                <ul>
                    ${results.recommendations.map(rec => `<li><i class="fas fa-lightbulb"></i>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function getCategoryDisplayName(category) {
    const categoryNames = {
        risks: 'Risks and Opportunities',
        business: 'The Business Context',
        leadership: 'Leadership',
        resources: 'Supporting Resources',
        operations: 'Operations',
        strategy: 'Evaluation & Improvement',
        overall: 'Overall Assessment'
    };
    return categoryNames[category] || category;
}

function downloadResults() {
    // Create a simple text report
    const results = calculateResults();
    const reportContent = `
OAK GLOBAL BUSINESS ASSESSMENT REPORT
=====================================

Assessment Type: ${getCategoryDisplayName(results.category)}
Date: ${new Date().toLocaleDateString()}
Overall Score: ${results.percentage}%
Status: ${results.status}

RESPONSE SUMMARY:
- Yes: ${results.yesCount} responses
- No: ${results.noCount} responses  
- Not Sure: ${results.unsureCount} responses

ASSESSMENT RESULT:
${results.description}

RECOMMENDATIONS:
${results.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

NEXT STEPS:
- Review areas where you answered "No" or "Not Sure"
- Prioritize improvements based on business impact
- Consider professional consultation for critical areas
- Schedule regular assessments to track progress

Contact OAK Global for professional assistance:
Email: info@oakglobal.com
Phone: +2348133061881

This report was generated by OAK Global's Business Assessment Tool.
Visit our website for more business solutions: https://oakglobal.com
    `;
    
    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OAK-Global-${getCategoryDisplayName(results.category).replace(/\s+/g, '-')}-Assessment-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function showSection(sectionId) {
    // Hide all sections
    const sections = ['assessment-categories', 'assessment-form-section', 'email-collection-section', 'results-section'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function resetAssessment() {
    currentAssessment = {
        category: null,
        categoryIndex: 0,
        unlockedIndex: 0,
        completedCategories: {},
        questions: [],
        currentQuestionIndex: 0,
        answers: {},
        userInfo: {}
    };

    // Reset form
    const emailForm = document.getElementById('email-collection-form');
    if (emailForm) {
        emailForm.reset();
    }

    // Reset category buttons state: only first category unlocked
    const assessmentButtons = document.querySelectorAll('.assessment-btn');
    assessmentButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        const idx = categoryOrder.indexOf(category);
        if (idx > 0) {
            button.disabled = true;
            button.classList.add('locked');
            button.classList.remove('completed');
        } else {
            button.disabled = false;
            button.classList.remove('locked');
            button.classList.remove('completed');
        }
    });
    // Ensure the universal start button is enabled and cleaned up
    const startAllBtn = document.getElementById('start-all-assessment');
    if (startAllBtn) {
        startAllBtn.disabled = false;
        startAllBtn.classList.remove('started');
    }
}

function showLoading(message = 'Processing...') {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">${message}</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        document.body.removeChild(loadingOverlay);
    }
}

// Export for debugging
window.assessmentSystem = {
    currentAssessment,
    assessmentQuestions,
    startAssessment,
    categoryOrder,
    calculateResults,
    supabase: supabase ? 'Connected' : 'Not Available'
};

console.log('🔍 Assessment System Ready!');
console.log('📊 Available Categories:', Object.keys(assessmentQuestions));
console.log('🗄️ Database:', supabase ? 'Supabase Connected' : 'LocalStorage Fallback');