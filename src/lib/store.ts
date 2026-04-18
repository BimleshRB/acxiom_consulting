import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'admin' | 'vendor' | 'user'

export type User = {
  id: string
  name: string
  email: string
  role: Role
  category?: string
}

export type CartItem = {
  productId: string
  name: string
  price: number
  imageUrl: string
  vendorId: string
  quantity: number
}

type StoreState = {
  currentUser: User | null
  cart: CartItem[]
  
  setCurrentUser: (user: User | null) => void
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setLogout: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      currentUser: null,
      cart: [],

      setCurrentUser: (user) => set({ currentUser: user }),
      setLogout: () => set({ currentUser: null, cart: [] }),
      
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(c => c.productId === item.productId)
        if (existing) {
          return {
            cart: state.cart.map(c => c.productId === item.productId ? { ...c, quantity: c.quantity + (item.quantity || 1) } : c)
          }
        }
        return { cart: [...state.cart, { ...item, quantity: item.quantity || 1 }] }
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(c => c.productId !== productId)
      })),
      
      updateCartQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(c => c.productId === productId ? { ...c, quantity } : c)
      })),
      
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'ems-session-storage',
    }
  )
)
