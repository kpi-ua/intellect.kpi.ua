const Footer = ({logoSrc}) => {
  return (
    <footer className='bg-primary text-white text-sm'>
      <div className='wrapper flex sm:flex-row sm:text-left text-center flex-col justify-between py-9 gap-9'>
        <img className='max-w-120 mx-auto' src={logoSrc} alt='logo' />
        <section>
          <p>
            Національний технічний університет України"Київський політехнічний інститут імені Ігоря Сікорського" © 1998-2023
          </p>
          <p className='mt-2'>
            Адреса: Україна, 03056 м.Київ-56, проспект Перемоги, 37
          </p>
        </section>
        <section>
          <p>
            Розробник – Конструкторське бюро інформаційних систем
          </p>
          <p className='mt-2'>
            Створено в рамках проекту "Електронний кампус КПІ"
          </p>
        </section>
        <section>
          <p>
            Використання матеріалу сайту тільки з обов’язковим посиланням на intellect.kpi.ua
          </p>
        </section>
      </div>
    </footer>
  )
}

export default Footer;
