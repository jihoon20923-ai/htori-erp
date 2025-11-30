// app.js  - 출근/퇴근 전용 깔끔 버전

// -----------------------------
// 1. Firebase import & 초기화
// -----------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1O8MltMEonyhbOXxYt1qN_PqQ9BqpI4M",
  authDomain: "htori-erp.firebaseapp.com",
  databaseURL: "https://htori-erp-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "htori-erp",
  storageBucket: "htori-erp.firebasestorage.app",
  messagingSenderId: "548265375862",
  appId: "1:548265375862:web:01acd31b9c4c42cfc6c757",
  measurementId: "G-ZGM2RDJVKX"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// -----------------------------
// 2. 로그인한 사용자 정보 처리
//    (login.html 에서   index.html?role=employee&id=EMP-0001  이런 식으로 넘어온다고 가정)
// -----------------------------
let currentUser = null;

function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function loadUserFromUrlOrLocal() {
  // ① URL 에서 먼저 꺼내보기
  const idFromUrl   = getParam("id");
  const roleFromUrl = getParam("role") || "employee";

  if (idFromUrl) {
    currentUser = { id: idFromUrl, role: roleFromUrl };
    localStorage.setItem("HTORI_USER", JSON.stringify(currentUser));
    return;
  }

  // ② localStorage 에 저장된 게 있으면 사용
  const saved = localStorage.getItem("HTORI_USER");
  if (saved) {
    currentUser = JSON.parse(saved);
  }
}

// -----------------------------
// 3. 오늘 날짜/시간 유틸
// -----------------------------
function getTodayDateStr() {
  return new Date().toISOString().split("T")[0]; // yyyy-MM-dd
}

function getNowTimeStr() {
  return new Date().toTimeString().slice(0, 8);  // HH:mm:ss
}

function calcHours(inTime, outTime) {
  const [ih, im, is] = inTime.split(":").map(Number);
  const [oh, om, os] = outTime.split(":").map(Number);

  const inDate  = new Date(0, 0, 0, ih, im, is);
  const outDate = new Date(0, 0, 0, oh, om, os);

  const diffHours = (outDate - inDate) / 1000 / 3600;
  return Math.round(diffHours * 100) / 100; // 소수 둘째 자리까지
}

// -----------------------------
// 4. 오늘 출퇴근 정보 화면에 표시
// -----------------------------
async function loadAttendanceInfo() {
  const infoDiv = document.getElementById("attInfo");

  if (!currentUser) {
    infoDiv.innerHTML = "<p>로그인 정보가 없습니다.</p>";
    return;
  }

  const today = getTodayDateStr();
  const snap  = await get(ref(db, `attendance/${currentUser.id}/${today}`));

  if (!snap.exists()) {
    infoDiv.innerHTML = "<p>오늘 출퇴근 기록이 없습니다.</p>";
    return;
  }

  const data = snap.val();

  infoDiv.innerHTML = `
    <h3>오늘 출퇴근 기록</h3>
    <p>직원: ${currentUser.id} (${currentUser.role})</p>
    <p>출근: ${data.checkIn || "-"}</p>
    <p>퇴근: ${data.checkOut || "-"}</p>
    <p>근무시간: ${data.workHours || "-"} 시간</p>
  `;
}

// -----------------------------
// 5. 출근 / 퇴근 함수 (버튼에서 호출)
// -----------------------------
async function doClockIn() {
  if (!currentUser) {
    alert("로그인이 필요합니다.");
    return;
  }

  const today   = getTodayDateStr();
  const nowTime = getNowTimeStr();

  // 이미 출근했는지 체크
  const snap = await get(ref(db, `attendance/${currentUser.id}/${today}/checkIn`));
  if (snap.exists()) {
    alert("이미 출근 기록이 있습니다.");
    return;
  }

  await set(ref(db, `attendance/${currentUser.id}/${today}/checkIn`), nowTime);

  alert("출근 완료!");
  loadAttendanceInfo();
}

async function doClockOut() {
  if (!currentUser) {
    alert("로그인이 필요합니다.");
    return;
  }

  const today   = getTodayDateStr();
  const nowTime = getNowTimeStr();

  const baseRef   = ref(db, `attendance/${currentUser.id}/${today}`);
  const baseSnap  = await get(baseRef);

  if (!baseSnap.exists() || !baseSnap.val().checkIn) {
    alert("출근 기록이 없습니다.");
    return;
  }

  const checkInTime = baseSnap.val().checkIn;
  const hours       = calcHours(checkInTime, nowTime);

  await set(baseRef, {
    checkIn:  checkInTime,
    checkOut: nowTime,
    workHours: hours
  });

  alert("퇴근 완료!");
  loadAttendanceInfo();
}

// HTML 에서 사용할 수 있게 window에 붙이기
window.clockIn  = doClockIn;
window.clockOut = doClockOut;

// -----------------------------
// 6. 페이지 로드 시 초기화
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadUserFromUrlOrLocal();

  const userInfo = document.getElementById("userInfo");
  const welcome  = document.getElementById("welcomeText");

  if (currentUser) {
    userInfo.textContent = `${currentUser.id} (${currentUser.role})`;
    welcome.textContent  = `${currentUser.id} 님, 환영합니다.`;
  } else {
    welcome.textContent  = "로그인이 필요합니다. (login.html 로 이동해서 로그인)";
  }

  loadAttendanceInfo();
});
