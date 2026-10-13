export type CategoryId = 'burgers' | 'fries' | 'chicken' | 'drinks' | 'shakes' | 'extras'

export type Category = {
  id: CategoryId
  name: string
  emoji: string
}

export type Product = {
  id: string
  category: CategoryId
  name: string
  description: string
  price: number
  image: string
  featured?: boolean
  badge?: string
  available: boolean
  additions?: { name: string; price: number }[]
}

export const categories: Category[] = [
  { id: 'burgers', name: 'برجر', emoji: '🍔' },
  { id: 'fries', name: 'فرايز', emoji: '🍟' },
  { id: 'chicken', name: 'تشيكن', emoji: '🍗' },
  { id: 'drinks', name: 'مشروبات', emoji: '🥤' },
  { id: 'shakes', name: 'شيك', emoji: '🥛' },
  { id: 'extras', name: 'إضافات', emoji: '✨' },
]

export const initialProducts: Product[] = [
  {
    id: 'mahmoud-smash',
    category: 'burgers',
    name: 'محمود سماش',
    description: 'دبل سماش، جبنة أمريكي، بصل مكرمل وصوص محمود الخاص.',
    price: 195,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=82',
    featured: true,
    badge: 'الأكثر طلبًا',
    available: true,
    additions: [{ name: 'قطعة لحم زيادة', price: 55 }, { name: 'جبنة زيادة', price: 20 }],
  },
  {
    id: 'fire-crunch',
    category: 'burgers',
    name: 'فاير كرنش',
    description: 'تشيكن كرسبي، كول سلو، هالبينو وصوص حار متوازن.',
    price: 175,
    image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=900&q=82',
    featured: true,
    badge: 'جديد',
    available: true,
    additions: [{ name: 'هالبينو زيادة', price: 12 }, { name: 'جبنة زيادة', price: 20 }],
  },
  {
    id: 'triple-cheese',
    category: 'burgers',
    name: 'تريبل تشيز',
    description: 'ثلاث طبقات جبنة، لحم مشوي وصوص مدخن غني.',
    price: 215,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=82',
    featured: true,
    available: true,
  },
  {
    id: 'golden-fries',
    category: 'fries',
    name: 'جولدن فرايز',
    description: 'بطاطس مقرمشة متبلة بتوابل البيت.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=82',
    featured: true,
    available: true,
    additions: [{ name: 'صوص جبنة', price: 25 }, { name: 'بيف بيكون', price: 35 }],
  },
  {
    id: 'loaded-fries',
    category: 'fries',
    name: 'لودد فرايز',
    description: 'فرايز، جبنة سايحة، بيف بيكون وصوص تشيبوتلي.',
    price: 125,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=82',
    available: true,
  },
  {
    id: 'tenders-box',
    category: 'chicken',
    name: 'بوكس تندرز',
    description: '4 قطع تندرز مقرمشة مع صوصين من اختيارك.',
    price: 145,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?auto=format&fit=crop&w=900&q=82',
    available: true,
  },
  {
    id: 'cola',
    category: 'drinks',
    name: 'كولا باردة',
    description: 'علبة 330 مل.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=82',
    available: true,
  },
  {
    id: 'lotus-shake',
    category: 'shakes',
    name: 'لوتس شيك',
    description: 'آيس كريم فانيليا، لوتس وكريمة طازجة.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=82',
    available: true,
  },
  {
    id: 'dip-duo',
    category: 'extras',
    name: 'صوصات الدار',
    description: 'اختيار صوصين: محمود، رانش، باربكيو أو سبايسي.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=900&q=82',
    available: true,
  },
]
