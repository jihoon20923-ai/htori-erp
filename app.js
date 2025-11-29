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
