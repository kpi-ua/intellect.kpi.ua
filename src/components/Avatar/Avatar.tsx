import React from 'react';
import avatarStub from '../../assets/img/avatar-stub.png';

type Props = {
    img?: string;
};

const Avatar: React.FC<Props> = ({ img }) => {
    return (
        <img
            className="block w-170 h-[200px]"
            src={img || avatarStub}
            alt="avatar"
        />
    );
};

export default Avatar;
