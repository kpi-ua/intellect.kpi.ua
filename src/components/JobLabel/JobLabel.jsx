const JobLabel = ({qualification, workplace}) => {
  return (
    <div className='inline-block'>
      <div className='flex text-white bg-primary rounded-lg p-0.5 pl-2 flex gap-2 items-center text-xs'>
        {qualification}
        <div className="text-primary rounded-md p-1 bg-white">
          {workplace}
        </div>
      </div>
    </div>
  )
}

export default JobLabel;
