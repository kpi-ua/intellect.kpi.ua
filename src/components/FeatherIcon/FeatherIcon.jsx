import feather from 'feather-icons';

const FeatherIcon = ({icon, width = 20, height = 20, fillClass = 'fill-none', crossed = false, color = '#000'}) => {
  const additionalShapes = crossed ? '<line x1="0" y1="0" x2="24" y2="24"/>' : '';
  const svg = () => {
    const featherIcon = feather.icons[icon];
    return featherIcon ? featherIcon.toSvg().match(/<svg.*?>(.*?)<\/svg>/)[1] + additionalShapes : undefined;
  }

  return <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    stroke="currentColor"
    width={`${width}px`}
    height={`${height}px`}
    className={fillClass}
    color={color}
    dangerouslySetInnerHTML={{__html: svg()}} />
}

export default FeatherIcon;
