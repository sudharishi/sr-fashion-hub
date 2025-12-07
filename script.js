// ✅ Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

// ✅ Firestore
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ✅ Firebase Auth
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBuj16wJb2pIDkst_nui3lE9Xpm0hr-Vtw",
  authDomain: "sr-fashion-hub.firebaseapp.com",
  projectId: "sr-fashion-hub",
  storageBucket: "sr-fashion-hub.firebasestorage.app",
  messagingSenderId: "745961688708",
  appId: "1:745961688708:web:9f0384ce711f5a1524fcd1"
};

// ✅ Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* ================= ADMIN LOGIN ================= */
function adminLogin() {
  const email = document.getElementById("adminEmail")?.value.trim();
  const password = document.getElementById("adminPassword")?.value.trim();

  if (!email || !password) {
    alert("Email & Password required ❗");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Admin Login Successful ✅");
      window.location.href = "admin-dashboard.html";
    })
    .catch((error) => {
      alert("Login Failed ❌");
      console.error(error.message);
    });
}

/* ✅ FIX: button click work avvadaniki */
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", adminLogin);
  }
});

/* ================= PRODUCT AUTO SELECT ================= */
window.selectProduct = function (productName) {
  const p = document.getElementById("product");
  const s = document.getElementById("showProduct");

  if (p) p.value = productName;
  if (s) s.innerText = productName;

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
};

/* ================= PLACE ORDER ================= */
window.placeOrder = async function () {
  const name = document.getElementById("name")?.value;
  const mobile = document.getElementById("mobile")?.value;
  const product = document.getElementById("product")?.value;
  const address = document.getElementById("address")?.value;
  const payment = document.getElementById("payment")?.value;
  const txn = document.getElementById("txn")?.value || "";

  if (!name || !mobile || !product || !address || !payment) {
    alert("All fields required ❗");
    return;
  }

  if (payment === "UPI" && !txn) {
    alert("Enter UPI Transaction ID ❗");
    return;
  }

  try {
    await addDoc(collection(db, "orders"), {
      name,
      mobile,
      product,
      address,
      payment,
      transactionId: payment === "UPI" ? txn : "COD",
      status: payment === "UPI" ? "PAID" : "PENDING",
      createdAt: new Date()
    });

    alert("Order placed successfully ✅");

    // ✅ WhatsApp admin alert
    const msg = `
🛍️ New Order - SR FASHION HUB
Name: ${name}
Product: ${product}
Mobile: ${mobile}
Address: ${address}
Payment: ${payment}
Txn: ${payment === "UPI" ? txn : "COD"}
`;

    window.open(
      "https://wa.me/919966016696?text=" + encodeURIComponent(msg),
      "_blank"
    );

  } catch (e) {
    alert("Order failed ❌");
  }
};
