var form = document.getElementById('business-form');

function checkForm() {
  var businessName = document.getElementById("businessName").value;
  var businessAddress = document.getElementById("businessAddress").value;
  var businessDescription = document.getElementById("businessDescription").value;

  if (businessName.trim() === '' || businessAddress.trim() === '' || businessDescription.trim() === '') {
    alert("Please fill in all required fields.");
  } else if (form.checkValidity()) {
    alert("Successfully added " + businessName + "!");
    document.getElementById("businessName").value = '';
    document.getElementById("businessAddress").value = '';
    document.getElementById("businessDescription").value = '';
  }
}
