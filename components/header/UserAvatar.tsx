"use client";

import { Avatar } from "@nextui-org/react";

const UserAvatar = () => {
    return (
        <div className="flex gap-4 items-center">
            <Avatar showFallback name="Bruno Wunsch" src="/public/pfp.png" />
        </div>
    );
}
export default UserAvatar;