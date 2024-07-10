import Image from "next/image"
import Link from "next/link"

const FriendRequest = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Request</span>
        <Link href="/" className="text-blue-500 text-xs">See all</Link>
      </div>
      {/* user */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/20062433/pexels-photo-20062433/free-photo-of-woman-with-black-hair.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">Frances Jones</span>
        </div>
        <div className="flex gap-2 justify-end">
          <Image src="/accept.png" alt="" width={20} height={20} className="cursor-pointer" />
          <Image src="/reject.png" alt="" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>
      {/* user */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/20062433/pexels-photo-20062433/free-photo-of-woman-with-black-hair.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">Frances Jones</span>
        </div>
        <div className="flex gap-2 justify-end">
          <Image src="/accept.png" alt="" width={20} height={20} className="cursor-pointer" />
          <Image src="/reject.png" alt="" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>
      {/* user */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/20062433/pexels-photo-20062433/free-photo-of-woman-with-black-hair.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">Frances Jones</span>
        </div>
        <div className="flex gap-2 justify-end">
          <Image src="/accept.png" alt="" width={20} height={20} className="cursor-pointer" />
          <Image src="/reject.png" alt="" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default FriendRequest