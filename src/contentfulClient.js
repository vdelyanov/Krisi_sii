
import { createClient } from 'contentful-management';

const SPACE_ID = "w8jw1fc4jmex"; // Replace with your Contentful Space ID
const CONTENTFUL_ACCESS_TOKEN = "AouzOmu_wgKEbiDxp6ID_hx7P5_VHcqOwEeDmVjskMY"; // Replace with your Management API Token
const ENVIRONMENT_ID = 'master'; // Usually "master"

export async function submitContactForm(name, email, message) {
    const client = createClient({
        accessToken: CONTENTFUL_ACCESS_TOKEN,
    });

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);
        
        const entry = await environment.createEntry('contactForm', {
            fields: {
                name: { 'en-US': name },
                email: { 'en-US': email },
                message: { 'en-US': message },
            },
        });

        console.log('Entry created:', entry);
        return entry;
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

