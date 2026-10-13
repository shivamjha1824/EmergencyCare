
const form = document.getElementById("emergencyForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const getValue = (id, fallback = "Not Available") => {
        const element = document.getElementById(id);
        return element && element.value.trim()
            ? element.value.trim()
            : fallback;
    };

    const patient = {
        id: "RAD-" + Date.now().toString(36).toUpperCase(),
        name: getValue("patientName"),
        age: getValue("age") + " Years",
        gender: getValue("gender"),
        blood: getValue("bloodGroup"),
        emergency: getValue("emergencyType"),
        mechanism: getValue("mechanism"),
        injuryTime: getValue("injuryTime"),
        hospital: getValue("hospital"),
        attendant: getValue("attendantName"),
        phone: getValue("phone"),
        consciousness: getValue("consciousness"),
        gcs: getValue("gcs"),
        bp: getValue("bp"),
        spo2: getValue("spo2"),
        injuries: getValue("injuries"),
        redFlags: getValue("redFlags"),
        imaging: getValue("imagingHistory")
    };

    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };

    setText("patientId", patient.id);
    setText("resultName", patient.name);
    setText("resultAge", patient.age);
    setText("resultGender", patient.gender);
    setText("resultBlood", patient.blood);
    setText("resultEmergency", patient.emergency);
    setText("resultMechanism", patient.mechanism);
    setText("resultTime", patient.injuryTime);
    setText("resultHospital", patient.hospital);
    setText("resultConsciousness", patient.consciousness);
    setText("resultGCS", patient.gcs);
    setText("resultBP", patient.bp);
    setText("resultSpO2", patient.spo2);
    setText("resultImaging", patient.imaging);

    const showList = (id, text, prefix, emptyText) => {
        const box = document.getElementById(id);
        if (!box) return;

        box.replaceChildren();

        const items = text === "Not Available"
            ? []
            : text.split(",").map(item => item.trim()).filter(Boolean);

        if (items.length === 0) {
            const p = document.createElement("p");
            p.textContent = emptyText;
            box.appendChild(p);
            return;
        }

        items.forEach(item => {
            const p = document.createElement("p");
            p.textContent = prefix + item;
            box.appendChild(p);
        });
    };

    showList(
        "resultInjuries",
        patient.injuries,
        "🔴 ",
        "Not Available"
    );

    showList(
        "resultRedFlags",
        patient.redFlags,
        "⚠️ ",
        "No safety alerts reported"
    );

    /*
      DEMO QR ONLY:
      This QR identifies the demo session URL.
      It does NOT retrieve a saved patient record on another device.
      Do not use real patient information in this prototype.
    */

    const demoURL = window.location.href.split("#")[0];
    const qrText = demoURL + "?demo=" + encodeURIComponent(patient.id);
    const qrImage = document.getElementById("qrCode");

    if (qrImage) {
        qrImage.src =
            "https://api.qrserver.com/v1/create-qr-code/" +
            "?size=200x200&data=" +
            encodeURIComponent(qrText);

        qrImage.alt = "Demo QR code for " + patient.id;
    }

    const result = document.getElementById("result");

    if (result) {
        result.style.display = "block";
        result.scrollIntoView({ behavior: "smooth" });
    }
});
