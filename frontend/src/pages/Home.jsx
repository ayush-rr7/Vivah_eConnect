import hero from '../assets/hero.png'
import couple from '../assets/couple.png'
import { Link } from 'react-router-dom'

function Home(){
  return (
    <div>

{/* HERO SECTION */}

<section className="bg-pink-50 py-20">
<div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 px-6">

<div>
<h1 className="text-5xl font-bold text-gray-800 leading-tight">
Find Your <span className="text-pink-600">Life Partner</span>
</h1>

<p className="mt-6 text-gray-600 text-lg">
Connecting hearts, families, and traditions through meaningful relationships.
</p>

<div className="mt-8 flex gap-4">
  <Link to="/signup"  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition">Get Started</Link>


<Link to="/login"  className="border border-pink-600 hover:bg-pink-600 hover:text-white text-pink-600 px-6 py-3 rounded-lg transition">
Explore Matches
</Link>
</div>
</div>

<div className="flex justify-center">
<img 
src={hero} 
className="rounded-xl shadow-lg w-full max-h-105 object-cover"
/>
</div>

</div>
</section>


{/* QUOTE */}

<section className="py-14 text-center bg-white">
<p className="text-2xl italic text-gray-700 max-w-3xl mx-auto">
"Every great love story begins with a simple hello."
</p>
</section>


{/* HOW IT WORKS */}

<section className="py-20 bg-gray-50">
<h2 className="text-3xl font-semibold text-center mb-14">
How It Works
</h2>

<div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 text-center">

<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
<h3 className="font-semibold text-xl">Create Profile</h3>
<p className="text-gray-600 mt-3">
Sign up and build your profile to start your journey.
</p>
</div>

<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
<h3 className="font-semibold text-xl">Discover Matches</h3>
<p className="text-gray-600 mt-3">
Browse verified profiles and find compatible partners.
</p>
</div>

<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
<h3 className="font-semibold text-xl">Connect</h3>
<p className="text-gray-600 mt-3">
Send requests and start meaningful conversations.
</p>
</div>

</div>
</section>


{/* FEATURES */}

<section className="py-20">
<h2 className="text-3xl font-semibold text-center mb-14">
Why Choose Vivah E-Connect?
</h2>

<div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6 text-center">

<div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
✔ Verified Profiles
</div>

<div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
✔ Secure Communication
</div>

<div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
✔ Genuine Connections
</div>

<div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
✔ Easy Matching
</div>

</div>
</section>


{/* COUPLE IMAGE SECTION */}

<section className="py-20 bg-pink-50">
<div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 px-6">

<div className="flex justify-center">
<img
src={couple}
className="rounded-xl shadow-lg w-full max-h-105 object-cover"
/>
</div>

<div>
<h2 className="text-3xl font-bold text-gray-800">
Start Your Journey Today
</h2>

<p className="mt-4 text-gray-600">
Thousands of people have found their life partners through trusted matchmaking.
Your story could be next.
</p>

<Link to="/signup">
<button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg">
Join Vivah E-Connect
</button>
</Link>
</div>

</div>
</section>


{/* CTA */}

<section className="bg-pink-600 text-white py-20 text-center">
<h2 className="text-3xl font-semibold mb-5">
Your Perfect Match Could Be One Click Away
</h2>
<Link to="/signup" className=" bg-white text-pink-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition" >Create Your Profile</Link>
</section>

</div>
  )
}

export default Home