
const SUPABASE_URL = "https://pkqksekvxvklwhotnfzf.supabase.co";
const SUPABASE_KEY = "sb_publishable_cgNW2DK1gzwejrOuhiiNQA_4DMFaQ-a";

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "ກຳລັງລົງທະບຽນ...";

    const studentData = {
        first_name: document.getElementById("first_name").value.trim(),
        last_name: document.getElementById("last_name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        major: document.getElementById("major").value,
        study_year: Number(document.getElementById("study_year").value)
    };

    try {
        const response = await fetch(
            `${SUPABASE_URL}/functions/v1/register-student`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY
                },
                body: JSON.stringify(studentData)
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || result.error || "ລົງທະບຽນບໍ່ສຳເລັດ");
        }

if (!result.qr_token) {
    throw new Error("QR Token not found");
}

// ສະແດງຜົນການລົງທະບຽນ
form.style.display = "none";

const qrResult = document.getElementById("qrResult");
qrResult.style.display = "block";

// ລ້າງ QR Code ເກົ່າ
const qrBox = document.getElementById("qrcode");
qrBox.innerHTML = "";

// ສ້າງ QR Code ໃໝ່
new QRCode(qrBox, {
    text: result.qr_token,
    width: 220,
    height: 220
});
    } catch (error) {
        alert("ຂໍອະໄພ: " + error.message);
} finally {
    if (form.style.display !== "none") {
        button.disabled = false;
        button.textContent = "ລົງທະບຽນ";
    }
}
});
