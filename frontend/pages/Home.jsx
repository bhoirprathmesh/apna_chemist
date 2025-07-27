import React from "react";
import { categories } from "../data/products";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  { id: 1, image: "/banners/offer1.jpg", alt: "Offer 1" },
  { id: 2, image: "/banners/offer2.jpg", alt: "Offer 2" },
  { id: 3, image: "/banners/offer3.jpg", alt: "Offer 3" },
];

const brands = [
  "/brands/himalaya.png",
  "/brands/dettol.png",
  "/brands/ensure.png",
  "/brands/accu-chek.png",
  "/brands/horlicks.png",
  "/brands/volini.png",
  "/brands/zandu.png",
];

const products = [
  { id: 1, image: "/products/prod1.jpg", name: "Immunity Booster", price: "₹299" },
  { id: 2, image: "/products/prod2.jpg", name: "Diabetes Care Kit", price: "₹699" },
  { id: 3, image: "/products/prod3.jpg", name: "Vitamin C Tablets", price: "₹199" },
  { id: 4, image: "/products/prod4.jpg", name: "Protein Powder", price: "₹499" },
  { id: 5, image: "/products/prod5.jpg", name: "Pain Relief Gel", price: "₹149" },
  { id: 6, image: "/products/prod6.jpg", name: "Face Serum", price: "₹349" },
];

function Home() {
  return (
    <div className="w-full">
      {/* 🔹 Hero Slider (Swiper) */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-56 md:h-80"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔹 Recent Search & Trending */}
      <div className="px-6 py-6 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {["Paracetamol", "Baby Diapers", "Protein Powder", "Dettol"].map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-teal-100 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Trending Now</h2>
          <div className="flex flex-wrap gap-2">
            {["Vitamin C", "Diabetes Care", "Hair Oil", "Hand Sanitizer"].map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-teal-100 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Shop by Concern */}
      <div className="px-6 py-6 bg-teal-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Shop by Concern</h2>
          <Link to="/concerns" className="text-teal-600 text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Diabetes Care", "Heart Health", "Hair Fall", "Immunity"].map((concern, idx) => (
            <div
              key={idx}
              className="bg-white shadow p-4 rounded-lg text-center hover:shadow-md cursor-pointer"
            >
              <img src={`/concerns/${idx + 1}.png`} alt={concern} className="mx-auto h-16 mb-2" />
              <p className="text-sm font-medium">{concern}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Browse by Categories */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Browse by Categories</h2>
          <Link to="/categories" className="text-teal-600 text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link to={`/products/${cat.name}`} key={cat.id}>
              <CategoryCard category={cat} />
            </Link>
          ))}
        </div>
      </div>

      {/* 🔹 Shop by Brand (Swiper) */}
      <div className="px-6 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Shop by Popular Brands</h2>
          <Link to="/brands" className="text-teal-600 text-sm hover:underline">
            View All
          </Link>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          navigation
        >
          {brands.map((brand, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <img
                src={brand}
                alt="brand"
                className="h-12 hover:scale-105 transition cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔹 Product Sections (Carousels) */}
      {[
        { title: "New Arrivals", bg: "bg-white" },
        { title: "Recommended for You", bg: "bg-teal-50" },
        { title: "Hot Sellers", bg: "bg-white" },
        { title: "Minimum 50% Off Deals", bg: "bg-teal-50" },
      ].map((section, idx) => (
        <div key={idx} className={`px-6 py-6 ${section.bg}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <Link to="/products" className="text-teal-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            navigation
          >
            {products.map((prod) => (
              <SwiperSlide key={prod.id}>
                <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg cursor-pointer relative group">
                  <img src={prod.image} alt={prod.name} className="h-28 mx-auto mb-2" />
                  <p className="text-sm font-medium">{prod.name}</p>
                  <p className="text-teal-600 font-bold">{prod.price}</p>
                  {/* Add-to-Cart button (appears on hover) */}
                  <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                    Add to Cart
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}

export default Home;
