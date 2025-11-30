import React from 'react'
import authStore from '../store/AuthStore';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

function HomePage() {

  const { AuthUser, getme } = authStore();

  return (
    <div className="min-h-screen  text-black flex flex-col">
      {/* Navbar */}


      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <section className="max-w-3xl h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
          <p className="text-xs uppercase tracking-[.2em] text-zinc-400 mb-3">
            Video Platform • HLS Streaming
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight hover:shadow-blue-500 hover:text-shadow-lg transition-all hover:scale-101 duration-300 ">
            VStream it, <span className="text-blue-500">you share it</span>.
          </h2>

          <p className="text-black-300 mt-4 text-sm md:text-base">
            We are here to share your video to public and watch it from anywhere
          </p>

          {
            AuthUser ?
              (<div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  to="/videos/upload"
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:border-blue-600 hover:border hover:shadow-blue-500 hover:shadow-lg hover:bg-white transition-all hover:scale-101 duration-300 font-semibold text-sm md:text-base text-center"
                >
                  Upload a video
                </Link>
                <Link
                  to="/videos"
                  className="px-6 py-3 hover:bg-blue-600 hover:text-white transition-all hover:scale-101 duration-300 rounded-lg border border-zinc-600 hover:border-white text-sm md:text-base text-center"
                >
                  Explore videos
                </Link>
              </div>) :
              (<></>)
          }
        </section>

        {/* Features */}
        <section
          id="features"
          className="mt-16 max-w-5xl w-full px-4 grid gap-6 md:grid-cols-3"
        >
          <div
            className="bg-white hover:shadow-blue-500 hover:shadow-lg transition-all hover:scale-101 duration-300 border border-black-800 rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-2">Chunk Based Streaming</h3>
            <p className="text-zinc-400 text-sm">
              Chunked uploads and async processing so your videos don&apos;t block you.
            </p>
          </div>

          <div
            className="bg-white hover:shadow-blue-500 hover:shadow-lg transition-all hover:scale-101 duration-300 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-2">Adaptive streaming</h3>
            <p className="text-zinc-400 text-sm">
              HLS playlists for 480p, 720p and more, optimised for any network.
            </p>
          </div>

          <div
            className="bg-white hover:shadow-blue-500 hover:shadow-lg transition-all hover:scale-101 duration-300 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-lg mb-2">Creator focused</h3>
            <p className="text-zinc-400 text-sm">
              Profiles, video details and status so you always know what&apos;s happening.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="mt-16 max-w-3xl w-full px-4 text-center"
        >
          <h3 className="text-xl font-semibold mb-3">How VStream works</h3>
          <ol className="text-sm text-zinc-300 space-y-2 text-left md:text-center">
            <li>1. Login or create an account.</li>
            <li>2. Upload a video and thumbnail from the upload page.</li>
            <li>3. VStream processes it in the background (HLS, thumbnails, links).</li>
            <li>4. Share the video link and let people stream it smoothly.</li>
          </ol>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage