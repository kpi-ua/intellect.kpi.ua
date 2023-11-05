import avatarStub from '../../assets/img/avatar-stub.png';
import { useNavigate } from 'react-router-dom';
import React from "react";

type Props = {
    // TODO connect with backend and create type
    teacherInfo: any,
    className?: string,
}


const ITeacherCard: React.FC<Props> = ({teacherInfo, className = ''}) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/teacher/${teacherInfo.id}`)} className={'cursor-pointer max-w-160 ' + className}>
      <img src={teacherInfo.avatar || avatarStub} alt='avatar' />
      <div className='text-semibold'>{teacherInfo.name}</div>
      <div className='text-neutral-900 text-sm mt-1'>{teacherInfo.qualification}</div>
      <div className='text-neutral-600 text-xs mt-2'>{teacherInfo.workplace}</div>
    </div>
  )
}

export default ITeacherCard;
