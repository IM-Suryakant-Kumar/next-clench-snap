"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
	userId,
	currentUserId,
	isUserBlocked,
	isFollowing,
	isFollowingSent,
}: {
	userId: string;
	currentUserId: string | null;
	isUserBlocked: boolean;
	isFollowing: boolean;
	isFollowingSent: boolean;
}) => {
	const [userState, setUserState] = useState({
		following: isFollowing,
		blocked: isUserBlocked,
		followingRequestSent: isFollowingSent,
	});

	const follow = async () => {
		swithOptimisticState("follow");
		try {
			await switchFollow(userId);
			setUserState((prevState) => ({
				...prevState,
				following: prevState.following && false,
				followingRequestSent:
					!prevState.following && !prevState.followingRequestSent ? true : false,
			}));
		} catch (error) {}
	};

	const block = async () => {
		swithOptimisticState("block");
		try {
			await switchBlock(userId);
			setUserState((prevState) => ({
				...prevState,
				blocked: !prevState.blocked,
			}));
		} catch (error) {}
	};

	const [optimisticState, swithOptimisticState] = useOptimistic(
		userState,
		(state, value: "follow" | "block") =>
			value === "follow"
				? {
						...state,
						following: state.following && false,
						followingRequestSent: !state.following && !state.followingRequestSent ? true : false,
				  }
				: { ...state, blocked: !state.blocked }
	);

	return (
		<>
			<form action={follow}>
				<button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
					{optimisticState.following
						? "Following"
						: optimisticState.followingRequestSent
						? "Friend request Sent"
						: "Follow"}
				</button>
			</form>
			<form action={block} className="self-end">
				<button>
					<span className="text-red-400 text-xs cursor-pointer">
						{optimisticState.blocked ? "Unblock User" : "Block User"}
					</span>
				</button>
			</form>
		</>
	);
};

export default UserInfoCardInteraction;
