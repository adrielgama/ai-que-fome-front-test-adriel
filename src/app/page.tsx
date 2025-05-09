import Banner from '@/components/banner'
import RestaurantList from '@/components/restaurant/restaurant-list'
import Search from '@/components/search'

export default function Home() {
  return (
    <main className="lg:container lg:mx-auto">
      <Search />
      <Banner />
      <RestaurantList />
    </main>
  )
}
