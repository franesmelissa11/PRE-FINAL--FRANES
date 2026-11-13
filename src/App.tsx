import { useState } from 'react'
import './App.css'

type Category = 'Tops' | 'Dress' | 'Outerwear'

type Product = {
  id: number
  name: string
  category: Category
  price: number
  stock: number
  color: string
  image: string
  tag?: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'The Sunday Shirt',
    category: 'Tops',
    price: 42,
    stock: 12,
    color: 'Soft ivory',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Petal Day Dress',
    category: 'Dress',
    price: 68,
    stock: 8,
    color: 'Garden floral',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Everyday Knit',
    category: 'Tops',
    price: 54,
    stock: 15,
    color: 'Warm butter',
    tag: 'New in',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'The Little Occasion',
    category: 'Dress',
    price: 76,
    stock: 5,
    color: 'Rosy red',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Sunday Market Tote',
    category: 'Tops',
    price: 38,
    stock: 10,
    color: 'Natural stripe',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'Cloud Nine Cardigan',
    category: 'Outerwear',
    price: 82,
    stock: 7,
    color: 'Oat milk',
    tag: 'Just arrived',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 7,
    name: 'Soft Structure Blazer',
    category: 'Outerwear',
    price: 96,
    stock: 4,
    color: 'Dusty rose',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 8,
    name: 'After Hours Dress',
    category: 'Dress',
    price: 72,
    stock: 6,
    color: 'Midnight blue',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85',
  },
]

const slides = [
  {
    eyebrow: 'A little something for your everyday',
    title: 'Get dressed\nlike you mean it.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90',
  },
  {
    eyebrow: 'Made for the moments that feel like you',
    title: 'Good days\nlook good on you.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=90',
  },
]

function Icon({ name, filled = false }: { name: 'bag' | 'heart' | 'sun' | 'moon' | 'arrow' | 'plus' | 'minus' | 'close'; filled?: boolean }) {
  const common = { width: 21, height: 21, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }

  if (name === 'bag') return <svg {...common}><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
  if (name === 'heart') return <svg {...common} fill={filled ? 'currentColor' : 'none'}><path d="M20.8 8.7c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" /></svg>
  if (name === 'sun') return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
  if (name === 'moon') return <svg {...common}><path d="M20.5 15.4A8.5 8.5 0 0 1 8.6 3.5 8.5 8.5 0 1 0 20.5 15.4Z" /></svg>
  if (name === 'arrow') return <svg {...common}><path d="M19 12H5m7 7-7-7 7-7" /></svg>
  if (name === 'plus') return <svg {...common}><path d="M12 5v14m-7-7h14" /></svg>
  if (name === 'minus') return <svg {...common}><path d="M5 12h14" /></svg>
  return <svg {...common}><path d="m18 6-12 12M6 6l12 12" /></svg>
}

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<Record<number, number>>({})
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('M')
  const [darkMode, setDarkMode] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const visibleProducts = category === 'All' ? products.slice(0, 4) : products.filter((product) => product.category === category)
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0)

  function toggleFavorite(id: number) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function openProduct(product: Product) {
    setSelectedProduct(product)
    setQuantity(1)
    setSize('M')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function addToCart(product: Product, amount: number) {
    setCart((current) => ({ ...current, [product.id]: Math.min(product.stock, (current[product.id] ?? 0) + amount) }))
  }

  function changeSlide(direction: number) {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <div className={`storefront${darkMode ? ' theme-dark' : ''}`}>
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => setSelectedProduct(null)} aria-label="Fashub home">
          <span className="brand-shadow">fashub</span><span className="brand-name">fashub</span><span className="brand-period">.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#featured">New in</a><a href="#products">Shop all</a><a href="#about">Our story</a>
        </nav>
        <div className="header-note">GOOD CLOTHES. GOOD MOOD.</div>
      </header>

      <aside className="action-rail" aria-label="Store actions">
        <button className="rail-button" type="button" aria-label={`Shopping bag, ${cartCount} items`} onClick={() => setCartOpen(true)}>
          <Icon name="bag" />{cartCount > 0 && <span className="rail-count">{cartCount}</span>}
        </button>
        <button className="rail-button" type="button" aria-label={`Wishlist, ${favorites.length} items`} onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
          <Icon name="heart" filled={favorites.length > 0} />{favorites.length > 0 && <span className="rail-count">{favorites.length}</span>}
        </button>
        <button className="rail-button" type="button" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setDarkMode((current) => !current)}>
          <Icon name={darkMode ? 'sun' : 'moon'} />
        </button>
      </aside>

      <main id="home" className="page-content">
        {selectedProduct ? (
          <section className="product-detail" aria-label={`${selectedProduct.name} details`}>
            <button type="button" className="back-link" onClick={() => setSelectedProduct(null)}><Icon name="arrow" /> Back to the good stuff</button>
            <div className="detail-layout">
              <div className="detail-image-wrap"><img className="detail-image" src={selectedProduct.image} alt={selectedProduct.name} /></div>
              <div className="detail-copy">
                <span className="eyebrow">{selectedProduct.category} / FASHUB EDIT</span>
                <h1>{selectedProduct.name}</h1>
                <p className="detail-price">${selectedProduct.price.toFixed(2)}</p>
                <p className="detail-description">Easy to wear, lovely to live in. A feel-good favorite made for wherever your day takes you.</p>
                <p className="detail-color"><span>Color</span>{selectedProduct.color}</p>
                <div className="size-label"><span>Size</span><span className="size-guide">Size guide</span></div>
                <div className="size-options" role="group" aria-label="Choose a size">
                  {['XS', 'S', 'M', 'L', 'XL'].map((option) => <button key={option} type="button" className={size === option ? 'size-option selected' : 'size-option'} onClick={() => setSize(option)}>{option}</button>)}
                </div>
                <p className="stock-note"><span className={selectedProduct.stock < 6 ? 'stock-dot low' : 'stock-dot'} />{selectedProduct.stock < 6 ? `Only ${selectedProduct.stock} left in stock` : `${selectedProduct.stock} in stock`}</p>
                <div className="detail-actions">
                  <div className="quantity-control" aria-label="Quantity">
                    <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Icon name="minus" /></button>
                    <span>{quantity}</span>
                    <button type="button" aria-label="Increase quantity" disabled={quantity >= selectedProduct.stock} onClick={() => setQuantity((current) => Math.min(selectedProduct.stock, current + 1))}><Icon name="plus" /></button>
                  </div>
                  <button type="button" className="add-button" onClick={() => addToCart(selectedProduct, quantity)}>Add to bag <span>${(selectedProduct.price * quantity).toFixed(2)}</span></button>
                </div>
                <button type="button" className="detail-wishlist" onClick={() => toggleFavorite(selectedProduct.id)}><Icon name="heart" filled={favorites.includes(selectedProduct.id)} /> {favorites.includes(selectedProduct.id) ? 'Saved to your wishlist' : 'Add to wishlist'}</button>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="hero-slider" aria-label="Featured collection">
              <img className="hero-photo" src={slides[activeSlide].image} alt="Friends enjoying a sunny afternoon in colorful outfits" />
              <div className="hero-shade" />
              <div className="hero-copy">
                <p className="hero-kicker">{slides[activeSlide].eyebrow}</p>
                <h1>{slides[activeSlide].title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
                <a className="hero-cta" href="#products">Find your feel-good fit <span>↗</span></a>
              </div>
              <div className="hero-credit">PREFINAL APPLICATION EXAM <span>— MELISSA MAE FRANES</span></div>
              <div className="slider-controls">
                <button type="button" aria-label="Previous slide" onClick={() => changeSlide(-1)}><Icon name="arrow" /></button>
                <span>0{activeSlide + 1} <i /> 0{slides.length}</span>
                <button type="button" aria-label="Next slide" onClick={() => changeSlide(1)}><Icon name="arrow" /></button>
              </div>
            </section>

            <section id="featured" className="catalog-section featured-section">
              <div className="section-heading">
                <div><span className="eyebrow">THE PIECES YOU'LL REACH FOR</span><h2>Feature products<span className="heading-period">.</span></h2></div>
                <a className="text-link" href="#products">Shop the edit <span>↗</span></a>
              </div>
              <div className="product-grid featured-grid">
                {products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} index={index} isFavorite={favorites.includes(product.id)} onFavorite={toggleFavorite} onSelect={openProduct} />)}
              </div>
            </section>

            <section id="products" className="catalog-section products-section">
              <div className="section-heading">
                <div><span className="eyebrow">A WARDROBE WITH A LITTLE MORE YOU</span><h2>Products<span className="heading-period">.</span></h2></div>
                <label className="category-select-label" htmlFor="category-select">Explore by
                  <select id="category-select" value={category} onChange={(event) => setCategory(event.target.value as Category | 'All')}>
                    <option value="All">All pieces</option><option value="Tops">Tops</option><option value="Dress">Dress</option><option value="Outerwear">Outerwear</option>
                  </select>
                </label>
              </div>
              <div className="product-grid">
                {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} isFavorite={favorites.includes(product.id)} onFavorite={toggleFavorite} onSelect={openProduct} />)}
              </div>
              <p className="results-note">Showing {visibleProducts.length} {category === 'All' ? 'favorite pieces' : category.toLowerCase() + ' pieces'}</p>
            </section>
            <footer id="about" className="site-footer"><a className="brand footer-brand" href="#home">fashub<span>.</span></a><p>Wear what feels like you.</p><span>MADE FOR YOUR EVERYDAY, WITH LOVE.</span></footer>
          </>
        )}
      </main>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
        <aside className="cart-drawer" aria-label="Shopping bag" onClick={(event) => event.stopPropagation()}>
          <div className="drawer-heading"><div><span className="eyebrow">YOUR GOOD FINDS</span><h2>Your bag <span>({cartCount})</span></h2></div><button type="button" className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><Icon name="close" /></button></div>
          {cartCount === 0 ? <div className="empty-cart"><Icon name="bag" /><p>Your bag is taking a little breather.</p><button type="button" className="text-link" onClick={() => setCartOpen(false)}>Keep exploring <span>↗</span></button></div> : <>
            <div className="cart-items">{products.filter((product) => cart[product.id]).map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>Qty {cart[product.id]} · ${product.price.toFixed(2)}</span></div><button type="button" aria-label={`Remove ${product.name}`} onClick={() => setCart((current) => { const next = { ...current }; delete next[product.id]; return next })}><Icon name="close" /></button></div>)}</div>
            <div className="cart-total"><span>Subtotal</span><strong>${products.reduce((total, product) => total + product.price * (cart[product.id] ?? 0), 0).toFixed(2)}</strong></div><button type="button" className="add-button checkout-button" onClick={() => setCartOpen(false)}>Continue to checkout <span>↗</span></button>
          </>}
        </aside>
      </div>}
    </div>
  )
}

function ProductCard({ product, index, isFavorite, onFavorite, onSelect }: {
  product: Product
  index: number
  isFavorite: boolean
  onFavorite: (id: number) => void
  onSelect: (product: Product) => void
}) {
  return <article className="product-card" style={{ animationDelay: `${index * 70}ms` }}>
    <button className="product-image-button" type="button" onClick={() => onSelect(product)} aria-label={`View ${product.name}`}>
      <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
      {product.tag && <span className="product-tag">{product.tag}</span>}
    </button>
    <button type="button" className={`favorite-button${isFavorite ? ' is-favorite' : ''}`} aria-label={isFavorite ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => onFavorite(product.id)}><Icon name="heart" filled={isFavorite} /></button>
    <button type="button" className="product-info" onClick={() => onSelect(product)}><span><strong>{product.name}</strong><small>{product.color}</small></span><b>${product.price.toFixed(2)}</b></button>
  </article>
}

export default App
