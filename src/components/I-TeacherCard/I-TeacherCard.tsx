import avatarStub from '../../assets/img/avatar-stub.png';
import { useNavigate } from 'react-router-dom';
import React from "react";

type Props = {
    teacherInfo: Intellect.Teacher,
    className?: string,
}

const ITeacherCard: React.FC<Props> = ({teacherInfo, className = ''}) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/profile/` + teacherInfo.UserIdentifier, {state: {user: teacherInfo}})} className={'cursor-pointer max-w-160 ' + className}>
      <img width={170} height={226} src={teacherInfo.Photo || avatarStub} alt='avatar' />
      <div className='text-semibold'>{teacherInfo.FullName}</div>
      <div className='text-neutral-900 text-sm mt-1'>{teacherInfo.Positions[0].Name}</div>
      <div className='text-neutral-600 text-xs mt-2'>{teacherInfo.Positions[0].Subdivision.Name}</div>
    </div>
  )
}

export default ITeacherCard;
