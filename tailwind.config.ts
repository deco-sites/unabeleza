import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
      screens: {
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      },
    },
    extend: {
      boxShadow: {
        'custom': '1.28px 1.28px 5.12px 0px rgba(0, 0, 0, 0.25)', // 0.25 equivale a #00000040
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      spacing: {
        15: "60px",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
    screens: {
      phone: { max: "768px" },
      mobile: { max: "1025px" },
      desktop: { min: "1026px" },
    },
  },
};
