// Admin Panel JavaScript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    const loginModal = document.getElementById('loginModal');
    const adminPanel = document.getElementById('adminPanel');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Check if already logged in
    if (localStorage.getItem('oakglobal_admin_logged_in') === 'true') {
        showAdminPanel();
    } else {
        showLoginModal();
    }
    
    // Login form handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Logout handler
    logoutBtn.addEventListener('click', function() {
        handleLogout();
    });
    
    // Initialize admin navigation
    initializeAdminNavigation();
    
    // Initialize admin sections
    initializeAdminSections();
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadDashboardData();
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Simple authentication (in production, this would be server-side)
    if (username === 'administrator' && password === 'admin@123') {
        localStorage.setItem('oakglobal_admin_logged_in', 'true');
        showAdminPanel();
        errorDiv.style.display = 'none';
    } else {
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.style.display = 'block';
    }
}

function handleLogout() {
    localStorage.removeItem('oakglobal_admin_logged_in');
    showLoginModal();
    document.getElementById('loginForm').reset();
}

function initializeAdminNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
                
                // Load section-specific data
                if (sectionId === 'contacts') {
                    loadContactsData();
                } else if (sectionId === 'dashboard') {
                    loadDashboardData();
                }
            }
        });
    });
}

function initializeAdminSections() {
    // Refresh contacts button
    const refreshBtn = document.getElementById('refreshContacts');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadContactsData);
    }
    
    // Clear all contacts button
    const clearBtn = document.getElementById('clearAllContacts');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete all contact messages? This action cannot be undone.')) {
                localStorage.removeItem('oakglobal_contacts');
                loadContactsData();
                showNotification('All contact messages have been deleted.', 'success');
            }
        });
    }
    
    // Content management forms
    initializeContentForms();
    
    // Settings forms
    initializeSettingsForms();
}

async function loadDashboardData() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats/dashboard`);
        const stats = await response.json();
        
        // Update dashboard stats
        document.getElementById('totalMessages').textContent = stats.totalContacts;
        document.getElementById('websiteVisits').textContent = stats.totalAssessments;
        document.getElementById('todayMessages').textContent = stats.unreadContacts;
        
        // Load recent contacts
        loadRecentContacts();
    } catch (error) {
        showNotification('Failed to load dashboard data', 'error');
    }
}

async function loadRecentContacts() {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`);
        const contacts = await response.json();
        
        const recentActivity = document.getElementById('recentActivity');
        const sortedContacts = contacts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const recentContacts = sortedContacts.slice(0, 5);
        
        if (recentContacts.length === 0) {
            recentActivity.innerHTML = '<div class="empty-state"><h3>No recent activity</h3><p>Contact messages will appear here when received.</p></div>';
            return;
        }
        
        const activityHTML = recentContacts.map(contact => {
            const date = new Date(contact.created_at);
            const timeAgo = getTimeAgo(date);
            const serviceText = contact.service ? getServiceDisplayName(contact.service) : 'General inquiry';
            
            return `
                <div class="activity-item">
                    <div>
                        <strong>New contact message from ${contact.name}</strong>
                        <br>
                        <small>${contact.email} - ${serviceText}</small>
                    </div>
                    <div class="activity-time">${timeAgo}</div>
                </div>
            `;
        }).join('');
        
        recentActivity.innerHTML = activityHTML;
    } catch (error) {
        // Activity loading failed
    }
}

async function loadContactsData() {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts`);
        const contacts = await response.json();
        const contactsList = document.getElementById('contactsList');
        
        if (contacts.length === 0) {
            contactsList.innerHTML = '<div class="empty-state"><h3>No contact messages</h3><p>Contact form submissions will appear here.</p></div>';
            return;
        }
        
        const sortedContacts = [...contacts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        const contactsHTML = sortedContacts.map((contact) => {
            const date = new Date(contact.created_at);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            const serviceText = contact.service ? getServiceDisplayName(contact.service) : 'Not specified';
            
            return `
                <div class="contact-item-admin ${contact.read ? 'read' : 'unread'}">
                    <div class="contact-header">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-date">${formattedDate}</div>
                    </div>
                    <div class="contact-email">📧 ${contact.email}</div>
                    ${contact.company ? `<div class="contact-company">🏢 ${contact.company}</div>` : ''}
                    <div class="contact-service">🔧 Service: ${serviceText}</div>
                    <div class="contact-message">
                        <strong>Message:</strong><br>
                        ${contact.message}
                    </div>
                    <div class="contact-actions">
                        <button class="success-button" onclick="markAsRead('${contact.id}')">${contact.read ? 'Mark as Unread' : 'Mark as Read'}</button>
                        <button class="danger-button" onclick="deleteContact('${contact.id}')">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
        
        contactsList.innerHTML = contactsHTML;
    } catch (error) {
        showNotification('Failed to load contacts', 'error');
    }
}

function getServiceDisplayName(serviceValue) {
    const serviceMap = {
        'business-performance': 'Business Performance Management',
        'strategy-assessment': 'Strategy Maturity Assessment',
        'management-systems': 'Management Systems Assessment',
        'regulatory-compliance': 'Regulatory Compliance Assessment',
        'iso-compliance': 'ISO Compliance Validation',
        'other': 'Other'
    };
    return serviceMap[serviceValue] || serviceValue;
}

function initializeContentForms() {
    // Hero content form
    const heroForm = document.getElementById('heroContentForm');
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const heroTitle = document.getElementById('heroTitle').value;
            const heroSubtitle = document.getElementById('heroSubtitle').value;
            
            // Store content updates
            const contentData = {
                heroTitle,
                heroSubtitle,
                lastUpdated: new Date().toISOString()
            };
            
            localStorage.setItem('oakglobal_content', JSON.stringify(contentData));
            showNotification('Hero content updated successfully!', 'success');
        });
    }
    
    // Company info form
    const companyForm = document.getElementById('companyInfoForm');
    if (companyForm) {
        companyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const companyName = document.getElementById('companyName').value;
            const companyDescription = document.getElementById('companyDescription').value;
            
            const companyData = {
                companyName,
                companyDescription,
                lastUpdated: new Date().toISOString()
            };
            
            localStorage.setItem('oakglobal_company', JSON.stringify(companyData));
            showNotification('Company information updated successfully!', 'success');
        });
    }
}

function initializeSettingsForms() {
    // Site settings form
    const siteForm = document.getElementById('siteSettingsForm');
    if (siteForm) {
        siteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const siteName = document.getElementById('siteName').value;
            const contactEmail = document.getElementById('contactEmail').value;
            const businessHours = document.getElementById('businessHours').value;
            
            const siteData = {
                siteName,
                contactEmail,
                businessHours,
                lastUpdated: new Date().toISOString()
            };
            
            localStorage.setItem('oakglobal_settings', JSON.stringify(siteData));
            showNotification('Site settings updated successfully!', 'success');
        });
    }
    
    // Password change form
    const passwordForm = document.getElementById('passwordChangeForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Simple validation
            if (currentPassword !== 'admin@123') {
                showNotification('Current password is incorrect.', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match.', 'error');
                return;
            }
            
            if (newPassword.length < 6) {
                showNotification('New password must be at least 6 characters long.', 'error');
                return;
            }
            
            // In a real application, this would update the password on the server
            showNotification('Password changed successfully! (Note: This is a demo - password not actually changed)', 'success');
            passwordForm.reset();
        });
    }
}

// Utility functions
async function markAsRead(contactId) {
    try {
        const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ read: true })
        });

        if (response.ok) {
            loadContactsData();
            loadDashboardData();
            showNotification('Contact marked as read.', 'success');
        } else {
            showNotification('Failed to update contact.', 'error');
        }
    } catch (error) {
        showNotification('Error updating contact.', 'error');
    }
}

async function deleteContact(contactId) {
    if (confirm('Are you sure you want to delete this contact message?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadContactsData();
                loadDashboardData();
                showNotification('Contact message deleted.', 'success');
            } else {
                showNotification('Failed to delete contact.', 'error');
            }
        } catch (error) {
            showNotification('Error deleting contact.', 'error');
        }
    }
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10001;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#dc3545';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    window.setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        window.setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}

// Add notification animations
const notificationCSS = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

const notificationStyle = document.createElement('style');
notificationStyle.textContent = notificationCSS;
document.head.appendChild(notificationStyle);