document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const SPACE_ID = "w8jw1fc4jmex"; // Replace with your Contentful Space ID
    const ACCESS_TOKEN = "AouzOmu_wgKEbiDxp6ID_hx7P5_VHcqOwEeDmVjskMY"; // Replace with your Management API Token

    try {
        const response = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/vnd.contentful.management.v1+json",
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                fields: {
                    name: { "en-US": name },
                    email: { "en-US": email },
                    message: { "en-US": message }
                }
            })
        });

        if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
        } else {
            alert("Error sending message.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});
