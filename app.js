function loadPage(page) {
    const content = document.getElementById("content");

    const pages = {
        dashboard: `<h2>Dashboard</h2><p>Dashboard Overview</p>`,
        stock: `<h2>Stock</h2><p>Stock List & Management</p>`,
        purchase: `<h2>Purchase (입고)</h2><p>Purchase Form & History</p>`,
        outgoing: `<h2>Outgoing (출고)</h2><p>Outgoing Management</p>`,
        production: `<h2>Production</h2><p>Production LOT System</p>`,
        outsourcing: `<h2>Outsourcing</h2><p>Send to Factory / Receive</p>`,
        finished: `<h2>Finished Goods</h2><p>Finished Products Inventory</p>`,
        employees: `<h2>Employees</h2><p>Employee List</p>`,
        attendance: `<h2>Attendance</h2><p>Check-in / Check-out Records</p>`,
        payroll: `<h2>Payroll</h2><p>Monthly Salary Calculation</p>`,
        logs: `<h2>Logs</h2><p>System Log Records</p>`,
        settings: `<h2>Settings</h2><p>System Language / Options</p>`
    };

    content.innerHTML = pages[page] || "<h2>Page Not Found</h2>";
}

function setLanguage(lang) {
    alert("Language changed to: " + lang);
}
// =============================
// 출근 기록 저장
// =============================
async function clockIn() {
    const employee = JSON.parse(localStorage.getItem("HTORI_USER"));
    if (!employee) return alert("로그인이 필요합니다.");

    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];  
    const timeStr = today.toTimeString().split(" ")[0]; 

    await set(ref(db, `attendance/${employee.id}/${dateStr}/checkIn`), timeStr);

    alert("출근 완료!");
    loadAttendanceUI();
}

// =============================
// 퇴근 기록 저장
// =============================
async function clockOut() {
    const employee = JSON.parse(localStorage.getItem("HTORI_USER"));
    if (!employee) return alert("로그인이 필요합니다.");

    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];
    const timeStr = today.toTimeString().split(" ")[0];

    // Check In 기록 불러오기
    const checkInSnap = await get(ref(db, `attendance/${employee.id}/${dateStr}/checkIn`));

    if (!checkInSnap.exists()) {
        alert("출근 기록이 없습니다.");
        return;
    }

    const checkInTime = checkInSnap.val();

    // 근무시간 계산
    const workHours = calcHours(checkInTime, timeStr);

    await set(ref(db, `attendance/${employee.id}/${dateStr}`), {
        checkIn: checkInTime,
        checkOut: timeStr,
        workHours: workHours
    });

    alert("퇴근 완료!");
    loadAttendanceUI();
}

// =============================
// 근무시간 계산 함수
// =============================
function calcHours(inTime, outTime) {
    const [ih, im, is] = inTime.split(":").map(Number);
    const [oh, om, os] = outTime.split(":").map(Number);

    const inDate = new Date(0,0,0, ih, im, is);
    const outDate = new Date(0,0,0, oh, om, os);

    const diff = (outDate - inDate) / 1000 / 3600;
    return Math.round(diff * 100) / 100;
}
localStorage.setItem("HTORI_USER", JSON.stringify({
    id: empId,
    name: emp.name,
}));
