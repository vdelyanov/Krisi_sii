
import { createClient } from 'contentful-management';

const SPACE_ID = "w8jw1fc4jmex";
const CONTENTFUL_ACCESS_TOKEN = "CFPAT-y0B4yrKpAhYrlU7qtqeqjL9saUqiTr_jOFMtsmF5wqc";
const ENVIRONMENT_ID = 'master'; 

export async function submitContactForm(name, email, message) {
    const client = createClient({
        accessToken: CONTENTFUL_ACCESS_TOKEN,
    });

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);
        
        const entry = await environment.createEntry('contactForm', {
            fields: {
                name: { 'bg-BG': name },
                email: { 'bg-BG': email },
                message: { 'bg-BG': message },
            },
        });

       const button = document.querySelector("#submitBtn")
       const successmessage = document.querySelector(".success-message")
       
        button.classList.add('disabled')
        successmessage.classList.add('show')
       
       return entry;
    } catch (error) {
        const errormessage = document.querySelector(".error-message")

        errormessage.classList.add('show')
        console.error('Error submitting form:', error);
       
    }
}

