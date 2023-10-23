import FeatherIcon from '../FeatherIcon/FeatherIcon';

const RoutePointer = ({routePath = []}) => {
  const route = routePath.map((item, idx) => {
    return (
      <div  key={item.path} className={'flex items-center ' + (idx === routePath.length - 1 ? '' : 'text-neutral-600')}>
        <a className='cursor-pointer' href={item.path}>{item.label}</a>
        {idx !== routePath.length - 1 ? <FeatherIcon width={40} fillClass='inline fill-none text-neutral-600' icon='chevron-right'/> : ''}
      </div>
    )
  })

  return <div className='flex items-center'>{route}</div>
}

export default RoutePointer;
