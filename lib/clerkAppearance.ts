export const auroraClerkAppearance = {
  layout: {
    logoImageUrl: "/icons/auth-logo.svg",
    socialButtonsPlacement: "bottom" as const,
    socialButtonsVariant: "iconButton" as const,
  },
  variables: {
    colorBackground: "rgba(8, 11, 20, 0.92)",
    colorPrimary: "#7F5AF0",
    colorText: "#F7F9FF",
    colorTextSecondary: "#8F9BB7",
    colorInputBackground: "rgba(15, 18, 35, 0.65)",
    colorInputText: "#F7F9FF",
    fontFamily: "Manrope, Inter, ui-sans-serif, system-ui, sans-serif",
    borderRadius: "18px",
  },
  elements: {
    card:
      "bg-black-1/80 border border-black-6/50 backdrop-blur-2xl shadow-[0_24px_90px_rgba(8,11,20,0.65)] text-white-1", 
    headerTitle: "text-white-1 text-2xl font-semibold tracking-wide",
    headerSubtitle: "text-white-3",
    formButtonPrimary:
      "bg-gradient-to-r from-[#7F5AF0] via-[#5E7BF9] to-[#2CB1BC] px-4 py-3 text-white-1 font-semibold shadow-[0_18px_48px_rgba(95,123,249,0.45)] transition-[filter] hover:brightness-110",
    formButtonPrimary__loading:
      "bg-gradient-to-r from-[#7F5AF0] via-[#5E7BF9] to-[#2CB1BC]",
    formFieldInput:
      "bg-black-2/60 border border-black-6/60 text-white-1 placeholder:text-white-3 focus:border-[#7F5AF0] focus:ring-0",
    formFieldLabel: "text-white-4",
    footerActionText: "text-white-4",
    footerActionLink: "text-[#2CB1BC] hover:text-[#7F5AF0]",
    socialButtonsIconButton:
      "border border-black-6/50 bg-black-2/50 hover:bg-black-2/70",
    dividerLine: "bg-black-6/60",
    dividerText: "text-white-4",
  },
};
