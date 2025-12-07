// ✅ Firebase CDN imports (browser ki correct)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ✅ YOUR Firebase configuration (mee paste chesindhe)
const firebaseConfig = {
  apiKey: "AIzaSyBuj16wJb2pIDkst_nui3lE9Xpm0hr-Vtw",
  authDomain: "sr-fashion-hub.firebaseapp.com",
  projectId: "sr-fashion-hub",
  storageBucket: "sr-fashion-hub.firebasestorage.app",
  messagingSenderId: "745961688708",
  appId: "1:745961688708:web:9f0384ce711f5a1524fcd1"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ================= ADMIN LOGIN ================= */
window.adminLogin = async function () {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  if (!email || !password) {
    alert("Email & Password required ❗");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful ✅");
    window.location.href = "admin.html";
  } catch (error) {
    alert("Login failed ❌");
  }
};

/* ================= PLACE ORDER ================= */
window.placeOrder = async function () {
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const product = document.getElementById("product").value;
  const address = document.getElementById("address").value;
  const txn = document.getElementById("txn").value;

  if (!name || !mobile || !product || !address || !txn) {
    alert("All fields must be filled ❗");
    return;
  }

  try {
    await addDoc(collection(db, "orders"), {
      name: name,
      mobile: mobile,
      product: product,
      address: address,
      transactionId: txn,
      payment: "UPI",
      status: "PAID",
      createdAt: new Date()
    });

    alert("Order placed successfully ✅");
  } catch (e) {
    alert("Order failed ❌");
  }
};
