import { NavLink } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

export default function SideNav() {
  const { t } = useLanguage();

  const items = [
    { to: "/intake", label: t("nav_intake"), icon: "assignment" },
    { to: "/medical-input", label: t("nav_medical"), icon: "medical_services" },
    { to: "/dashboard", label: t("nav_dashboard"), icon: "dashboard" },
    { to: "/cost-breakdown", label: t("nav_breakdown"), icon: "payments" },
    { to: "/action-plan", label: t("nav_action"), icon: "lightbulb" },
    { to: "/schemes", label: t("nav_schemes"), icon: "account_balance" },
    { to: "/insurances", label: t("nav_insurances"), icon: "security" },
  ];

  return (
    <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] py-lg w-64 fixed left-0 top-16 bg-surface-container-low shadow-md z-40 overflow-y-auto custom-scrollbar">
      <div className="px-md mb-lg">
        <h2 className="font-headline-sm text-headline-sm text-primary">{t("nav_planning") || "Financial Planning"}</h2>
        <p className="font-label-sm text-label-sm text-on-surface-variant">{t("nav_clarity") || "Empathetic Clarity"}</p>
      </div>
      <nav className="flex-1 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-sm px-4 py-3 font-label-md text-label-md transition-transform duration-150 ${
                isActive
                  ? "text-primary font-bold border-r-4 border-primary bg-surface-container-highest"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-md mt-auto pt-md space-y-sm">
        <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all flex items-center justify-center gap-xs shadow-md">
          <span className="material-symbols-outlined text-[18px]">download</span>
          {t("nav_download")}
        </button>
        <div className="flex flex-col gap-2 border-t border-outline-variant pt-md">
          <a className="flex items-center gap-sm text-on-surface-variant font-label-md hover:text-primary" href="#">
            <span className="material-symbols-outlined text-sm">help</span>{t("nav_support")}
          </a>
          <a className="flex items-center gap-sm text-on-surface-variant font-label-md hover:text-primary" href="#">
            <span className="material-symbols-outlined text-sm">shield</span>{t("nav_privacy")}
          </a>
        </div>
      </div>
    </aside>
  );
}
