import BookCard from "../components/BookCard"

const bookData = {
  "best-sellers": [
    { title: "The Midnight Library", author: "Matt Haig", price: 24.99, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80" },
    { title: "Atomic Habits", author: "James Clear", price: 19.99, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80" },
    { title: "The Silent Patient", author: "Alex Michaelides", price: 21.50, image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80" },
    { title: "Where the Crawdads Sing", author: "Delia Owens", price: 18.00, image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80" },
  ],
  "new-arrivals": Array.from({length: 4}, (_,i)=>({
    title: `New Release ${i+1}`,
    author: "Emerging Author",
    price: 15 + i,
    image: `https://picsum.photos/seed/newbook${i}/400/600.jpg`
  })),
  "fiction": Array.from({length: 4}, (_,i)=>({
    title: `Fantasy Tale ${i+1}`,
    author: "Writer",
    price: 22,
    image: `https://picsum.photos/seed/fiction${i}/400/600.jpg`
  }))
}

export default function Dashboard() {
  return (
    <div className="bg-gray-50/50 min-h-screen p-8">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back 👋</h2>
        <p className="text-gray-500 mt-1">Here are some recommendations for you.</p>
      </div>

      {Object.entries(bookData).map(([key, books]) => (
        <section key={key} id={key} className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 capitalize flex items-center gap-2">
              {key.replace("-", " ")}
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
            </h3>
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">View All →</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book, i) => (
              <BookCard key={i} book={book} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}