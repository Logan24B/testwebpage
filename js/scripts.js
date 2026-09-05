/*!
* Softlutionic - Integración del formulario de contacto con la API en Azure
*/
const API_URL = "https://softlutionic-api-d6cxa5dmhnf4gxe2.westus-01.azurewebsites.net/api/contactos";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const btn = document.getElementById("submitButton");
    const okMsg = document.getElementById("submitSuccessMessage");
    const errMsg = document.getElementById("submitErrorMessage");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        okMsg.classList.add("d-none");
        errMsg.classList.add("d-none");

        // Validación nativa de Bootstrap
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        const contacto = {
            nombre: document.getElementById("name").value.trim(),
            correo: document.getElementById("email").value.trim(),
            telefono: document.getElementById("phone").value.trim(),
            mensaje: document.getElementById("message").value.trim()
        };

        btn.disabled = true;
        btn.textContent = "Enviando...";

        try {
            const resp = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contacto)
            });

            if (!resp.ok) throw new Error("HTTP " + resp.status);

            okMsg.classList.remove("d-none");
            form.reset();
            form.classList.remove("was-validated");
        } catch (err) {
            console.error("Error al enviar:", err);
            errMsg.classList.remove("d-none");
        } finally {
            btn.disabled = false;
            btn.textContent = "Enviar Solicitud";
        }
    });
});