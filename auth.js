import { auth } from "./firebase/firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginId").value;
  const pw = document.getElementById("loginPw").value;

  signInWithEmailAndPassword(auth, email, pw)
    .then(user => {
      localStorage.setItem("uid", user.user.uid);
      window.location.href = "index.html";
    })
    .catch(() => alert("Login failed"));
});
