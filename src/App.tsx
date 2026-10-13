import { useEffect, useMemo, useState } from 'react'
import { categories, initialProducts, type CategoryId, type Product } from './data/menu'

type View = 'home' | 'cart' | 'more' | 'admin'
type OrderMode = 'delivery' | 'pickup' | 'dine-in'
type CartItem = { key: string; product: Product; quantity: number; additions: string[]; note: string }

const phone = import.meta.env.VITE_RESTAURANT_WHATSAPP ?? '201020805451'
const currency = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 })

function Icon({ name }: { name: 'home' | 'bag' | 'cart' | 'more' | 'search' | 'arrow' | 'plus' | 'minus' | 'close' | 'admin' }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-6h6v6"/></>,
    bag: <><path d="M6 8h12l1 13H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    cart: <><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H7"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    search: <><circle cx="11" cy="11" r="6"/><path d="m20 20-4-4"/></>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    admin: <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 10h8M8 14h5"/></>,
  }
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function BrandMark() {
  return <div className="brand" aria-label="محمود"><span className="brand-dot"/>محمود<small>BURGER HOUSE</small></div>
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mahmoud-cart')
    const savedItems: Omit<CartItem, 'key'>[] | CartItem[] = saved ? JSON.parse(saved) : []
    return savedItems.map((item) => ({ ...item, key: 'key' in item ? item.key : `${item.product.id}-${crypto.randomUUID()}` }))
  })
  const [mode, setMode] = useState<OrderMode>('delivery')
  const [toast, setToast] = useState('')

  useEffect(() => localStorage.setItem('mahmoud-cart', JSON.stringify(cart)), [cart])
  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 2400)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.quantity * (item.product.price + item.additions.reduce((sum, name) => sum + (item.product.additions?.find((addition) => addition.name === name)?.price ?? 0), 0)), 0)
  const visibleProducts = useMemo(() => products.filter((product) => product.available && (activeCategory === 'all' || product.category === activeCategory) && `${product.name} ${product.description}`.includes(search.trim())), [activeCategory, products, search])
  const featured = products.filter((product) => product.featured && product.available)

  function addToCart(product: Product, additions: string[] = [], note = '') {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id && item.note === note && item.additions.join('|') === additions.join('|'))
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { key: `${product.id}-${crypto.randomUUID()}`, product, quantity: 1, additions, note }]
    })
    setSelected(null)
    setToast(`أضفنا ${product.name} للسلة`)
  }

  function changeQuantity(itemKey: string, direction: number) {
    setCart((current) => current.flatMap((item) => item.key === itemKey ? (item.quantity + direction > 0 ? [{ ...item, quantity: item.quantity + direction }] : []) : [item]))
  }

  function openWhatsApp() {
    const orderType = mode === 'delivery' ? 'توصيل' : mode === 'pickup' ? 'استلام من المطعم' : 'أكل داخل المكان'
    const items = cart.map((item) => {
      const extras = item.additions.length ? ` + ${item.additions.join('، ')}` : ''
      const note = item.note ? ` (ملاحظة: ${item.note})` : ''
      return `• ${item.quantity}× ${item.product.name}${extras}${note}`
    }).join('\n')
    const message = `أهلًا مطعم محمود 👋\n\nنوع الطلب: ${orderType}\n\nالطلب:\n${items}\n\nالإجمالي: ${currency.format(subtotal)}\n\nيرجى تأكيد الطلب والوقت المتوقع.`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  function goHome(category?: CategoryId) {
    setView('home')
    setActiveCategory(category ?? 'all')
    setSearch('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <main className="app-shell">
    <div className="notice"><span>نستقبل طلباتك يوميًا من ١٢ ظهرًا حتى ٢ صباحًا</span><strong>اطلب الآن</strong></div>
    <header className="topbar">
      <button className="icon-button" onClick={() => setView('cart')} aria-label="السلة"><Icon name="bag"/><span className={cartCount ? 'cart-badge' : 'cart-badge hidden'}>{cartCount}</span></button>
      <BrandMark />
      <button className="icon-button" onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })} aria-label="البحث"><Icon name="search"/></button>
    </header>

    {view === 'home' && <Home
      categories={categories}
      featured={featured}
      visibleProducts={visibleProducts}
      activeCategory={activeCategory}
      search={search}
      onSearch={setSearch}
      onCategory={goHome}
      onProduct={setSelected}
    />}
    {view === 'cart' && <CartView cart={cart} mode={mode} subtotal={subtotal} onMode={setMode} onBack={() => setView('home')} onChange={changeQuantity} onCheckout={openWhatsApp} />}
    {view === 'more' && <MoreView onAdmin={() => setView('admin')} />}
    {view === 'admin' && <AdminView products={products} onBack={() => setView('more')} onToggle={(id) => setProducts((current) => current.map((product) => product.id === id ? { ...product, available: !product.available } : product))} onPrice={(id, value) => setProducts((current) => current.map((product) => product.id === id ? { ...product, price: Math.max(1, value) } : product))} />}

    <nav className="bottom-nav" aria-label="التنقل الرئيسي">
      <NavButton active={view === 'home'} icon="home" label="الرئيسية" onClick={() => goHome()} />
      <NavButton active={false} icon="bag" label="طلباتي" onClick={() => setToast('سجل الطلبات سيكون متاحًا في النسخة القادمة')} />
      <NavButton active={view === 'cart'} icon="cart" label="السلة" onClick={() => setView('cart')} badge={cartCount} />
      <NavButton active={view === 'more' || view === 'admin'} icon="more" label="المزيد" onClick={() => setView('more')} />
    </nav>

    {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />}
    {toast && <div className="toast">{toast}</div>}
  </main>
}

function Home({ categories, featured, visibleProducts, activeCategory, search, onSearch, onCategory, onProduct }: { categories: typeof import('./data/menu').categories; featured: Product[]; visibleProducts: Product[]; activeCategory: CategoryId | 'all'; search: string; onSearch: (value: string) => void; onCategory: (category?: CategoryId) => void; onProduct: (product: Product) => void }) {
  return <>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">صنع يومك على مزاجك</span><h1>برجر كبير.<br/><em>مزاج أحسن.</em></h1><p>طازة، جريئة، ومصنوعة عشان تخليك ترجع تاني.</p><button className="primary-button" onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}>اكتشف المنيو <Icon name="arrow"/></button></div>
      <div className="hero-art"><span className="hero-sticker">NEW<br/>CRUSH</span><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=90" alt="برجر محمود"/></div>
    </section>

    <section className="mode-banner"><div><span className="mode-dots"><i/><i/><i/></span><strong>طلبك على طريقتك</strong><p>توصيل، استلام أو أكل في المكان</p></div><span className="mode-arrow">←</span></section>

    <section className="section categories-section"><div className="section-heading"><div><span className="eyebrow">اختار مزاجك</span><h2>الأقسام</h2></div><button onClick={() => onCategory()}>شوف الكل</button></div><div className="category-row">{categories.map((category) => <button className="category-card" key={category.id} onClick={() => onCategory(category.id)}><span>{category.emoji}</span><strong>{category.name}</strong></button>)}</div></section>

    <section className="section feature-section"><div className="section-heading"><div><span className="eyebrow">الاختيار الآمن</span><h2>الأكثر طلبًا</h2></div><button onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}>كل المنيو</button></div><div className="feature-grid">{featured.slice(0, 3).map((product) => <ProductCard product={product} key={product.id} onClick={() => onProduct(product)} featured />)}</div></section>

    <section className="section discover-section" id="discover"><div className="section-heading"><div><span className="eyebrow">كل حاجة حلوة هنا</span><h2>اكتشف المنيو</h2></div><div className="search-box"><Icon name="search"/><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="دور على اللي نفسك فيه" aria-label="البحث في المنيو"/></div></div><div className="filter-row"><button className={activeCategory === 'all' ? 'active' : ''} onClick={() => onCategory()}>الكل</button>{categories.map((category) => <button key={category.id} className={activeCategory === category.id ? 'active' : ''} onClick={() => onCategory(category.id)}>{category.name}</button>)}</div><div className="menu-list">{visibleProducts.length ? visibleProducts.map((product) => <ProductCard product={product} key={product.id} onClick={() => onProduct(product)} />) : <p className="empty-state">مفيش نتائج مطابقة. جرّب كلمة تانية.</p>}</div></section>
    <footer className="footer"><BrandMark/><p>أكل معمول بحب في قلب القاهرة.</p><small>© ٢٠٢٦ محمود برجر هاوس — مشروع عرض تجريبي.</small></footer>
  </>
}

function ProductCard({ product, onClick, featured = false }: { product: Product; onClick: () => void; featured?: boolean }) {
  return <button className={featured ? 'product-card featured-card' : 'product-card'} onClick={onClick}><div className="product-image"><img src={product.image} alt=""/>{product.badge && <span>{product.badge}</span>}</div><div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><strong>{currency.format(product.price)}</strong></div><span className="card-arrow"><Icon name="arrow"/></span></button>
}

function ProductModal({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (product: Product, additions: string[], note: string) => void }) {
  const [additions, setAdditions] = useState<string[]>([])
  const [note, setNote] = useState('')
  const price = product.price + additions.reduce((total, name) => total + (product.additions?.find((addition) => addition.name === name)?.price ?? 0), 0)
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><article className="product-modal" role="dialog" aria-modal="true" aria-label={product.name} onMouseDown={(event) => event.stopPropagation()}><button className="close-button" onClick={onClose} aria-label="إغلاق"><Icon name="close"/></button><img className="modal-image" src={product.image} alt={product.name}/><div className="modal-body"><span className="eyebrow">اختيار محمود</span><div className="modal-title"><h2>{product.name}</h2><strong>{currency.format(product.price)}</strong></div><p>{product.description}</p>{product.additions?.length ? <div className="additions"><h3>زوّد اللي بتحبه <small>اختياري</small></h3>{product.additions.map((addition) => <label key={addition.name}><input type="checkbox" checked={additions.includes(addition.name)} onChange={() => setAdditions((current) => current.includes(addition.name) ? current.filter((name) => name !== addition.name) : [...current, addition.name])}/><span>{addition.name}</span><b>+{currency.format(addition.price)}</b></label>)}</div> : null}<label className="note-field"><span>ملاحظاتك</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="مثلاً: من غير بصل" rows={2}/></label><button className="primary-button full" onClick={() => onAdd(product, additions, note)}>أضف للسلة <strong>{currency.format(price)}</strong></button></div></article></div>
}

function CartView({ cart, mode, subtotal, onMode, onBack, onChange, onCheckout }: { cart: CartItem[]; mode: OrderMode; subtotal: number; onMode: (mode: OrderMode) => void; onBack: () => void; onChange: (itemKey: string, direction: number) => void; onCheckout: () => void }) {
  const modes: { id: OrderMode; title: string; subtitle: string }[] = [{ id: 'delivery', title: 'توصيل', subtitle: 'لحد باب البيت' }, { id: 'pickup', title: 'استلام', subtitle: 'جاهز في الفرع' }, { id: 'dine-in', title: 'أكل في المكان', subtitle: 'نحضره على مزاجك' }]
  return <section className="cart-page"><button className="back-link" onClick={onBack}>→ رجوع للمنيو</button><span className="eyebrow">جاهز للطلب؟</span><h1>سلتك</h1>{cart.length === 0 ? <div className="cart-empty"><div>🍔</div><h2>لسه السلة فاضية</h2><p>اختار حاجة تظبط مودك ونرجع هنا.</p><button className="primary-button" onClick={onBack}>شوف المنيو</button></div> : <><div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.key}><img src={item.product.image} alt=""/><div><h3>{item.product.name}</h3>{item.additions.length ? <p>{item.additions.join('، ')}</p> : null}{item.note ? <p>“{item.note}”</p> : null}<strong>{currency.format(item.product.price)}</strong></div><div className="quantity"><button onClick={() => onChange(item.key, 1)}><Icon name="plus"/></button><span>{item.quantity}</span><button onClick={() => onChange(item.key, -1)}><Icon name="minus"/></button></div></article>)}</div><div className="order-mode"><div className="section-heading"><div><span className="eyebrow">تختار إزاي؟</span><h2>طريقة الطلب</h2></div></div><div className="mode-options">{modes.map((item) => <button key={item.id} className={mode === item.id ? 'active' : ''} onClick={() => onMode(item.id)}><strong>{item.title}</strong><span>{item.subtitle}</span></button>)}</div></div><div className="checkout"><div><span>إجمالي الطلب</span><strong>{currency.format(subtotal)}</strong></div><button className="primary-button full" onClick={onCheckout}>كمّل على واتساب <Icon name="arrow"/></button><small>هتقدر تراجع العنوان والتأكيد مع المطعم على واتساب.</small></div></>}</section>
}

function MoreView({ onAdmin }: { onAdmin: () => void }) {
  return <section className="more-page"><span className="eyebrow">في خدمتك</span><h1>المزيد</h1><a className="contact-card" href="tel:01020805451"><span>☎</span><div><strong>كلّم محمود</strong><small>01020805451</small></div><Icon name="arrow"/></a><div className="more-list"><button onClick={onAdmin}><span><Icon name="admin"/></span><div><strong>لوحة الإدارة</strong><small>إدارة المنيو والعروض</small></div><Icon name="arrow"/></button><button onClick={() => window.alert('ساعات العمل: يوميًا من ١٢ ظهرًا حتى ٢ صباحًا')}><span>◷</span><div><strong>ساعات العمل</strong><small>يوميًا ١٢ م — ٢ ص</small></div><Icon name="arrow"/></button><button onClick={() => window.alert('هذه النسخة التجريبية لا تحتوي على نظام نقاط بعد.')}><span>✦</span><div><strong>نادي محمود</strong><small>قريبًا</small></div><Icon name="arrow"/></button></div></section>
}

function AdminView({ products, onBack, onToggle, onPrice }: { products: Product[]; onBack: () => void; onToggle: (id: string) => void; onPrice: (id: string, value: number) => void }) {
  return <section className="admin-page"><button className="back-link" onClick={onBack}>→ رجوع</button><div className="admin-intro"><span className="eyebrow">وضع العرض</span><h1>لوحة محمود</h1><p>هذه لوحة تشغيل تجريبية. في النسخة المنشورة ستُحمى بـFirebase Authentication وتكتب البيانات إلى Firestore.</p></div><div className="admin-stats"><div><small>إجمالي المنتجات</small><strong>{products.length}</strong></div><div><small>متاح الآن</small><strong>{products.filter((product) => product.available).length}</strong></div><div><small>مميز</small><strong>{products.filter((product) => product.featured).length}</strong></div></div><div className="admin-table"><div className="admin-table-head"><span>المنتج</span><span>السعر</span><span>الحالة</span></div>{products.map((product) => <div className="admin-row" key={product.id}><div><img src={product.image} alt=""/><span><strong>{product.name}</strong><small>{categories.find((category) => category.id === product.category)?.name}</small></span></div><label><input type="number" value={product.price} min="1" onChange={(event) => onPrice(product.id, Number(event.target.value))}/><small>ج.م</small></label><button className={product.available ? 'status available' : 'status'} onClick={() => onToggle(product.id)}>{product.available ? 'متاح' : 'مخفي'}</button></div>)}</div></section>
}

function NavButton({ active, icon, label, onClick, badge }: { active: boolean; icon: 'home' | 'bag' | 'cart' | 'more'; label: string; onClick: () => void; badge?: number }) {
  return <button className={active ? 'active' : ''} onClick={onClick}><span className="nav-icon"><Icon name={icon}/>{badge ? <i>{badge}</i> : null}</span><small>{label}</small></button>
}
