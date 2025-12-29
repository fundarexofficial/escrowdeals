"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Language } from "@/lib/translations"

const languages = [
  { code: "en" as Language, name: "English", flag: "🇬🇧" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  { code: "ar" as Language, name: "العربية", flag: "🇸🇦" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
  { code: "vi" as Language, name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh" as Language, name: "中文", flag: "🇨🇳" },
  { code: "th" as Language, name: "ไทย", flag: "🇹🇭" },
  { code: "it" as Language, name: "Italiano", flag: "🇮🇹" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const currentLanguage = languages.find((l) => l.code === language) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
          <Globe className="w-4 h-4 mr-2" />
          <span className="mr-1">{currentLanguage.flag}</span>
          {currentLanguage.code.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${
              language === lang.code ? "bg-slate-800" : ""
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
