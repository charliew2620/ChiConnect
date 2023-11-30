// var form = document.getElementById('review-form');
// function checkForm() {
//     if (form.checkValidity()) {
//       alert("Successfully added " + document.getElementById("businessName").value + "!");
//       document.getElementById("businessName").value = '';
//       document.getElementById("businessAddress").value = '';
//       document.getElementById("businessDescription").value = '';
//     }
//   }

// Assuming these variables are available in your business_info object
var friendlyStaffCount = business_info.friendlyStaff;
var cleanlinessCount = business_info.clean;
var fairPricingCount = business_info.fairPricing;
var flexibleCount = business_info.flexible;

// Update the counts when the review form is submitted
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Update the counts based on button states
    friendlyStaffCount += document.getElementById('thumbsUpButton').classList.contains('btn-success') ? 1 : 0;
    cleanlinessCount += document.getElementById('thumbsDownButton').classList.contains('btn-danger') ? 1 : 0;
    fairPricingCount += document.getElementById('thumbsUpButton').classList.contains('btn-success') ? 1 : 0;
    flexibleCount += document.getElementById('thumbsDownButton').classList.contains('btn-danger') ? 1 : 0;

    // Display the updated counts
    document.getElementById('friendlyStaffCount').innerText = friendlyStaffCount;
    document.getElementById('cleanlinessCount').innerText = cleanlinessCount;
    document.getElementById('fairPricingCount').innerText = fairPricingCount;
    document.getElementById('flexibleCount').innerText = flexibleCount;

    // Reset the Thumbs Up and Thumbs Down buttons
    document.getElementById('thumbsUpButton').classList.remove('btn-success');
    document.getElementById('thumbsDownButton').classList.remove('btn-danger');
});

// Initially display the counts
document.getElementById('friendlyStaffCount').innerText = friendlyStaffCount;
document.getElementById('cleanlinessCount').innerText = cleanlinessCount;
document.getElementById('fairPricingCount').innerText = fairPricingCount;
document.getElementById('flexibleCount').innerText = flexibleCount;
