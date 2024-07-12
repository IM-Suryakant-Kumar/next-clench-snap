"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";

export const switchFollow = async (userId: string) => {
	const { userId: currentUserId } = auth();

	if (!currentUserId) throw new Error("User is not Authenticated!");

	try {
		const existingFollow = await prisma.follower.findFirst({
			where: {
				followerId: currentUserId,
				followingId: userId,
			},
		});

		if (existingFollow) {
			await prisma.follower.delete({
				where: {
					id: existingFollow.id,
				},
			});
		} else {
			const existingFollowReq = await prisma.followRequest.findFirst({
				where: {
					senderId: currentUserId,
					recieverId: userId,
				},
			});

			if (existingFollowReq) {
				await prisma.followRequest.delete({
					where: {
						id: existingFollowReq.id,
					},
				});
			} else {
				await prisma.followRequest.create({
					data: {
						senderId: currentUserId,
						recieverId: userId,
					},
				});
			}
		}
	} catch (error) {
		console.error(error);
		throw new Error("Something went wrong!");
	}
};

export const switchBlock = async (userId: string) => {
	const { userId: currentUserId } = auth();

	if (!currentUserId) throw new Error("User is not Authenticated");

	try {
		const existingBlock = await prisma.block.findFirst({
			where: {
				blockerId: currentUserId,
				blockedId: userId,
			},
		});

		if (existingBlock) {
			await prisma.block.delete({
				where: {
					id: existingBlock.id,
				},
			});
		} else {
			await prisma.block.create({
				data: {
					blockerId: currentUserId,
					blockedId: userId,
				},
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error("Something went wrong!");
	}
};

export const acceptFollowRequest = async (userId: string) => {
	const { userId: currentUserId } = auth();

	if (!currentUserId) throw new Error("User is not Authenticated!!");

	try {
		const existingFollowRequest = await prisma.followRequest.findFirst({
			where: {
				senderId: userId,
				recieverId: currentUserId,
			},
		});

		if (existingFollowRequest) {
			await prisma.followRequest.delete({
				where: {
					id: existingFollowRequest.id,
				},
			});

			await prisma.follower.create({
				data: {
					followerId: userId,
					followingId: currentUserId,
				},
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error("Something went wrong!");
	}
};

export const declineFollowRequest = async (userId: string) => {
	const { userId: currentUserId } = auth();

	if (!currentUserId) throw new Error("User is not Authenticated!!");

	try {
		const existingFollowRequest = await prisma.followRequest.findFirst({
			where: {
				senderId: userId,
				recieverId: currentUserId,
			},
		});

		if (existingFollowRequest) {
			await prisma.followRequest.delete({
				where: {
					id: existingFollowRequest.id,
				},
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error("Something went wrong!");
	}
};

export const updateProfile = async (
	prevState: { success: boolean; error: boolean },
	payload: {
		formData: FormData;
		cover: string;
	}
) => {
	const { formData, cover } = payload;
	const fields = Object.fromEntries(formData);

	const filteredFields = Object.fromEntries(
		Object.entries(fields).filter(([_, val]) => val !== "")
	);

	console.log(fields);
	console.log(filteredFields);

	const Profile = z.object({
		cover: z.string().optional(),
		name: z.string().max(60).optional(),
		surname: z.string().max(60).optional(),
		descrption: z.string().max(60).optional(),
		city: z.string().max(60).optional(),
		school: z.string().max(60).optional(),
		work: z.string().max(60).optional(),
		website: z.string().max(60).optional(),
	});

	const validatedFields = Profile.safeParse({ cover, ...filteredFields });

	if (!validatedFields.success) {
		console.error(validatedFields.error.flatten().fieldErrors);
		return { success: false, error: true };
	}

	const { userId } = auth();

	if (!userId) return { success: false, error: true };

	try {
		await prisma.user.update({
			where: {
				id: userId,
			},
			data: validatedFields.data,
		});

		return { success: true, error: false };
	} catch (error) {
		console.error(error);
		return { success: false, error: true };
	}
};

export const switchLike = async (postId: number) => {
	const { userId } = auth();

	if (!userId) throw new Error("User is not Authenticated!!");

	try {
		const existingLike = await prisma.like.findFirst({
			where: {
				postId,
				userId,
			},
		});

		if (existingLike) {
			await prisma.like.delete({
				where: {
					id: existingLike.id,
				},
			});
		} else {
			await prisma.like.create({
				data: {
					postId,
					userId,
				},
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error("Something went wrong!!");
	}
};

export const addComment = async (postId: number, desc: string) => {
	const { userId } = auth();

	if (!userId) throw new Error("User is not Authenticated!!");

	try {
		const createdComment = await prisma.comment.create({
			data: {
				desc,
				userId,
				postId,
			},
			include: {
				user: true,
			},
		});

    return createdComment;
	} catch (error) {
		console.error(error);
		throw new Error("Something went wrong!!");
	}
};
