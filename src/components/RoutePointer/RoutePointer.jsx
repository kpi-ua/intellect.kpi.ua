import FeatherIcon from '../FeatherIcon/FeatherIcon';

const RoutePointer = ({routePath = []}) => {
  const route = routePath.map((item, idx) => {
    return (
      <span key={item.path} className={idx === routePath.length - 1 ? '' : 'text-neutral-600'}>
        <a className='cursor-pointer' href={item.path}>{item.label}</a>
        {idx !== routePath.length - 1 ? <FeatherIcon width={40} fillClass='inline fill-none text-neutral-600' icon='chevron-right'/> : ''}
      </span>
    )
  })

  return <div>{route}</div>
}

export default RoutePointer;
