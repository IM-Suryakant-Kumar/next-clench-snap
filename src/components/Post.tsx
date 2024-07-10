import Image from "next/image"
import Comments from "./Comments"

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* user */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/24589418/pexels-photo-24589418/free-photo-of-a-waterfall-is-surrounded-by-trees-in-the-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={40} height={40} className="w-10 h-10 rounded-full" />
          <span className="font-medium">Wesley</span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* description */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image src="https://images.pexels.com/photos/17351400/pexels-photo-17351400/free-photo-of-trees-behind-windows-and-curtains-in-darkness.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" fill alt="" className="object-cover rounded-md" />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam temporibus esse eligendi cupiditate deserunt fugit ab rem tempore harum, qui quasi possimus. Vitae, reiciendis mollitia! Reprehenderit expedita enim quibusdam. Voluptatem!</p>
      </div>
      {/* interaction */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image src="/like.png" alt="" width={16} height={16} className="cursor-pointer" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">123 <span className="hidden md:inline"> Likes</span></span>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image src="/comment.png" alt="" width={16} height={16} className="cursor-pointer" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">123 <span className="hidden md:inline"> Comments</span></span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image src="/share.png" alt="" width={16} height={16} className="cursor-pointer" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">123 <span className="hidden md:inline"> Shares</span></span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  )
}

export default Post