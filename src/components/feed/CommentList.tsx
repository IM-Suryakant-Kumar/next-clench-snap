"use client";

import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type CommentWithUser = Comment & { user: User };

const CommentList = ({ comments, postId }: { comments: CommentWithUser[]; postId: number }) => {
	const { user } = useUser();
	const [commentState, setCommentState] = useState(comments);
	const [desc, setDesc] = useState("");

	const [optimisticComment, addOptimisticComment] = useOptimistic(
		commentState,
		(state, value: CommentWithUser) => [value, ...state]
	);

	return (
		<>
			{user && (
				<div className="flex items-center gap-4">
					<Image
						src={user.imageUrl}
						alt=""
						width={32}
						height={32}
						className="w-8 h-8 rounded-full"
					/>
					<form
						action=""
						className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
					>
						<input
							type="text"
							placeholder="Write a comment..."
							className="bg-transparent outline-none flex-1"
							onChange={(e) => setDesc(e.target.value)}
						/>
						<Image src="/emoji.png" alt="" width={16} height={16} className="cursor-pointer" />
					</form>
				</div>
			)}

			<div className="">
				{/* comment */}
				<div className="flex gap-4 justify-between mt-6">
					{/* avatar */}
					<Image
						src="https://images.pexels.com/photos/26926216/pexels-photo-26926216/free-photo-of-a-hand-holding-a-flower-with-the-words-how-to-grow-frangipani.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
						alt=""
						width={40}
						height={40}
						className="w-10 h-10 rounded-full"
					/>
					{/* desc */}
					<div className="flex flex-col gap-2 flex-1">
						<span className="font-medium">Terry Quinn</span>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo saepe obcaecati,
							quas mollitia eveniet, quaerat officiis, laborum voluptatibus ullam ea eaque? Totam
							repudiandae aliquam aliquid in odio odit reprehenderit vitae.
						</p>
						{/* action buttons */}
						<div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
							<div className="flex items-center gap-4">
								<Image
									src="/like.png"
									alt=""
									width={12}
									height={12}
									className="cursor-pointer w-4 h-4"
								/>
								<span className="text-gray-300">|</span>
								<span className="text-gray-500">123 Likes</span>
							</div>
							<div className="">Reply</div>
						</div>
					</div>
					{/* icon */}
					<Image src="/more.png" alt="" width={16} height={16} className="cursor-pointer w-4 h-4" />
				</div>
			</div>
		</>
	);
};

export default CommentList;
