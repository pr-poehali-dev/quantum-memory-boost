import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"

type Account = {
  id: number
  rank: string
  hours: number
  price: number
  badge: string
  features: string[]
}

const defaultAccounts: Account[] = [
  {
    id: 1,
    rank: "Серебро — Золотая Звезда",
    hours: 120,
    price: 990,
    badge: "СТАРТ",
    features: ["Чистая история", "Базовый инвентарь", "Мгновенная передача"],
  },
  {
    id: 2,
    rank: "АК — Двойной АК",
    hours: 320,
    price: 2490,
    badge: "ПРО",
    features: ["Скины в инвентаре", "Гарантия 14 дней", "Без VAC-банов"],
  },
  {
    id: 3,
    rank: "Легендарный Орёл",
    hours: 510,
    price: 4990,
    badge: "ЛЕГЕНДА",
    features: ["Редкие скины", "Гарантия 30 дней", "Чистый профиль"],
  },
  {
    id: 4,
    rank: "Мастер-Хранитель",
    hours: 800,
    price: 3990,
    badge: "ЭЛИТА",
    features: ["Ножи в инвентаре", "Гарантия 30 дней", "Без ограничений"],
  },
]

type Props = {
  open: boolean
  onClose: () => void
}

export function AccountsModal({ open, onClose }: Props) {
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAccount, setNewAccount] = useState({
    rank: "",
    hours: "",
    price: "",
    badge: "",
    features: "",
  })

  if (!open) return null

  const handleAdd = () => {
    if (!newAccount.rank || !newAccount.price) return
    const account: Account = {
      id: Date.now(),
      rank: newAccount.rank,
      hours: Number(newAccount.hours) || 0,
      price: Number(newAccount.price) || 0,
      badge: newAccount.badge || "НОВЫЙ",
      features: newAccount.features.split(",").map((f) => f.trim()).filter(Boolean),
    }
    setAccounts((prev) => [...prev, account])
    setNewAccount({ rank: "", hours: "", price: "", badge: "", features: "" })
    setShowAddForm(false)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border-2 border-white/10 bg-black/80 backdrop-blur-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white font-open-sans-custom">Каталог аккаунтов</h2>
            <p className="text-gray-400 text-sm mt-0.5 font-open-sans-custom">Steam CS2 — проверенные аккаунты</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 border font-open-sans-custom"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Icon name="Plus" size={16} className="mr-1.5" />
              Добавить аккаунт
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Add form */}
        {showAddForm && (
          <div className="px-6 py-4 border-b border-white/10 bg-white/5">
            <h3 className="text-white font-semibold mb-3 font-open-sans-custom">Новый аккаунт</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div>
                <Label className="text-gray-300 text-xs font-open-sans-custom">Ранг</Label>
                <Input
                  value={newAccount.rank}
                  onChange={(e) => setNewAccount((p) => ({ ...p, rank: e.target.value }))}
                  placeholder="Золотая Звезда"
                  className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs font-open-sans-custom">Часов в игре</Label>
                <Input
                  value={newAccount.hours}
                  onChange={(e) => setNewAccount((p) => ({ ...p, hours: e.target.value }))}
                  placeholder="150"
                  type="number"
                  className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs font-open-sans-custom">Цена (₽)</Label>
                <Input
                  value={newAccount.price}
                  onChange={(e) => setNewAccount((p) => ({ ...p, price: e.target.value }))}
                  placeholder="1990"
                  type="number"
                  className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs font-open-sans-custom">Метка</Label>
                <Input
                  value={newAccount.badge}
                  onChange={(e) => setNewAccount((p) => ({ ...p, badge: e.target.value }))}
                  placeholder="ПРО"
                  className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm"
                />
              </div>
            </div>
            <div className="mt-3">
              <Label className="text-gray-300 text-xs font-open-sans-custom">Особенности (через запятую)</Label>
              <Input
                value={newAccount.features}
                onChange={(e) => setNewAccount((p) => ({ ...p, features: e.target.value }))}
                placeholder="Без банов, Гарантия 14 дней, Скины"
                className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleAdd} className="bg-white text-black hover:bg-gray-100 font-open-sans-custom">
                Добавить
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-white font-open-sans-custom">
                Отмена
              </Button>
            </div>
          </div>
        )}

        {/* Accounts grid */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-white/10 text-white border-white/20 font-open-sans-custom text-xs">
                  {acc.badge}
                </Badge>
                <span className="text-2xl font-bold text-white font-mono">
                  {acc.price.toLocaleString("ru-RU")} ₽
                </span>
              </div>
              <p className="text-white font-semibold font-open-sans-custom mb-1">{acc.rank}</p>
              <p className="text-gray-400 text-sm font-open-sans-custom mb-3">
                <Icon name="Clock" size={13} className="inline mr-1 opacity-60" />
                {acc.hours}+ часов
              </p>
              <ul className="space-y-1 mb-4">
                {acc.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm font-open-sans-custom">
                    <Icon name="Check" size={13} className="text-white flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                size="sm"
                className="w-full bg-white text-black hover:bg-gray-100 font-open-sans-custom text-xs"
              >
                Купить аккаунт
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
