"use client";

import prisma from "@/lib/client";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
	const { user, isLoaded } = useUser();
	const [desc, setdesc] = useState("");
	const [img, setImg] = useState<any>();

	if (!isLoaded) return "loadBindings...";

	return (
		<div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
			{/* avatar */}
			<Image
				src={user?.imageUrl || "/noAvatar.png"}
				width={48}
				height={48}
				alt=""
				className="w-12 h-12 object-cover rounded-full"
			/>
			{/* post */}
			<div className="flex-1">
				{/* text input */}
				<form
					action={(formData) => addPost(formData, img?.secure_url || "")}
					className="flex gap-4"
				>
					<textarea
						placeholder="What's on your mind?"
						className="flex-1 bg-slate-100 rounded-lg p-2"
						name="desc"
						onChange={(e) => setdesc(e.target.value)}
					></textarea>
					<div className="">
						<Image
							src="/emoji.png"
							width={20}
							height={20}
							alt=""
							className="w-5 h-5 cursor-pointer self-end"
						/>
						<AddPostButton />
					</div>
				</form>
				{/* post option */}
				<div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
					<CldUploadWidget
						uploadPreset="social"
						onSuccess={(result, { widget }) => {
							setImg(result.info);
							widget.close();
						}}
					>
						{({ open }) => {
							return (
								<div className="flex items-center gap-2 cursor-pointer" onClick={() => open()}>
									<Image src="/addimage.png" width={20} height={20} alt="" />
									Photo
								</div>
							);
						}}
					</CldUploadWidget>

					<div className="flex items-center gap-2 cursor-pointer">
						<Image src="/addVideo.png" width={20} height={20} alt="" />
						Video
					</div>
					<div className="flex items-center gap-2 cursor-pointer">
						<Image src="/poll.png" width={20} height={20} alt="" />
						Poll
					</div>
					<div className="flex items-center gap-2 cursor-pointer">
						<Image src="/addevent.png" width={20} height={20} alt="" />
						Event
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPost;
