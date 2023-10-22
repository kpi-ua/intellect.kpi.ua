const InfoBlock = ({sectionImg, children}) => {
  return (
    <section className='flex justify-between mt-9 mb-140'>
      {children}
      <img className='max-h-550' src={sectionImg} alt='sectionImg' />
    </section>
  )
}

export default InfoBlock;
