import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("language") || "en";

const resources = {
  en: {
    translation: {
      deliveryAddress: "Delivery Address",
      searchPlaceholder: "Search 10000+ products",
      login: "Login",
      welcomeMessage: "Welcome to our Website!",
    },
  },
  hi: {
    translation: {
      deliveryAddress: "डिलीवरी का पता",
      searchPlaceholder: "10000+ उत्पाद खोजें",
      login: "लॉगिन",
      welcomeMessage: "हमारी वेबसाइट पर आपका स्वागत है!",
    },
  },
  mr: {
    translation: {
      deliveryAddress: "वितरणाचा पत्ता",
      searchPlaceholder: "10000+ उत्पादने शोधा",
      login: "लॉगिन",
      welcomeMessage: "आमच्या वेबसाइटवर आपले स्वागत आहे!",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // Load saved language or default "en"
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
