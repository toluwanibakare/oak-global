<?php
// Initialize variables
$success_message = '';
$error_message = '';

// Process form submission
if ($_POST) {
    // Include database connection
    require_once 'config/db.php';
    
    // Get form data and sanitize
    $name = mysqli_real_escape_string($conn, trim($_POST['name']));
    $email = mysqli_real_escape_string($conn, trim($_POST['email']));
    $message = mysqli_real_escape_string($conn, trim($_POST['message']));
    
    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        $error_message = "Please fill in all required fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Please enter a valid email address.";
    } else {
        // Insert into database
        $sql = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";
        
        if (mysqli_query($conn, $sql)) {
            $success_message = "Thank you for your message! We will get back to you within 24 hours.";
            // Clear form data
            $_POST = array();
        } else {
            $error_message = "There was an error sending your message. Please try again.";
        }
    }
    
    // Close database connection
    mysqli_close($conn);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - OAK Global International Business Solutions</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <h1 class="fade-in-up">Contact Us</h1>
            <p>Get in touch with our expert team</p>
        </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-info slide-in-left">
                    <h2>Let's Discuss Your Needs</h2>
                    <p>Ready to take your business performance to the next level? Our team of experts is here to help you achieve operational excellence and global recognition. Contact us today to schedule a consultation.</p>
                    
                    <div class="contact-image">
                        <img src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop" alt="Contact OAK Global" class="rounded-image">
                    </div>
                    
                    <div class="contact-details">
                        <div class="contact-item">
                            <div class="contact-item-icon">🕒</div>
                            <div>
                            <h4>Business Hours</h4>
                            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p>Saturday: 10:00 AM - 4:00 PM</p>
                            <p>Sunday: Closed</p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-item-icon">⏱️</div>
                            <div>
                            <h4>Response Time</h4>
                            <p>We typically respond to all inquiries within 24 hours during business days.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contact-form-container slide-in-right">
                    <h2>Send us a Message</h2>
                    
                    <?php if ($success_message): ?>
                        <div class="form-message success" style="display: block;">
                            <?php echo $success_message; ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if ($error_message): ?>
                        <div class="form-message error" style="display: block;">
                            <?php echo $error_message; ?>
                        </div>
                    <?php endif; ?>
                    
                    <form method="POST" class="contact-form">
                        <div class="form-group fade-in-up" data-aos="fade-up" data-aos-delay="100">
                            <label for="name">Full Name *</label>
                            <input type="text" id="name" name="name" value="<?php echo isset($_POST['name']) ? htmlspecialchars($_POST['name']) : ''; ?>" required>
                        </div>
                        
                        <div class="form-group fade-in-up" data-aos="fade-up" data-aos-delay="200">
                            <label for="email">Email Address *</label>
                            <input type="email" id="email" name="email" value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>" required>
                        </div>
                        
                        <div class="form-group fade-in-up" data-aos="fade-up" data-aos-delay="500">
                            <label for="message">Message *</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Please tell us about your business needs and how we can help you achieve your goals."><?php echo isset($_POST['message']) ? htmlspecialchars($_POST['message']) : ''; ?></textarea>
                        </div>
                        
                        <button type="submit" class="cta-button pulse-animation" data-aos="fade-up" data-aos-delay="600"><i class="fas fa-paper-plane"></i> Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <?php include 'includes/footer.php'; ?>

    <script src="assets/js/script.js"></script>
</body>
</html>