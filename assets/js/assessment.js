// Business Assessment System
console.log('🔍 Assessment System Loading...');

// Assessment Questions Database
const assessmentQuestions = {
    finances: [
        {
            id: 'fin_1',
            question: 'Do you have a detailed budget and financial plan for the next 12 months?',
            weight: 3
        },
        {
            id: 'fin_2',
            question: 'Do you regularly monitor your cash flow and have at least 3 months of operating expenses in reserve?',
            weight: 4
        },
        {
            id: 'fin_3',
            question: 'Are your financial records up-to-date and reviewed monthly?',
            weight: 2
        },
        {
            id: 'fin_4',
            question: 'Do you have clear visibility into your profit margins for each product/service?',
            weight: 3
        },
        {
            id: 'fin_5',
            question: 'Have you implemented cost control measures and regularly review expenses?',
            weight: 2
        },
        {
            id: 'fin_6',
            question: 'Do you have diversified revenue streams to reduce financial risk?',
            weight: 3
        },
        {
            id: 'fin_7',
            question: 'Are you meeting your financial targets and KPIs consistently?',
            weight: 4
        },
        {
            id: 'fin_8',
            question: 'Do you have access to additional funding sources if needed for growth?',
            weight: 2
        },
        {
            id: 'fin_9',
            question: 'Are your pricing strategies competitive and profitable?',
            weight: 3
        },
        {
            id: 'fin_10',
            question: 'Do you conduct regular financial audits and reviews?',
            weight: 2
        }
    ],
    customers: [
        {
            id: 'cust_1',
            question: 'Do you regularly collect and analyze customer feedback?',
            weight: 3
        },
        {
            id: 'cust_2',
            question: 'Do you have a customer retention rate above 80%?',
            weight: 4
        },
        {
            id: 'cust_3',
            question: 'Are you actively acquiring new customers through multiple channels?',
            weight: 3
        },
        {
            id: 'cust_4',
            question: 'Do you have a customer relationship management (CRM) system in place?',
            weight: 2
        },
        {
            id: 'cust_5',
            question: 'Are you measuring customer satisfaction scores regularly?',
            weight: 3
        },
        {
            id: 'cust_6',
            question: 'Do you have a clear understanding of your target market and customer personas?',
            weight: 4
        },
        {
            id: 'cust_7',
            question: 'Are you providing excellent customer service with quick response times?',
            weight: 3
        },
        {
            id: 'cust_8',
            question: 'Do you have a loyalty program or customer retention strategy?',
            weight: 2
        },
        {
            id: 'cust_9',
            question: 'Are you actively engaging with customers on social media and digital platforms?',
            weight: 2
        },
        {
            id: 'cust_10',
            question: 'Do you regularly conduct market research to understand customer needs?',
            weight: 3
        }
    ],
    operations: [
        {
            id: 'ops_1',
            question: 'Are your business processes documented and standardized?',
            weight: 3
        },
        {
            id: 'ops_2',
            question: 'Do you have efficient systems and technology supporting your operations?',
            weight: 4
        },
        {
            id: 'ops_3',
            question: 'Are you measuring and monitoring key operational metrics?',
            weight: 3
        },
        {
            id: 'ops_4',
            question: 'Do you have quality control measures in place?',
            weight: 3
        },
        {
            id: 'ops_5',
            question: 'Are your supply chain and vendor relationships well-managed?',
            weight: 2
        },
        {
            id: 'ops_6',
            question: 'Do you have backup plans for critical business operations?',
            weight: 3
        },
        {
            id: 'ops_7',
            question: 'Are you continuously improving your processes and efficiency?',
            weight: 4
        },
        {
            id: 'ops_8',
            question: 'Do you have adequate inventory management systems?',
            weight: 2
        },
        {
            id: 'ops_9',
            question: 'Are your facilities and equipment properly maintained?',
            weight: 2
        },
        {
            id: 'ops_10',
            question: 'Do you have scalable operations that can handle business growth?',
            weight: 4
        }
    ],
    compliance: [
        {
            id: 'comp_1',
            question: 'Are you compliant with all relevant industry regulations and standards?',
            weight: 4
        },
        {
            id: 'comp_2',
            question: 'Do you have proper business licenses and permits?',
            weight: 4
        },
        {
            id: 'comp_3',
            question: 'Are your tax obligations up-to-date and properly managed?',
            weight: 4
        },
        {
            id: 'comp_4',
            question: 'Do you have adequate insurance coverage for your business?',
            weight: 3
        },
        {
            id: 'comp_5',
            question: 'Are your employment practices compliant with labor laws?',
            weight: 3
        },
        {
            id: 'comp_6',
            question: 'Do you have proper data protection and privacy policies?',
            weight: 3
        },
        {
            id: 'comp_7',
            question: 'Are your contracts and legal agreements properly structured?',
            weight: 2
        },
        {
            id: 'comp_8',
            question: 'Do you conduct regular compliance audits and reviews?',
            weight: 3
        },
        {
            id: 'comp_9',
            question: 'Are you staying updated with regulatory changes in your industry?',
            weight: 2
        },
        {
            id: 'comp_10',
            question: 'Do you have proper corporate governance structures in place?',
            weight: 3
        }
    ],
    risk: [
        {
            id: 'risk_1',
            question: 'Have you identified and documented all major business risks?',
            weight: 4
        },
        {
            id: 'risk_2',
            question: 'Do you have risk mitigation strategies for each identified risk?',
            weight: 4
        },
        {
            id: 'risk_3',
            question: 'Are you regularly monitoring and reviewing your risk exposure?',
            weight: 3
        },
        {
            id: 'risk_4',
            question: 'Do you have a business continuity plan for emergencies?',
            weight: 4
        },
        {
            id: 'risk_5',
            question: 'Are your cybersecurity measures adequate and up-to-date?',
            weight: 3
        },
        {
            id: 'risk_6',
            question: 'Do you have proper backup and disaster recovery procedures?',
            weight: 3
        },
        {
            id: 'risk_7',
            question: 'Are you diversified enough to handle market fluctuations?',
            weight: 2
        },
        {
            id: 'risk_8',
            question: 'Do you have adequate financial reserves for unexpected events?',
            weight: 3
        },
        {
            id: 'risk_9',
            question: 'Are your key personnel and knowledge properly protected?',
            weight: 2
        },
        {
            id: 'risk_10',
            question: 'Do you regularly test and update your risk management procedures?',
            weight: 3
        }
    ],
    strategy: [
        {
            id: 'strat_1',
            question: 'Do you have a clear business vision and mission statement?',
            weight: 3
        },
        {
            id: 'strat_2',
            question: 'Have you defined specific, measurable business goals for the next 1-3 years?',
            weight: 4
        },
        {
            id: 'strat_3',
            question: 'Do you regularly review and update your business strategy?',
            weight: 3
        },
        {
            id: 'strat_4',
            question: 'Are you tracking key performance indicators (KPIs) aligned with your strategy?',
            weight: 4
        },
        {
            id: 'strat_5',
            question: 'Do you conduct regular competitive analysis and market research?',
            weight: 3
        },
        {
            id: 'strat_6',
            question: 'Are your team members aligned with and understand the business strategy?',
            weight: 3
        },
        {
            id: 'strat_7',
            question: 'Do you have a clear value proposition that differentiates you from competitors?',
            weight: 4
        },
        {
            id: 'strat_8',
            question: 'Are you investing in innovation and future growth opportunities?',
            weight: 2
        },
        {
            id: 'strat_9',
            question: 'Do you have succession planning and leadership development programs?',
            weight: 2
        },
        {
            id: 'strat_10',
            question: 'Are you measuring the effectiveness of your strategic initiatives?',
            weight: 3
        }
    ]
};

// Assessment State
let currentAssessment = {
    category: null,
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
    // Add event listeners for assessment buttons
    const assessmentButtons = document.querySelectorAll('.assessment-btn');
    assessmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            startAssessment(category);
        });
    });

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
    
    // Reset assessment state
    currentAssessment = {
        category: category,
        questions: [...assessmentQuestions[category]],
        currentQuestionIndex: 0,
        answers: {},
        userInfo: {}
    };

    // Update UI
    const categoryTitles = {
        finances: 'Financial Health Assessment',
        customers: 'Customer Relations Assessment',
        operations: 'Operations Assessment',
        compliance: 'Compliance & Governance Assessment',
        risk: 'Risk Management Assessment',
        strategy: 'Strategic Planning Assessment'
    };

    document.getElementById('assessment-category-title').textContent = categoryTitles[category];
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
    
    // Change button text for last question
    if (currentAssessment.currentQuestionIndex === currentAssessment.questions.length - 1) {
        nextBtn.innerHTML = '<span>Complete Assessment</span><i class="fas fa-check"></i>';
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
    
    if (currentAssessment.currentQuestionIndex < currentAssessment.questions.length - 1) {
        currentAssessment.currentQuestionIndex++;
        loadQuestion(currentAssessment.currentQuestionIndex);
        updateProgress();
    } else {
        // Assessment complete, show email collection
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
    const questions = currentAssessment.questions;
    
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
        category: currentAssessment.category,
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
        const assessmentData = {
            email: results.userInfo.email,
            name: results.userInfo.name || null,
            company: results.userInfo.company || null,
            category: results.category,
            score: results.percentage,
            status: results.status,
            total_questions: results.totalQuestions,
            yes_count: results.yesCount,
            no_count: results.noCount,
            unsure_count: results.unsureCount,
            answers: JSON.stringify(results.answers),
            created_at: new Date().toISOString()
        };

        if (supabase) {
            console.log('📤 Saving assessment to Supabase...');
            
            const { data, error } = await supabase
                .from('assessment_responses')
                .insert([assessmentData]);
            
            if (error) {
                console.error('❌ Supabase error:', error);
                throw error;
            } else {
                console.log('✅ Assessment saved to Supabase successfully');
            }
        } else {
            // Fallback to localStorage
            console.log('📤 Saving assessment to localStorage...');
            
            const assessments = JSON.parse(localStorage.getItem('oakglobal_assessments') || '[]');
            assessmentData.id = Date.now();
            assessments.push(assessmentData);
            localStorage.setItem('oakglobal_assessments', JSON.stringify(assessments));
            
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
        finances: 'Financial Health',
        customers: 'Customer Relations',
        operations: 'Operations',
        compliance: 'Compliance & Governance',
        risk: 'Risk Management',
        strategy: 'Strategic Planning'
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
    calculateResults,
    supabase: supabase ? 'Connected' : 'Not Available'
};

console.log('🔍 Assessment System Ready!');
console.log('📊 Available Categories:', Object.keys(assessmentQuestions));
console.log('🗄️ Database:', supabase ? 'Supabase Connected' : 'LocalStorage Fallback');