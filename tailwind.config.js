const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "selector", // Still use 'class' mode for dark mode
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                "dark-bg": "#313338",

                "dark-text": "#949BA4",
                "dark-text-highlight" : "#F2F3F5",

                "dark-card" : "#1E1F22", 
                "dark-secondary-card" : "#2B2D31", 
                "dark-elevate" : "#404249", 
                
                "dark-border" : "#444444"
            },
            fontSize : {
                "logo" : '30px', 
                "h1" : "24px", 
                "h2" : "20px", 
                "h3" : "18px", 
                "normal" : "16px", 
                "small" : "14px", 
            }, 

            borderRadius : {
                "normal" : "20px", 
                "small" : "10px",
                "mini" : "5px"
            }, 

            width : {
                "half" : "50%", 
                "45%" : "45%"
            }, 

            screens : {
                'mobile' : '0px',
                'tablet' : '650px', 
                'desktop' : '835px'
            }
        },
    },
    plugins: [ flowbite.plugin()],
};
