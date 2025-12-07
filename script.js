// ✅ Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ✅ Firebase config (mee project vi)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "sr-fashion-hub.firebaseapp.com",
  projectId: "sr-fashion-hub",
  appId: "YOUR_APP_ID"
};

// ✅ Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ BUTTON EVENT (IMPORTANT)
document.getElementById("loginBtn").addEventListener("click", adminLogin);

// ✅ LOGIN FUNCTION
function adminLogin() {
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (!email || !password) {
    alert("⚠️ Email & Password must");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ Login Success");
      window.location.href = "admin-dashboard.html";
    })
    .catch((error) => {
      console.log("ERROR CODE:", error.code);
      console.log("ERROR MSG:", error.message);

      // ✅ CLEAR USER FRIENDLY ALERT
      if (error.code === "auth/wrong-password") {
        alert("❌ Wrong password");
      } else if (error.code === "auth/user-not-found") {
        alert("❌ Admin user not found");
      } else {
        alert("❌ Login failed");
      }
    });
}
