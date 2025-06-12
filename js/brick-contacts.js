// Load and render contact details
async function loadContactDetails() {
  const contactInfo = await DataLoader.loadJSON("/json/contact-info.json");
  if (!contactInfo) return;

  const container = document.getElementById("contact-details-container");
  container.innerHTML = `
        <div class="contact-card">
            <div class="contact-item">
                <h3>Email</h3>
                <a href="mailto:${contactInfo.email}">${contactInfo.email}</a>
            </div>
            <div class="contact-item">
                <h3>Phone</h3>
                <a href="tel:${contactInfo.phone}">${contactInfo.phone}</a>
            </div>
            <div class="contact-item">
                <h3>Location</h3>
                <p>${contactInfo.location}</p>
            </div>
            <div class="contact-item">
                <h3>Business Hours</h3>
                <p>${contactInfo.businessHours}</p>
            </div>
        </div>
    `;
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  // Here you would typically send the form data to a server
  console.log("Form submitted:", formData);

  // Show success message
  alert("Thank you for your message! We will get back to you soon.");

  // Reset form
  event.target.reset();
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  loadContactDetails();

  const form = document.getElementById("feedback-form");
  const success = document.getElementById("form-success");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.style.display = "none";
      success.style.display = "flex";
      // Optionally reset form after a delay
      setTimeout(() => {
        form.reset();
        form.style.display = "";
        success.style.display = "none";
      }, 5000);
    });
  }
});
