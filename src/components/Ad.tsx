import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
	return (
		<div className="p-4 bg-white rounded-lg shadow-md text-sm">
			{/* top */}
			<div className="flex items-center justify-between text-gray-500 font-medium">
				<span>Sponsored ads</span>
				<Image src="/more.png" alt="" width={16} height={16} />
			</div>
			{/* bottom */}
			<div className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}>
				<div
					className={`relative w-full ${size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"}`}
				>
					<Image
						src="https://images.pexels.com/photos/19786392/pexels-photo-19786392/free-photo-of-photo-of-pink-flowers-and-a-kitten-on-a-shelf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
						alt=""
						fill
						className="rounded-lg object-cover"
					/>
				</div>
				<div className="flex items-center gap-4">
					<Image
						src="https://images.pexels.com/photos/19786392/pexels-photo-19786392/free-photo-of-photo-of-pink-flowers-and-a-kitten-on-a-shelf.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
						alt=""
						width={24}
						height={24}
						className="rounded-full w-6 h-6 object-cover"
					/>
					<span className="text-blue-500 font-medium">Big Launge</span>
				</div>
				<p className={`${size === "sm" ? "text-sm" : "text-xs"}`}>
					{size === "sm"
						? "Lorem ipsum dolor sit amet consectetur, adipisicing elit."
						: size === "md"
						? "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit."
						: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
				</p>
				<button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">Learn more</button>
			</div>
		</div>
	);
};

export default Ad;
