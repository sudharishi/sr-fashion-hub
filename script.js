// ✅ Firebase CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

// ================= PLACE ORDER =================
window.placeOrder = async function () {
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const product = document.getElementById("product").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;
  const txn = document.getElementById("txn").value;

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

    // ✅ WhatsApp Alert
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
