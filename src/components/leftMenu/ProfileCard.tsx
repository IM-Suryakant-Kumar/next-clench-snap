import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const ProfileCard = async () => {
	const { userId } = auth();

	if (!userId) return null;

	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
		include: {
			_count: {
				select: {
					followers: true,
				},
			},
		},
	});

	if (!user) return null;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
			<div className="h-20 relative">
				<Image src={user?.cover || "/noCover.png"} alt="" fill className="rounded-md" />
				<Image
					src={user?.avatar || "noAvatar.png"}
					alt=""
					width={48}
					height={48}
					className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
				/>
			</div>
			<div className="h-20 flex flex-col gap-2 items-center">
				<span className="font-semibold">
					{user.name && user.surname ? user.name + " " + user.surname : user.username}
				</span>
				<div className="flex items-center gap-4">
					<div className="flex">
						<Image
							src="https://images.pexels.com/photos/26926257/pexels-photo-26926257/free-photo-of-just-chillin.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
							alt=""
							width={12}
							height={12}
							className="rounded-full w-3 h-3 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
						/>
						<Image
							src="https://images.pexels.com/photos/26926257/pexels-photo-26926257/free-photo-of-just-chillin.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
							alt=""
							width={12}
							height={12}
							className="rounded-full w-3 h-3 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
						/>
						<Image
							src="https://images.pexels.com/photos/26926257/pexels-photo-26926257/free-photo-of-just-chillin.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
							alt=""
							width={12}
							height={12}
							className="rounded-full w-3 h-3 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
						/>
					</div>
					<span className="text-xs text-gray-500">{user._count.followers} followers</span>
				</div>
				<button className="bg-blue-500 text-white text-xm p-2 rounded-md">My Profile</button>
			</div>
		</div>
	);
};

export default ProfileCard;
